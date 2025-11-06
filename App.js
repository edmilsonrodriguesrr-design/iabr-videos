import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Video } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [videoUri, setVideoUri] = useState(null);

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      processVideo(result.assets[0].uri);
    }
  };

  const processVideo = async (uri) => {
    try {
      setLoading(true);

      // Aqui futuramente substituímos pela API IA
      // Agora, só simula o processamento
      setTimeout(() => {
        setLoading(false);
        setVideoUri(uri);
      }, 4000);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>IA BR 🔥</Text>

      <TouchableOpacity style={styles.button} onPress={pickVideo}>
        <Text style={styles.buttonText}>Selecionar Vídeo</Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      )}

      {videoUri && (
        <Video
          source={{ uri: videoUri }}
          style={styles.video}
          resizeMode="contain"
          useNativeControls
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#ff0033",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  video: {
    width: "90%",
    height: 300,
    marginTop: 30,
  },
});
