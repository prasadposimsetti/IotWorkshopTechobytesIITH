#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// Replace with your network credentials
const char* ssid = "SCIENT-GUEST";
const char* password = "Guest@123";
int ir= D1;


void setup() {
 Serial.begin(115200);
pinMode(ir,INPUT);




 // Connect to Wi-Fi
 WiFi.begin(ssid, password);
 while (WiFi.status() != WL_CONNECTED) {
   delay(1000);
   Serial.println("Connecting to WiFi...");
 }
 Serial.println("Connected to WiFi");
}








void loop() {




 // Check if NodeMCU is connected to the WiFi network


int value = digitalRead(ir);
   if (WiFi.status() == WL_CONNECTED) {
   // Create a WiFi client object
   WiFiClient wifiClient;
   // Make HTTP GET request
   HTTPClient http;




    const char* baseUrl = "http://172.16.209.81:5000/dataExchange?name=Device-1&targetDevice=Device-2&sensorValue=";
    String url = String(baseUrl) + value ;
   http.begin(wifiClient, url);
 
   int httpResponseCode = http.GET();
   if (httpResponseCode > 0) {
     Serial.print("HTTP response code: ");
     Serial.println(httpResponseCode);
     String payload = http.getString();
     Serial.println("Response payload:");
     Serial.println(payload);
   }
   else {
     Serial.print("Error code: ");
     Serial.println(httpResponseCode);
     Serial.print("Error message: ");
     Serial.println(http.errorToString(httpResponseCode).c_str());
   }
   http.end(); // Close HTTP connection
 }
  delay(5000);
}




}





