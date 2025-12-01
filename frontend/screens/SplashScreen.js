import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, StatusBar, Animated, Easing } from "react-native";

export default function SplashScreen({ navigation }) {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Navigate to Onboarding after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace("Onboarding");
    }, 2000);

    const animateDot = (dot, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: -10,
            duration: 400,
            delay,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ])
      ).start();
    };

    animateDot(dot1, 0);
    animateDot(dot2, 150);
    animateDot(dot3, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <View style={styles.card}>
        <Text style={styles.logo}>🍱 ShareBite 🤝</Text>

        <View style={styles.dotContainer}>
          <Animated.View style={[styles.dot, { transform: [{ translateY: dot1 }] }]} />
          <Animated.View style={[styles.dot, { transform: [{ translateY: dot2 }] }]} />
          <Animated.View style={[styles.dot, { transform: [{ translateY: dot3 }] }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#27ae60",
  },
  card: {
    paddingVertical: 50,
    paddingHorizontal: 60,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    alignItems: "center",
  },
  logo: {
    fontSize: 38,
    fontWeight: "900",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 1.2,
    textShadowColor: "rgba(255,255,255,0.6)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  dotContainer: {
    flexDirection: "row",
    marginTop: 35,
    justifyContent: "center",
    gap: 12,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#fff",
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
});
