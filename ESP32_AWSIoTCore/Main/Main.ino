#include "secrets.h"
#include <WiFiClientSecure.h>

#include <PubSubClient.h>
//#include <MQTTClient.h>

#include <ArduinoJson.h>
#include "WiFi.h"
#include <ctime>
#include <random>

#include "DHT.h"
#define DHTPIN 25     // Digital pin connected to the DHT sensor
#define DHTTYPE DHT11   // DHT 11

//#define AWS_IOT_PUBLISH_TOPIC "$aws/things/construction_esp32/shadow/update/demo-01"
//#define AWS_IOT_SUBSCRIBE_TOPIC "$aws/things/construction_esp32/shadow/update/accepted/demo-01"

#define AWS_IOT_PUBLISH_TOPIC "aws/things/construction_esp32/shadow/update"
#define AWS_IOT_SUBSCRIBE_TOPIC "aws/things/construction_esp32/shadow/update/accepted"

float h ;
float t;
int interval = 5;                   // default interval

DHT dht(DHTPIN, DHTTYPE);

WiFiClientSecure net = WiFiClientSecure();

PubSubClient client(net);
//MQTTClient client = MQTTClient(256);

// NTP server to request epoch time
const char* ntpServer = "pool.ntp.org";

// Variable to save current epoch time
unsigned long epochTime; 

// Function that gets current epoch time
unsigned long getTime() {
  time_t now;
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    //Serial.println("Failed to obtain time");
    return(0);
  }
  time(&now);
  return now;
}

void connectAWS()
{
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.println("Connecting to Wi-Fi");

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  // Configure WiFiClientSecure to use the AWS IoT device credentials
  net.setCACert(AWS_CERT_CA);
  net.setCertificate(AWS_CERT_CRT);
  net.setPrivateKey(AWS_CERT_PRIVATE);

  // Connect to the MQTT broker on the AWS endpoint we defined earlier
  client.setServer(AWS_IOT_ENDPOINT, 8883);

  // Create a message handler
  client.setCallback(messageHandler);

  Serial.println("Connecting to AWS IOT");

  while (!client.connect(THINGNAME))
  {
    Serial.print(".");
    delay(100);
  }

  if (!client.connected())
  {
    Serial.println("AWS IoT Timeout!");
    return;
  }

  // Subscribe to a topic
  client.subscribe(AWS_IOT_SUBSCRIBE_TOPIC);
//  client.subscribe(AWS_IOT_SUBSCRIBE_TOPIC2);
//  client.subscribe(AWS_IOT_SUBSCRIBE_TOPIC3);

  Serial.println("AWS IoT Connected!");
}

void publishMessage()
{
  
  DynamicJsonDocument doc(2048);
  doc["clientToken"] = "vdn_esp32";

  JsonObject state = doc.createNestedObject("state");
  JsonObject reported = state.createNestedObject("reported");
  
  reported["nodeID"] = "CleverPal-ESP32-n3";
  reported["sequence"] = "23";

  reported["type"] = "Wifi";
  reported["rssi"] = -71;
  reported["battery"] = "89%";

  JsonArray data = reported.createNestedArray("data");
  for (int i  = 0; i < interval; i++){
    StaticJsonDocument<200> dataDoc;
    dataDoc["index"] = i;
    dataDoc["deviceId"] = "demo-01";
    dataDoc["data_timestamp"] = getTime();
    dataDoc["temp"] = t;
    dataDoc["humid"] = h;
    dataDoc["pm1"] = 5;
    dataDoc["pm25"] = 7;
    dataDoc["pm10"] = 12;
    dataDoc["vib_h"] = 56;
    dataDoc["vib_v"] = 75;
    dataDoc["sound"] = 71;
    data.add(dataDoc);

    delay(900);
//    epochTime = epochTime + 1000;
  }
  
  
  char jsonBuffer[1024];
  serializeJson(doc, jsonBuffer); // print to client

  client.publish(AWS_IOT_PUBLISH_TOPIC, jsonBuffer);
}

void messageHandler(char* topic, byte* payload, unsigned int length)
{
  Serial.print("incoming: ");
  Serial.println(topic);

  DynamicJsonDocument doc(2048);
  deserializeJson(doc, payload);
//  const char* message = doc["message"];
  const char* deltaInterval = doc["interval"];
  interval = atoi(deltaInterval);
  Serial.println(interval);
}

void setup()
{
  Serial.begin(115200);
  connectAWS();
  client.setBufferSize(1024);
  configTime(0, 0, ntpServer);
//  std::random_device dev;
//  std::mt19937 rng(dev());
//  std::uniform_int_distribution<std::mt19937::result_type> pm_dist(2,30);
//  std::uniform_int_distribution<std::mt19937::result_type> sound_dist(2,30);
//  std::uniform_int_distribution<std::mt19937::result_type> vib_dist(2,30);
  dht.begin();
}

void loop()
{
  h = dht.readHumidity();
  t = dht.readTemperature();


  if (isnan(h) || isnan(t) )  // Check if any reads failed and exit early (to try again).
  {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.print(F("%  Temperature: "));
  Serial.print(t);
  Serial.println(F("°C "));

  publishMessage();
  client.loop();
  delay((interval+1)*900);
}
