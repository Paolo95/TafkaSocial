import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Divider } from 'react-native-elements'
import { getAuth } from "firebase/auth";
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebase';

const postFooterIcons = [
    {
        name: 'Like',
        imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png',
        likedImageUrl: 'https://img.icons8.com/color/48/hearts.png'
    },
    {
        name: 'Comment',
        imageUrl: 'https://img.icons8.com/material-outlined/60/ffffff/speech-bubble--v1.png'
    },
    {
        name: 'Share',
        imageUrl: 'https://img.icons8.com/ios/60/ffffff/sent--v1.png'
    },
    {
        name: 'Save',
        imageUrl: 'https://img.icons8.com/material-outlined/60/ffffff/bookmark-ribbon--v1.png'
    }
]

const Post = ({ post }) => {
    
    const auth = getAuth();
    const user = auth.currentUser;

    const handleLike = async post => {
        
        const currentLikeStatus = !post.likes_by_users.includes(
            user.email
        )
        
        const postRef = doc(FIREBASE_DB, 'users', post.owner_email, 'posts', post.id);

        await updateDoc(postRef, {
            likes_by_users: currentLikeStatus
              ? arrayUnion(user.email)
              : arrayRemove(user.email),
        })
        
    }

  return (
    <View style={{ marginBottom: 30 }}>
        <Divider width={1} orientation='vertical' />
        <PostHeader post={post} />
        <PostImage post={post} />
        <View style={{ marginHorizontal: 15, marginTop: 10 }}>
            <PostFooter post={post} handleLike={handleLike}/>
            <Likes post={post} />
            <Caption post={post} />
            <CommentsSection post={post} />
            <Comments post={post} />
        </View>        
    </View>
  )
}

const PostHeader = ({ post }) => (
    <View 
        style={{
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            margin: 5,
            alignItems: 'center',
        }}
    >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: post.profile_picture }} style={styles.story}/>
            <Text style={{ color: 'white', marginLeft: 5, fontWeight: '700' }}>
                {post.user}
            </Text>
        </View>

        <Text style={{ color: 'white', fontWeight: '900' }}>...</Text>
        
    </View>
)

const PostImage = ({ post }) => (
    <View 
        style={{
            width: '100%',
            height: 450,        
        }}
    >
        <Image 
            source={{ uri: post.imageUrl }} 
            style={{ height: '100%', resizeMode: 'cover' }}
        />
    </View>
)

const PostFooter = ({ handleLike, post}) => (
    <View style={{ flexDirection: 'row' }}>
        <View style={ styles.leftFooterIconsContainer}>
            <TouchableOpacity onPress={() => handleLike(post)}>
                <Image 
                    style={styles.footerIcon} 
                    source={{ 
                        uri: post.likes_by_users.includes(
                            getAuth().currentUser.email
                        ) 
                        ? postFooterIcons[0].likedImageUrl
                        : postFooterIcons[0].imageUrl,
                    }}
                />
            </TouchableOpacity>
            
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl}/>
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[2].imageUrl}/>
        </View> 

        <View style={{ flex: 1, alignItems: 'flex-end'}}>
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl}></Icon>
        </View>      
    </View>
  
)

const Icon = ({imgStyle, imgUrl}) => (
    <TouchableOpacity>
        <Image style={imgStyle} source={{ uri: imgUrl }} />
    </TouchableOpacity>
)

const Likes = ({ post }) => (
    <View style={{ flexDirection: 'row', marginTop: 4 }}>
        <Text style={{ color: 'white', fontWeight: '600' }}>
            {post.likes_by_users.length.toLocaleString('en')} likes
        </Text>
    </View>
)

const Caption = ({ post }) => (
    <View style={{ marginTop: 5 }}>
        <Text style={{ color: 'white' }}>
            <Text style={{ fontWeight: '600' }}>{post.user}</Text>
            <Text> {post.caption}</Text>
        </Text>
    </View>
    
)

const CommentsSection = ({ post }) => (
    <View style={{ marginTop: 5 }}>
        {!!post.comments.length && (
            <Text style={{ color: 'gray' }}>
                View {post.comments.length > 1 ? 'all' : ''} {post.comments.length}{' '} 
                {post.comments.length > 1 ? 'comments' : 'comment'}
            </Text>
        )}
    </View>    
) 

const Comments = ({ post }) => (
    <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: 'row', marginTop: 2 }}>
        <Text style={{color: 'white'}}>
            <Text style={{ fontWeight: '600' }}>{comment.user}</Text>
            {' '}{comment.comment}
        </Text>
      </View>  
    ))}
    </>
)


const styles = StyleSheet.create({
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 1.6,
        borderColor: '#ff8501',
    },
    footerIcon: {
        width: 33,
        height: 33,
    },
    leftFooterIconsContainer: {
        flexDirection: 'row',
        width: '32%',
        justifyContent: 'space-between',
    }
});


export default Post