import { SafeAreaView, StyleSheet, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/home/Header';
import Stories from '../components/home/Stories';
import Post from '../components/home/Post';
import { POSTS } from '../data/posts';
import BottomTabs, { bottomTabIcons } from '../components/home/BottomTabs';
import { FIREBASE_DB } from '../firebase'
import { collectionGroup, onSnapshot } from 'firebase/firestore'

const HomeScreen = ({ navigation }) => {
  
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const postsCollection = collectionGroup(FIREBASE_DB, 'posts');

    onSnapshot(postsCollection, (querySnapshot) => {
      setPosts(querySnapshot.docs.map((doc) => doc.data()));
    });
         
}, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation}/>
      <Stories />
      <ScrollView>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}        
      </ScrollView>
      <BottomTabs icons={ bottomTabIcons }/>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    marginTop: 40,
  },
});

export default HomeScreen