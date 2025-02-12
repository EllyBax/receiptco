import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

const ReceiptView = ({ receipt }: { receipt: string }) => {
  // Parse the receipt content into sections
  const formatReceiptContent = (text: string) => {
    if (!text) return [];
    
    const lines = text.split('\\n');
    console.log(lines);
    
    return lines.map((line, index) => {
      if (line.startsWith('#')) {
        // Title
        return (
          <Text key={index} style={styles.title}>
            {line.replace('#', '').trim()}
          </Text>
        );
      }
      else if  (line.startsWith('{')) {
        // Title
        return (
          <Text key={index} style={styles.title}>
            {line.replace('{"receipt":"', '').trim()}
          </Text>
        );
      }
      else if (line.startsWith('Date:') || line.startsWith('Time:')) {
        // Date and Time
        return (
          <Text key={index} style={styles.dateTime}>
            {line}
          </Text>
        );
      } else if (line.startsWith('Items:')) {
        // Items header
        return (
          <Text key={index} style={styles.sectionHeader}>
            {line}
          </Text>
        );
      } else if (line.includes('x') && line.includes('=')) {
        // Item price line
        return (
          <Text key={index} style={styles.itemPrice}>
            {line}
          </Text>
        );
      } else if (line.startsWith('Total:')) {
        // Total amount
        return (
          <Text key={index} style={styles.total}>
            {line.replace('"}', '').trim()}
          </Text>
        );
      } else if (line.trim()) {
        // Item name or other content
        return (
          <Text key={index} style={styles.itemName}>
            {line}
          </Text>
        );
      } else {
        // Empty line for spacing
        return <View key={index} style={styles.spacer} />;
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.receiptContent}>
        {formatReceiptContent(receipt)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.27)',
    margin: 20,
  },
  receiptContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  dateTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
  },
  itemPrice: {
    fontSize: 14,
    color: '#444',
    fontFamily: 'monospace',
    marginBottom: 8,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  spacer: {
    height: 8,
  },
});

export default ReceiptView;