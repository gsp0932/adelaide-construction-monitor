
#include "secrets.hpp"

#include <aws/crt/Api.h>
#include <aws/crt/UUID.h>
#include "utils/CommandLineUtils.hpp"

#include <aws/iot/MqttClient.h>

using namespace Aws::Crt;

#include <iostream>
#include <random>
#include <chrono>
#include <thread>
#include <math.h>
#include <boost/json/src.hpp>

using namespace std::this_thread;
using namespace std::chrono_literals;
using std::chrono::system_clock;

//---------------------------- Functions -----------------------------

void connectAWS(int argc, char *argv[])
{
    /************************ Setup the Lib ****************************/
    /*
     * Do the global initialization for the API.
     */
    ApiHandle apiHandle;
    uint32_t messageCount = 10;

    /*********************** Parse Arguments ***************************/
    Utils::CommandLineUtils cmdUtils = Utils::CommandLineUtils();
    cmdUtils.RegisterProgramName("basic_pub_sub");
    cmdUtils.AddCommonMQTTCommands();
    cmdUtils.RegisterCommand("key", "<path>", "Path to your key in PEM format.");
    cmdUtils.RegisterCommand("cert", "<path>", "Path to your client certificate in PEM format.");
    cmdUtils.AddCommonProxyCommands();
    cmdUtils.AddCommonTopicMessageCommands();
    cmdUtils.RegisterCommand("client_id", "<str>", "Client id to use (optional, default='test-*')");
    cmdUtils.RegisterCommand("count", "10", "The number of messages to send (optional, default='10')");
    cmdUtils.RegisterCommand("port_override", "<int>", "The port override to use when connecting (optional)");
    cmdUtils.AddLoggingCommands();
    const char **const_argv = (const char **)argv;                         // !
    cmdUtils.SendArguments(const_argv, const_argv + argc);
    cmdUtils.StartLoggingBasedOnCommand(&apiHandle);

    String topic = cmdUtils.GetCommandOrDefault("topic", "test/topic");
    String clientId = cmdUtils.GetCommandOrDefault("client_id", String("test-") + Aws::Crt::UUID().ToString());

    String messagePayload = cmdUtils.GetCommandOrDefault("message", "Hello world!");
    if (cmdUtils.HasCommand("count"))
    {
        int count = atoi(cmdUtils.GetCommand("count").c_str());
        if (count > 0)
        {
            messageCount = count;
        }
    }

    /* Get a MQTT client connection from the command parser */
    auto connection = cmdUtils.BuildMQTTConnection();

    /*
     * In a real world application you probably don't want to enforce synchronous behavior
     * but this is a sample console application, so we'll just do that with a condition variable.
     */
    std::promise<bool> connectionCompletedPromise;
    std::promise<void> connectionClosedPromise;

    /*
     * This will execute when an MQTT connect has completed or failed.
     */
    auto onConnectionCompleted = [&](Mqtt::MqttConnection &, int errorCode, Mqtt::ReturnCode returnCode, bool) {
        if (errorCode)
        {
            fprintf(stdout, "Connection failed with error %s\n", ErrorDebugString(errorCode));
            connectionCompletedPromise.set_value(false);
        }
        else
        {
            fprintf(stdout, "Connection completed with return code %d\n", returnCode);
            connectionCompletedPromise.set_value(true);
        }
    };

    auto onInterrupted = [&](Mqtt::MqttConnection &, int error) {
        fprintf(stdout, "Connection interrupted with error %s\n", ErrorDebugString(error));
    };

    auto onResumed = [&](Mqtt::MqttConnection &, Mqtt::ReturnCode, bool) { fprintf(stdout, "Connection resumed\n"); };

    /*
     * Invoked when a disconnect message has completed.
     */
    auto onDisconnect = [&](Mqtt::MqttConnection &) {
        {
            fprintf(stdout, "Disconnect completed\n");
            connectionClosedPromise.set_value();
        }
    };

    connection->OnConnectionCompleted = std::move(onConnectionCompleted);
    connection->OnDisconnect = std::move(onDisconnect);
    connection->OnConnectionInterrupted = std::move(onInterrupted);
    connection->OnConnectionResumed = std::move(onResumed);

    /*
     * Actually perform the connect dance.
     */
    fprintf(stdout, "Connecting...\n");
    if (!connection->Connect(clientId.c_str(), false /*cleanSession*/, 1000 /*keepAliveTimeSecs*/))
    {
        fprintf(stderr, "MQTT Connection failed with error %s\n", ErrorDebugString(connection->LastError()));
        exit(-1);
    }

    if (connectionCompletedPromise.get_future().get())
    {
        std::mutex receiveMutex;                                      //  !
        std::condition_variable receiveSignal;
        uint32_t receivedCount = 0;

        //  !
        /*
         * This is invoked upon the receipt of a Publish on a subscribed topic.
         */
        auto onMessage = [&](Mqtt::MqttConnection &,
                             const String &topic,
                             const ByteBuf &byteBuf,
                             bool /*dup*/,
                             Mqtt::QOS /*qos*/,
                             bool /*retain*/) {
            {
                std::lock_guard<std::mutex> lock(receiveMutex);
                ++receivedCount;
                fprintf(stdout, "Publish #%d received on topic %s\n", receivedCount, topic.c_str());
                fprintf(stdout, "Message: ");
                fwrite(byteBuf.buffer, 1, byteBuf.len, stdout);
                fprintf(stdout, "\n");
            }

            receiveSignal.notify_all();
        };
        
        //  !
        /*
         * Subscribe for incoming publish messages on topic.
         */
        std::promise<void> subscribeFinishedPromise;
        auto onSubAck =
            [&](Mqtt::MqttConnection &, uint16_t packetId, const String &topic, Mqtt::QOS QoS, int errorCode) {
                if (errorCode)
                {
                    fprintf(stderr, "Subscribe failed with error %s\n", aws_error_debug_str(errorCode));
                    exit(-1);
                }
                else
                {
                    if (!packetId || QoS == AWS_MQTT_QOS_FAILURE)
                    {
                        fprintf(stderr, "Subscribe rejected by the broker.");
                        exit(-1);
                    }
                    else
                    {
                        fprintf(stdout, "Subscribe on topic %s on packetId %d Succeeded\n", topic.c_str(), packetId);
                    }
                }
                subscribeFinishedPromise.set_value();
            };

        connection->Subscribe(topic.c_str(), AWS_MQTT_QOS_AT_LEAST_ONCE, onMessage, onSubAck);
        subscribeFinishedPromise.get_future().wait();

        uint32_t publishedCount = 0;
        while (publishedCount < messageCount)
        {
            ByteBuf payload = ByteBufFromArray((const uint8_t *)messagePayload.data(), messagePayload.length());

            auto onPublishComplete = [](Mqtt::MqttConnection &, uint16_t, int) {};
            connection->Publish(topic.c_str(), AWS_MQTT_QOS_AT_LEAST_ONCE, false, payload, onPublishComplete);
            ++publishedCount;

            std::this_thread::sleep_for(std::chrono::milliseconds(1000));
        }

        {
            std::unique_lock<std::mutex> receivedLock(receiveMutex);
            receiveSignal.wait(receivedLock, [&] { return receivedCount >= messageCount; });
        }

        /*
         * Unsubscribe from the topic.
         */
        std::promise<void> unsubscribeFinishedPromise;
        connection->Unsubscribe(
            topic.c_str(), [&](Mqtt::MqttConnection &, uint16_t, int) { unsubscribeFinishedPromise.set_value(); });
        unsubscribeFinishedPromise.get_future().wait();

        /* Disconnect */
        if (connection->Disconnect())
        {
            connectionClosedPromise.get_future().wait();
        }
    }
    else
    {
        exit(-1);
    }
  
  
  // -------------------------------------------------------------------------------------
  // Define MQTT topics
  // const char* AWS_IOT_PUBLISH_TOPIC = "aws/things/construction_esp32/shadow/update/demo-01";
  // const char* AWS_IOT_SUBSCRIBE_TOPIC = "aws/things/construction_esp32/shadow/update/accepted/demo-01";

  // std::cout << "Connecting to Wi-Fi" << std::endl;

  // // Configure WiFiClientSecure to use the AWS IoT device credentials
  // net.setCACert(AWS_CERT_CA);
  // net.setCertificate(AWS_CERT_CRT);
  // net.setPrivateKey(AWS_CERT_PRIVATE);

  // // Connect to the MQTT broker on the AWS endpoint we defined earlier
  // client.setServer(AWS_IOT_ENDPOINT, 8883);

  // // Create a message handler
  // client.setCallback(messageHandler);

  // std::cout << "Connecting to AWS IOT" << std::endl;

  // while (!client.connect(THINGNAME))
  // {
  //   std::cout << "." << std::endl;
  //   sleep_for(100ms);
  // }

  // if (!client.connected())
  // {
  //   std::cout << "AWS IoT Timeout!" << std::endl;
  //   return;
  // }

  // // Subscribe to a topic
  // client.subscribe(AWS_IOT_SUBSCRIBE_TOPIC);

  // std::cout << "AWS IoT Connected!" << std::endl;
}

