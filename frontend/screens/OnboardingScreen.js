import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Animated,
} from "react-native";

const { width } = Dimensions.get("window");

const slides = [
  {
    key: "1",
    title: "Welcome to ShareBite 🍱",
    desc: "Easily donate food and help those in need. Quick, local, and secure.",
    accent: "#16a085",
  },
  {
    key: "2",
    title: "Donation History 📋",
    desc: "You can view all available donations — transparent and simple.",
    accent: "#2d9cdb",
  },
  {
    key: "3",
    title: "AI Assistant 🤖",
    desc: "Ask questions, get guidance, and improve donation logistics instantly.",
    accent: "#9b59b6",
  },
  {
    key: "4",
    title: "Feedback ✨",
    desc: "Share your thoughts to help ShareBite grow and serve better.",
    accent: "#f39c12",
  },
];

export default function OnboardingScreen({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatRef = useRef(null);
  const [index, setIndex] = useState(0);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) setIndex(viewableItems[0].index);
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const nextSlide = () => {
    if (index < slides.length - 1) {
      flatRef.current?.scrollToIndex({ index: index + 1 });
    } else {
      navigation.replace("Login");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#e8f5e9" />
      <View style={styles.container}>
        <Animated.FlatList
          ref={flatRef}
          data={slides}
          keyExtractor={(item) => item.key}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          renderItem={({ item, index: i }) => {
            // Interpolate scale for subtle card zoom
            const inputRange = [
              (i - 1) * width,
              i * width,
              (i + 1) * width,
            ];
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.92, 1, 0.92],
              extrapolate: "clamp",
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.6, 1, 0.6],
              extrapolate: "clamp",
            });

            return (
              <View style={{ width, alignItems: "center", paddingVertical: 40 }}>
                <Animated.View
                  style={[
                    styles.slide,
                    { transform: [{ scale }], opacity, borderColor: item.accent },
                  ]}
                >
                  <View style={[styles.iconCircle, { backgroundColor: item.accent + "20" }]}>
                    <Text style={styles.iconEmoji}>
                      {item.title.split(" ").pop().includes("🍱") ? "🍱" : "⭐"}
                    </Text>
                  </View>

                  <Text style={[styles.title, { color: item.accent }]}>
                    {item.title}
                  </Text>

                  <Text style={styles.desc}>{item.desc}</Text>
                </Animated.View>
              </View>
            );
          }}
        />

        {/* Dots */}
        <View style={styles.dotsWrap}>
          {slides.map((_, i) => {
            const opacity = scrollX.interpolate({
              inputRange: [(i - 0.5) * width, i * width, (i + 0.5) * width],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            const scale = scrollX.interpolate({
              inputRange: [(i - 0.8) * width, i * width, (i + 0.8) * width],
              outputRange: [0.8, 1.5, 0.8],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={`dot-${i}`}
                style={[
                  styles.dot,
                  { opacity, transform: [{ scale }] },
                ]}
              />
            );
          })}
        </View>

        {/* Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.button, index === slides.length - 1 && styles.getStarted]}
          onPress={nextSlide}
        >
          <Text style={styles.buttonText}>
            {index === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#e8f5e9",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },

  slide: {
    width: width * 0.88,
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 28,
    alignItems: "center",
    justifyContent: "flex-start",
    elevation: 14,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    borderWidth: 1,
  },

  iconCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
  },

  iconEmoji: {
    fontSize: 34,
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 10,
    textAlign: "center",
    letterSpacing: 0.4,
  },

  desc: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 6,
  },

  dotsWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    height: 28,
  },

  dot: {
    width: 9,
    height: 9,
    borderRadius: 9,
    backgroundColor: "#16c47f",
    marginHorizontal: 8,
  },

  button: {
    backgroundColor: "#16c47f",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 18,
    position: "absolute",
    bottom: 28,
    alignSelf: "center",
    alignItems: "center",
    elevation: 12,
    shadowColor: "#16c47f",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 24,
  },

  getStarted: {
    backgroundColor: "#0ea06f",
    width: "72%",
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
});
