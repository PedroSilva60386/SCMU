#include "Network.h"
#include "addons/TokenHelper.h"

#define WIFI_SSID "admin"
#define WIFI_PASSWORD "admin123"

#define API_KEY "AIzaSyCk6PWzdR3WYM-f84ZZhPMW-p0FOPB4_aU"
#define FIREBASE_PROJECT_ID "oldtimes-4f4aa"
#define USER_EMAIL "admin@oldtimes.com"
#define USER_PASSWORD "admin123"

static Network *instance = NULL;

Network::Network(){
  instance = this;
}

void WiFiEventConnected(system_event_id_t event, system_event_info_t info){
  Serial.println("Connected to WiFi");
}

void WiFiEventGotIP(system_event_id_t event, system_event_info_t info){
  Serial.print("IP address: ");
  Serial.println(IPAddress(info.got_ip.ip_info.ip.addr));
  instance->firebaseInit();
}

void WiFiEventDisconnected(system_event_id_t event, system_event_info_t info){
  Serial.println("Disconnected from WiFi");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
}

void FirestoreTokenStatusCallback(TokenInfo info){
  Serial.printf("Token Info: type = %s, status = %s\n", getTokenType(info), getTokenStatus(info));
}

void Network::initWiFi(){
  WiFi.disconnect();
  WiFi.onEvent(WiFiEventConnected, SYSTEM_EVENT_STA_CONNECTED);
  WiFi.onEvent(WiFiEventGotIP, SYSTEM_EVENT_STA_GOT_IP);
  WiFi.onEvent(WiFiEventDisconnected, SYSTEM_EVENT_STA_DISCONNECTED);

  WiFi.begin(ssid, password);
}

void Network::firebaseInit(){
  config.api_key = API_KEY;

  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  config.token_status_callback = FirestoreTokenStatusCallback;

  Firebase.begin(&config, &auth);
}

void Network::firestoreDataUpdate(double temp, double humi){
  if(WiFi.status() == WL_CONNECTED && Firebase.ready()){
    String documentPath = "rooms/1";

    FirebaseJson content;

    content.set("fields/temperature/doubleValue", String(temp).c_str());
    content.set("fields/humidity/doubleValue", String(humi).c_str());

    if(Firebase.Firestore.patchDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), content.raw(), "temperature,humidity")){
      Serial.printf("ok\n%s\n\n", fbdo.payload().c_str());
      return;
    }else{
      Serial.println(fbdo.errorReason());
    }

    if(Firebase.Firestore.createDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), content.raw())){
      Serial.printf("ok\n%s\n\n", fbdo.payload().c_str());
      return;
    }else{
      Serial.println(fbdo.errorReason());
    }
  }
}