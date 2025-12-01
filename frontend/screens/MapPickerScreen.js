import React, { useState } from "react"; 
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapPickerScreen({ route, navigation }) {
  const { setLocation } = route.params;
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const confirmLocation = () => {
    if (!selectedLocation) return;

    setLocation(`${selectedLocation.latitude}, ${selectedLocation.longitude}`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onPress={handleMapPress}
        initialRegion={{
          latitude: 12.9716,
          longitude: 77.5946,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>

      <TouchableOpacity
        style={[
          styles.confirmButton,
          !selectedLocation && styles.disabledButton,
        ]}
        onPress={confirmLocation}
        disabled={!selectedLocation}
      >
        <Text style={styles.confirmButtonText}>Confirm Location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2f3",
  },

  map: {
    flex: 1,
  },

  confirmButton: {
    position: "absolute",
    bottom: 35,
    alignSelf: "center",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 40,

    // GLASS EFFECT BUTTON
    backgroundColor: "rgba(46, 204, 113, 0.90)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",

    // PREMIUM SHADOW
    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,

    // SLIGHT SCALE ANIMATION FEEL
    transform: [{ scale: 1 }],
  },

  disabledButton: {
    backgroundColor: "rgba(150, 150, 150, 0.7)",
    borderColor: "rgba(255,255,255,0.2)",

    shadowOpacity: 0.10,
    elevation: 3,
  },

  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
});
