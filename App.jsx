import { StatusBar } from 'expo-status-bar';
import { signInWithPopup } from 'firebase/auth';
import { Button, StyleSheet, Text, View } from 'react-native';
import { auth, provider } from './lib/firebase';
import { db } from './lib/firebase';
import React, { useEffect, useState } from 'react';
import {collection, getDocs, onSnapshot} from "firebase/firestore"

export default function App() {
  return (
    <View style={styles.container}>
      <Posts />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const Posts= () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postData = collection(db, "posts");

     // 初回データ取得
     getDocs(postData)
     .then((snapshot) => {
       if (snapshot && snapshot.docs) { // snapshotがnullでないか確認
         const initialPosts = snapshot.docs.map((doc) => {
           if (doc.exists()) {
             const data = doc.data();
             // titleプロパティが存在するか確認
             if ('title' in data) {
               return { ...data };
             } else {
               console.warn(`Document does not have a title property.`);
             }
           }
           return null; //デフォルト値
         }).filter(Boolean); // nullを除去
         setPosts(initialPosts);
       } else {
         console.error("Snapshot is null or has no docs");
       }
     })
     .catch((error) => {
       console.error("Error getting documents: ", error);
     });

   // リアルタイムリスナーの設定
   onSnapshot(postData, (snapshot) => {
     if (snapshot && snapshot.docs) { // snapshotがnullでないか確認
       const updatedPosts = snapshot.docs.map((doc) => {
         if (doc.exists()) {
           const data = doc.data();
           // titleプロパティが存在するか確認
           if ('title' in data) {
             return { ...data };
           } else {
             console.warn(`Document does not have a title property.`);
           }
         }
         return null; 
       }).filter(Boolean); 
       setPosts(updatedPosts);
     } else {
       console.error("Snapshot is null or has no docs");
     }
   });

  }, [ ])

  return (
    <View>
      {posts && posts.map((post) => (
        <View key={post.title} style={{marginTop:20,}}>
          <Text
          style={{
            fontSize: 20,

          }}
          >
          {post.title}
        </Text>
        <Text>
          {post.content}


        </Text>
        </View>
      ))}
    </View>
  );
}