import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import ReceiptView from "../components/ReceiptView";

export default function Receipt() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [receipt, setReceipt] = React.useState<string>("");

  React.useEffect(() => {
    const fetchReceipt = async () => {
      const storedReceipt = await AsyncStorage.getItem(id);
      setReceipt(storedReceipt || "");
    };
    fetchReceipt();
  }, [id]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ReceiptView receipt={receipt} />
        <Pressable>
          <Text style={styles.button}>Print Receipt</Text>
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
  button: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    margin: "auto",
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.8,
    elevation: 5,
    width: "100%",
  },
});
