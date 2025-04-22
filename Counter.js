// Counter.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth, db } from './firebase';
import { doc, getDoc, updateDoc, setDoc, Timestamp } from 'firebase/firestore';

export default function Counter({ userId }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (userId) {
      fetchCount(userId);
    }
  }, [userId]);

  const fetchCount = async (userId) => {
    const docRef = doc(db, 'counts', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCount(docSnap.data().count);
    } else {
      await setDoc(docRef, { 
        count: 0, 
        createdAt: Timestamp.now() 
      });
      setCount(0);
    }
  };

  const increaseCount = async () => {
    if (userId) {
      const docRef = doc(db, 'counts', userId);
      const newCount = count + 1;
      await updateDoc(docRef, { 
        count: newCount, 
        updatedAt: Timestamp.now() 
      });
      setCount(newCount);
    }
  };

  const decreaseCount = async () => {
    if (userId && count > 0) {
      const docRef = doc(db, 'counts', userId);
      const newCount = count - 1;
      await updateDoc(docRef, { 
        count: newCount, 
        updatedAt: Timestamp.now() 
      });
      setCount(newCount);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.count}>Count: {count}</Text>
      <Button title="Increase Count" onPress={increaseCount} />
      <Button title="Decrease Count" onPress={decreaseCount} disabled={count === 0} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  count: {
    fontSize: 32,
    margin: 20,
  },
});