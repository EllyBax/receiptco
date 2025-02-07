import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { Link, useFocusEffect } from "expo-router";

async function deleteSales(){
  await AsyncStorage.clear();
}

export default function History() {
  const [salesData, setSalesData] = React.useState([]);

useFocusEffect(
  React.useCallback(() => {
    async function fetchSales() {
      const keys = await AsyncStorage.getAllKeys();
      const sales = await AsyncStorage.multiGet(keys);
      setSalesData(sales);
    }
    
    fetchSales();
  }, [])
);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <View style={styles.sales}>
        {salesData.map((sale) => (
          <Link 
          style={styles.sale} 
          key={sale[0]} 
          href={`/receipt/${sale[0]}`}>
            <Text style={styles.saleText}>
              Total {sale[1].split("Total")[1].replace("\"}", "")}
            </Text>
          </Link>
          // <ScrollView style={styles.receiptContainer}>
          //   <Text style={styles.receiptText}>
          //     {sale[1].replace(/\\n/g, "\n")}
          //   </Text>
          // </ScrollView>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    paddingVertical: 8,
  },
  sales: {
    marginTop: 20,
    padding: 10,
  },
  sale: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  saleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
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
