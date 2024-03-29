#include <pgmspace.h>
 
#define SECRET
#define THINGNAME "construction_esp32_0"                         //change this

const char WIFI_SSID[] = "Hieu Nguyen 84";               //change this
const char WIFI_PASSWORD[] = "Hieu1984";           //change this
const char AWS_IOT_ENDPOINT[] = "a2zztnkycni9kh-ats.iot.us-west-1.amazonaws.com";       //change this
 
// Amazon Root CA 1
static const char AWS_CERT_CA[] PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----
MIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF
ADA5MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRkwFwYDVQQDExBBbWF6
b24gUm9vdCBDQSAxMB4XDTE1MDUyNjAwMDAwMFoXDTM4MDExNzAwMDAwMFowOTEL
MAkGA1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJv
b3QgQ0EgMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALJ4gHHKeNXj
ca9HgFB0fW7Y14h29Jlo91ghYPl0hAEvrAIthtOgQ3pOsqTQNroBvo3bSMgHFzZM
9O6II8c+6zf1tRn4SWiw3te5djgdYZ6k/oI2peVKVuRF4fn9tBb6dNqcmzU5L/qw
IFAGbHrQgLKm+a/sRxmPUDgH3KKHOVj4utWp+UhnMJbulHheb4mjUcAwhmahRWa6
VOujw5H5SNz/0egwLX0tdHA114gk957EWW67c4cX8jJGKLhD+rcdqsq08p8kDi1L
93FcXmn/6pUCyziKrlA4b9v7LWIbxcceVOF34GfID5yHI9Y/QCB/IIDEgEw+OyQm
jgSubJrIqg0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMC
AYYwHQYDVR0OBBYEFIQYzIU07LwMlJQuCFmcx7IQTgoIMA0GCSqGSIb3DQEBCwUA
A4IBAQCY8jdaQZChGsV2USggNiMOruYou6r4lK5IpDB/G/wkjUu0yKGX9rbxenDI
U5PMCCjjmCXPI6T53iHTfIUJrU6adTrCC2qJeHZERxhlbI1Bjjt/msv0tadQ1wUs
N+gDS63pYaACbvXy8MWy7Vu33PqUXHeeE6V/Uq2V8viTO96LXFvKWlJbYK8U90vv
o/ufQJVtMVT8QtPHRh8jrdkPSHCa2XV4cdFyQzR1bldZwgJcJmApzyMZFo6IQ6XU
5MsI+yMRQ+hDKXJioaldXgjUkK642M4UwtBV8ob2xJNDd2ZhwLnoQdeXeGADbkpy
rqXRfboQnoZsG4q5WTP468SQvvG5
-----END CERTIFICATE-----
)EOF";
 
// Device Certificate                                               //change this
static const char AWS_CERT_CRT[] PROGMEM = R"KEY(
-----BEGIN CERTIFICATE-----
MIIDWjCCAkKgAwIBAgIVALm98dLsvSytUlB555Y80NSQfy94MA0GCSqGSIb3DQEB
CwUAME0xSzBJBgNVBAsMQkFtYXpvbiBXZWIgU2VydmljZXMgTz1BbWF6b24uY29t
IEluYy4gTD1TZWF0dGxlIFNUPVdhc2hpbmd0b24gQz1VUzAeFw0yMjA5MjEwNDE5
MDJaFw00OTEyMzEyMzU5NTlaMB4xHDAaBgNVBAMME0FXUyBJb1QgQ2VydGlmaWNh
dGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCxexoUjtBKBzRRPw5a
ZD5kJcw+VsDcaJotnREFRb6yKnBhNa+ymx8pa8JvYQVdnAa/Z3FrabKv5yjn646A
QANcq9RKsEFiQxKOqqJiLe3pLh5iqdrRhddq0AwsJEDBzmXHdq4iCerjbwcngkbA
lZMtI3Djhi4rjtF8g4sng5iF2/Of0d/EMR66kq6wec7vh4+WTGpsfu7ymczlG4c8
DtrvAjxwvC9PMIejBLugl0rxqUMAK9REScWuQqinuy+43mQUkEV8RZbfFQ6B6+ix
eNWWpjUODhtN6Ib+4lFena8kcQToOsDZ4nOTDe8w7TpxyevRuX1Es0NN4FL4E/48
k0zRAgMBAAGjYDBeMB8GA1UdIwQYMBaAFGPfPpSSXev/3P4ubil+WYIrnJs5MB0G
A1UdDgQWBBRvttW3O7lmju6vcBFLBlbDFi/8tjAMBgNVHRMBAf8EAjAAMA4GA1Ud
DwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAQEAOA3Mgi+acUo4MB7wIeBvqbBn
+ZPuNZfCylxQRiqH+B6Smm5rc0xq+5Jubfdn7+01J0Zwd4VoNxaQJgaLUZ+CxncA
7NDm+Xv3YuqC2tPWwRxuoFtDux4DJIwlBMKXhood6HRPDXHPMES8xMOJ7NYHFvOv
V265p/xgdeWkIqS22to4nD0liWF5xvGtmcuCi2edjESTId/4uqu6w/3VOblg9vZh
SJl6iW/VIkvJpxF1pJ+wzURfmRvlv0qoFNyJpzRswuJ/ZbzW4B2MxNgChylKDaDn
6JN5Ueu4dAo0Nd85blLG6p7Ut8eZhROgooSECypWt6RRulF3VPnnrthBrd2B/g==
-----END CERTIFICATE-----
)KEY";
 
