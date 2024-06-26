#ifndef Network_H_
#define Network_H_

#include <WiFi.h>
#include <Firebase_ESP_Client.h>
class Network{
private:
  FirebaseData fbdo;
  FirebaseAuth auth;
  FirebaseConfig config;

  void firebaseInit();
  friend void WiFiEventConnected(system_event_id_t event, system_event_info_t info);
  friend void WiFiEventGotIP(system_event_id_t event, system_event_info_t info);
  friend void WiFiEventDisconnected(system_event_id_t event, system_event_info_t info);
  friend void FirestoreTokenStatusCallback(TokenInfo info);

public:
  Network();
  void initWiFi();
  void firestoreDataUpdate(double temp, double humi);
};


#endif