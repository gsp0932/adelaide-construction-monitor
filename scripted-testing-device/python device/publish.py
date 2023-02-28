# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: MIT-0

from awscrt import io, mqtt, auth, http
from awsiot import mqtt_connection_builder
import time as t
import json

# Define ENDPOINT, CLIENT_ID, PATH_TO_CERTIFICATE, PATH_TO_PRIVATE_KEY, PATH_TO_AMAZON_ROOT_CA_1, MESSAGE, TOPIC, and RANGE
ENDPOINT = "a2zztnkycni9kh-ats.iot.us-west-1.amazonaws.com"
CLIENT_ID = "construction_esp32"
# PATH_TO_CERTIFICATE = "certificates/a1b23cd45e-certificate.pem.crt"
PATH_TO_CERTIFICATE = "/home/gsp09/_Workplace/_Adelaide Construction Monitor/real-time-monitor/scripted-device/python device/Certificates(construction_esp32)/d9615cbc1f04ce4692fd160a8f9cf7d87cd746d26d6e54690b55b3eec2c491e9-certificate.pem.crt"
PATH_TO_PRIVATE_KEY = "/home/gsp09/_Workplace/_Adelaide Construction Monitor/real-time-monitor/scripted-device/python device/Certificates(construction_esp32)/d9615cbc1f04ce4692fd160a8f9cf7d87cd746d26d6e54690b55b3eec2c491e9-private.pem.key"
PATH_TO_AMAZON_ROOT_CA_1 = "/home/gsp09/_Workplace/_Adelaide Construction Monitor/real-time-monitor/scripted-device/python device/Certificates(construction_esp32)/AmazonRootCA1.pem"
MESSAGE = "Hello World"
# TOPIC = "/testing"
TOPIC = "aws/things/construction_esp32/shadow/update/demo-01"
RANGE = 20

# Spin up resources
event_loop_group = io.EventLoopGroup(1)
host_resolver = io.DefaultHostResolver(event_loop_group)
client_bootstrap = io.ClientBootstrap(event_loop_group, host_resolver)
mqtt_connection = mqtt_connection_builder.mtls_from_path(
            endpoint=ENDPOINT,
            cert_filepath=PATH_TO_CERTIFICATE,
            pri_key_filepath=PATH_TO_PRIVATE_KEY,
            client_bootstrap=client_bootstrap,
            ca_filepath=PATH_TO_AMAZON_ROOT_CA_1,
            client_id=CLIENT_ID,
            clean_session=False,
            keep_alive_secs=6
            )
print("Connecting to {} with client ID '{}'...".format(
        ENDPOINT, CLIENT_ID))
# Make the connect() call
connect_future = mqtt_connection.connect()
# Future.result() waits until a result is available
connect_future.result()
print("Connected!")
# Publish message to server desired number of times.
print('Begin Publish')
for i in range (RANGE):
    data = "{} [{}]".format(MESSAGE, i+1)
    message = {"message" : data}
    mqtt_connection.publish(topic=TOPIC, payload=json.dumps(message), qos=mqtt.QoS.AT_LEAST_ONCE)
    print("Published: '" + json.dumps(message) + "' to the topic: " + "'/aws/things/construction_esp32/shadow/update'")
    t.sleep(0.1)
print('Publish End')
disconnect_future = mqtt_connection.disconnect()
disconnect_future.result()