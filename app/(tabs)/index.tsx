import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

function getSaleId() {
  return new Date().getTime().toString();
}

async function saveReceiptToAsyncStorage(receiptContent: string) {
  const saleId = getSaleId();
  const jsonData = JSON.stringify({
    receipt: receiptContent,
  });
  await AsyncStorage.setItem(saleId, jsonData).then(() => {
    console.log("Receipt saved successfully");
  }).catch((error) => {
    console.error("Error saving receipt:", error);
  });
}

async function getReceiptFromAsyncStorage(saleId: string) {
  const jsonData = await AsyncStorage.getItem(saleId);
  if (jsonData) {
    const data = JSON.parse(jsonData);
    return data.receipt;
  }
  return null;
}

export default function App() {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  const [receipt, setReceipt] = useState("");

  const addItem = () => {
    if (currentItem.name && currentItem.price && currentItem.quantity) {
      setItems([
        ...items,
        {
          ...currentItem,
          price: parseFloat(currentItem.price),
          quantity: parseInt(currentItem.quantity),
        },
      ]);
      setCurrentItem({ name: "", price: "", quantity: "" });
    }
  };

  const generateReceipt = () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    let receiptContent = `# Sales Receipt\n\n`;
    receiptContent += `Date: ${date}\n`;
    receiptContent += `Time: ${time}\n\n`;
    receiptContent += `Items:\n`;

    let total = 0;
    items.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      receiptContent += `\n${item.name}\n`;
      receiptContent += `${item.quantity} x ${item.price.toFixed(
        2
      )} = ${itemTotal.toFixed(2)}/\=\n`;
    });

    receiptContent += `\nTotal: ${total.toFixed(2)}/\=`;
    setReceipt(receiptContent);
    setItems([]);
    saveReceiptToAsyncStorage(receiptContent);
    router.push('/history')
  };

  async function getReceiptFromAsyncStorage(id: string) {
    await AsyncStorage.getItem(id).then((receipt) => {
      if (receipt) {
        setReceipt(receipt);
      }
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.header}>Sales Receipt Generator</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Item Name"
          nativeID="itemName"
          value={currentItem.name}
          onChangeText={(text) =>
            setCurrentItem({ ...currentItem, name: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          keyboardType="decimal-pad"
          nativeID="itemPrice"
          value={currentItem.price}
          onChangeText={(text) =>
            setCurrentItem({ ...currentItem, price: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          keyboardType="number-pad"
          nativeID="itemQuantity"
          value={currentItem.quantity}
          onChangeText={(text) =>
            setCurrentItem({ ...currentItem, quantity: text })
          }
        />
        <TouchableOpacity style={styles.button} onPress={addItem}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.itemList}>
        {items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text>
              {item.name} - {item.quantity} x {item.price}/=
            </Text>
          </View>
        ))}
      </ScrollView>

      {items.length > 0 && (
        <TouchableOpacity
          style={styles.generateButton}
          onPress={generateReceipt}
        >
          <Text style={styles.buttonText}>Generate Receipt</Text>
        </TouchableOpacity>
      )}

      {receipt && (
        <ScrollView style={styles.receiptContainer}>
          <Text style={styles.receiptText}>{receipt}</Text>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  generateButton: {
    backgroundColor: "#34C759",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  itemList: {
    maxHeight: 200,
    marginBottom: 10,
  },
  itemRow: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  receiptContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    maxHeight: 200,
  },
  receiptText: {
    fontFamily: "monospace",
  },
});