unsigned long getTime() {
  time_t now;
  time(&now);
  return now;
}

void messageHandler(char* topic, 
// byte* payload,
unsigned int length)
{
  // std::cout << "incoming: " << std::endl;
  // std::cout << topic << std::endl; 

  // StaticJsonDocument<200> doc;
  // deserializeJson(doc, payload);
  // const char* message = doc["message"];
  // std::cout << message << std::endl;
}

void publishMessage()
{
  // DynamicJsonDocument doc(2048);
  // doc["clientToken"] = "vdn_esp32";

  // JsonObject state = doc.createNestedObject("state");
  // JsonObject reported = state.createNestedObject("reported");
  
  // reported["nodeID"] = "CleverPal-ESP32-n3";
  // reported["sequence"] = "23";
  // epochTime = getTime();
  // reported["type"] = "Wifi";
  // reported["rssi"] = -71;
  // reported["battery"] = "89%";

  // JsonArray data = reported.createNestedArray("data");
  // for (int i  = 0; i < 3; i++){
  //   StaticJsonDocument<200> data_doc;
  //   data_doc["index"] = i;
  //   data_doc["deviceId"] = "demo-01";
  //   epochTime = epochTime + 2000;
  //   data_doc["data_timestamp"] = epochTime;
  //   data_doc["temp"] = t;
  //   data_doc["humid"] = h;
  //   data_doc["pm25"] = 12;
  //   data_doc["vib"] = 56;
  //   data_doc["sound"] = 71;
  //   data.add(data_doc);
  // }
  
  // char jsonBuffer[1024];
  // serializeJson(doc, jsonBuffer); // print to client

  // client.publish(AWS_IOT_PUBLISH_TOPIC, jsonBuffer);
}

void loop()
{
  float h = 70;
  float t = 30;

  if (isnan(h) || isnan(t) )  // Check if any reads failed and exit early (to try again).
  {
    std::string("Failed to read from DHT sensor!");
    return;
  }

  std::cout << "Humidity: " << h << std::endl;
  std::cout << "  Temperature: " << t << "°C " << std::endl;

  publishMessage();
  sleep_for(7s);
}



//-------------------------- Main program ----------------------------
int main(int argc, char *argv[]){
  connectAWS(argc, argv);
  
  // loop();
    
  return 0;
}