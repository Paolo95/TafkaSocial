import { View, TextInput, Image, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Divider } from 'react-native-elements'
import validUrl from 'valid-url'
import { getAuth } from "firebase/auth";
import { FIREBASE_DB } from '../../firebase'
import { collection, 
         onSnapshot,
         where, 
         limit, 
         query, 
         doc, 
         serverTimestamp, 
         addDoc } from 'firebase/firestore'

const PLACEHOLDER_IMG = 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required('A URL is required'),
    caption: Yup.string().max(2200, 'Caption has reached the character limit.')
})

const FormikPostUploader = ({ navigation }) => {
  
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

    const getUsername = () => {

        const auth = getAuth();
        const user = auth.currentUser;

        const q = query(
            collection(FIREBASE_DB, 'users'),
            where('owner_uid', '==', user.uid),
            limit(1)
        );
      
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.forEach((doc) => {
                setCurrentLoggedInUser({
                    username: doc.data().username,
                    profilePicture: doc.data().profile_picture,
                });
            });
        });

        return unsubscribe;
        
    }

    useEffect(() => {

        getUsername();
        
    },[])

    const uploadPostToFirebase = async (imageUrl, caption) => {

        const auth = getAuth();
        const user = auth.currentUser;

        const userRef = doc(FIREBASE_DB, 'users', user.email);
        const postsCollectionRef = collection(userRef, 'posts');

        await addDoc(postsCollectionRef, {
            imageUrl: imageUrl,
            user: currentLoggedInUser.username,
            profile_picture: currentLoggedInUser.profilePicture,
            owner_uid: user.uid,
            owner_email: user.email,
            caption: caption,
            createAt: serverTimestamp(),
            likes_by_users: [],
            comments: [],
        }).then(() => navigation.goBack());
            
         
        
    }

    return (
        <Formik
            initialValues={{caption: '', imageUrl: ''}}
            onSubmit={ values => {
                uploadPostToFirebase(values.imageUrl, values.caption)
            }}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
            >
        {({ handleBlur, handleChange, handleSubmit, values, errors, isValid}) => 
            <>
                <View style={{ 
                    margin: 20, 
                    justifyContent: 'space-between', 
                    flexDirection: 'row'
                    }}
                >

                    <Image 
                        source={{ uri: validUrl.isUri(thumbnailUrl) 
                            ? thumbnailUrl 
                            : PLACEHOLDER_IMG,
                        }} 
                        style={{ width: 100, height: 100}}/>     

                    <View style={{ flex: 1, marginLeft: 12 }}>                    
                        <TextInput 
                            style={{ color: 'white', fontSize: 20 }}
                            placeholder='Write a caption' 
                            placeholderTextColor='grey'
                            multiline={true}
                            onChangeText={handleChange('caption')}
                            onBlur={handleBlur('caption')}
                            value={values.caption}
                        />
                    </View>
                </View>

                <Divider width={0.2} orientation= 'vertical' />

                <TextInput 
                    style={{ color: 'white', fontSize: 18 }}
                    placeholder='Enter image URL' 
                    placeholderTextColor='grey'
                    onChangeText={handleChange('imageUrl')}
                    onBlur={handleBlur('imageUrl')}
                    value={values.imageUrl}
                    onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                />
                {errors.imageUrl && (
                    <Text style={{ fontSize: 10, color: 'red' }}>
                        {errors.imageUrl}
                    </Text>
                )}

                <Button onPress={handleSubmit} title='Share' disabled={!isValid}></Button>
            </>
        }

        </Formik>
  )
}

export default FormikPostUploader