// Device Private Key                                               //change this
static const char AWS_CERT_PRIVATE[] PROGMEM = R"KEY(
-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAsXsaFI7QSgc0UT8OWmQ+ZCXMPlbA3GiaLZ0RBUW+sipwYTWv
spsfKWvCb2EFXZwGv2dxa2myr+co5+uOgEADXKvUSrBBYkMSjqqiYi3t6S4eYqna
0YXXatAMLCRAwc5lx3auIgnq428HJ4JGwJWTLSNw44YuK47RfIOLJ4OYhdvzn9Hf
xDEeupKusHnO74ePlkxqbH7u8pnM5RuHPA7a7wI8cLwvTzCHowS7oJdK8alDACvU
REnFrkKop7svuN5kFJBFfEWW3xUOgevosXjVlqY1Dg4bTeiG/uJRXp2vJHEE6DrA
2eJzkw3vMO06ccnr0bl9RLNDTeBS+BP+PJNM0QIDAQABAoIBABbfZIcNuK4xq35k
//aKQLgrXt0R1R0SpfwG5/CkAmV3rq/4eUItV6DA8HfmKwjbWMtGC4nqP0sIIW9y
HhVNKqHAy0Us3eBKAJQ+TVsVzDlm5ieU+ExUUWTEly0BJw9TCC7ijqJ4YLsazfM7
iN686BDDJoNMAZs/dqPzV/WpsfheH19foOXKMTqu7mKn4eZOSR5+wI2A9+AuTeXt
CS+L6AZyzeZK5aXDc577JtTZsJq13Cv7QKSyjTRNT2vEZeKYcgdCVRgxwKx1tC2d
I58Juqp1EtrHyGlbNDmkPK5b7y5WAGEZvKVabCBUGVa/cLqNWy0Rsoq8GMnJUDKD
wMxagAECgYEA2BFhwgQO9s8f9s3+Am3GVHNXfVMscJS3DjALxEuIiVq3XKmcYv4M
HUDeUI1hVi3qSR2BF6oy/UcuCAlcV5T2W1b1bAVMejiCxQoc+h+83DvuJEkcsDaM
8Emdjjy0N6++nSbydS880N57Ierc68W3+vlYGCELk7UCLOuN7cWotAECgYEA0kgW
gtKHa/hLdumB55k1lDmScmU7x586pGQa4ccWfKtsoRAlzSVHxqJx5Xe0H6v3/kFA
kkpWQWAIc3wBEzcNawPp40TvgfDhcBqYRoYs6zliu5ogLmAsrmKRf3ZG5YjJeuCu
JULFmSpKnO79Ok3NgjM5VjarpAWtpx1wM3/4WNECgYBiMpwkSiXm48GaMIqF3hAq
J3WWvqtOyzfa2dkvMEjwa+sz0N4DW4Rz8xxWrbqUKS/2ZNNbxv1/gM8Z1e9C2q+Q
WZgWrN3SGkbMeEktICl8Sjxz/0prh49MUZiqoUoimNvfnmjI+1v/bW22v4ACI4z3
IkV4SeRyD+zaL4AElTWUAQKBgDht9fSHcKXtzLqNcTnoaHNte7pNJlysgz0oS/p4
xbUQ/6a9QZeqwHcykqQEmobBTFyjwCNB5aHHlpz/Ev7IEEa+lx5RGoDhVm4SBPkv
+o/pJ3C2rJolXvgxJWByKhZgvcjG0JTZNVOkAL/adoQV6udcva9AHpF2oKIvCTQY
zFlxAoGAXmksDr71lnHbugrV3foZelAZL3/0ROEqjtDRhk9ce3HvOF2RB0mP1kAP
7TTyjQDN8BLNgvT9vyX5nPBMrfG6vY1X+fzRgUz70GEmaeSpoou+1IoLe4JFektl
azou5e9KOmML1koQsZ2eW537+ShzB3buI4X8oAdJtbCZem5TNvk=
-----END RSA PRIVATE KEY-----
)KEY";
