import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from './firebase'; // Firebase auth import
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

export default function HomeScreen() {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Select categories</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.categoryButton, styles.formal]} onPress={() => navigation.navigate('Formal')}>
          <Text style={styles.buttonText}>Formal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.categoryButton, styles.casual]} onPress={() => navigation.navigate('Casual')}>
          <Text style={styles.buttonText}>Casual</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.categoryButton, styles.eveningWear]} onPress={() => navigation.navigate('EveningWear')}>
          <Text style={styles.buttonText}>Evening Wear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.categoryButton, styles.sports]} onPress={() => navigation.navigate('Sports')}>
          <Text style={styles.buttonText}>Sports</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // Add space above the buttons
  },
  categoryButton: {
    width: 150,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  formal: {
    backgroundColor: '#007BFF',
  },
  casual: {
    backgroundColor: '#FFD700',
  },
  eveningWear: {
    backgroundColor: '#FF6347',
  },
  sports: {
    backgroundColor: '#32CD32',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});