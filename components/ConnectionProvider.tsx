import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import ImageNoConnection from "../assets/images/ImageNoConnection.png"; // ✅ import als module

export const ConnectionProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected && state.isInternetReachable !== false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1 }}>
                  <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {children}

      {/* Geen verbinding popup */}
      <Modal visible={!isConnected} animationType="fade" transparent={false}>
        <View style={styles.fullscreen}>
          <Image source={ImageNoConnection} style={styles.image} resizeMode="contain" />

          <Text style={styles.title}>Geen verbinding</Text>
          <Text style={styles.text}>
            Er is geen internetverbinding. Controleer je netwerk en probeer opnieuw.
          </Text>

          <TouchableOpacity onPress={() => {}} style={styles.button}>
            <Text style={styles.buttonText}>Opnieuw proberen</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 36 : 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#252525",
    marginBottom: 12,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#515151",
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#29A86E",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
