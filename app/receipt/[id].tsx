import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function Receipt() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Receipt ID: {id}</Text>
        <Pressable>
          <Text style={styles.text}>Print Receipt</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
  }
});
