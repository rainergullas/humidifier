// SportsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth, db } from './firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';

export default function SportsScreen() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);
  const category = 'sports'; // Define the category

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchCount(user.uid);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const fetchCount = async (userId) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCount(docSnap.data()[category] || 0);
    } else {
      await setDoc(docRef, { [category]: 0 }); // Removed timestamp
      setCount(0);
    }
  };

  const updateCount = async (increment) => {
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      const newCount = count + increment;
      await updateDoc(docRef, { [category]: newCount }); // Removed timestamp
      setCount(newCount);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sports</Text>
      <Text style={styles.count}>Count: {count}</Text>
      <Button title="Increase Count" onPress={() => updateCount(1)} />
      <Button title="Decrease Count" onPress={() => updateCount(-1)} disabled={count === 0} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  count: {
    fontSize: 32,
    margin: 20,
  },
});