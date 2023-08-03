import { USERS } from './users'
export const POSTS = [
    {
        imageUrl: 'https://i.bb.co/182bP1y/4k.png',
        user: USERS[0].user,
        likes: 7870,
        caption: 'Train Ride to Hogwarts.',
        profile_picture: USERS[0].image,
        comments: [
            {
                user: 'theqazman',
                comment: 'ciaooo'
            },
            {
                user: 'paolo',
                comment: 'sucksss'
            }
        ]
    },
    {
        imageUrl: 'https://i.bb.co/182bP1y/4k.png',
        user: USERS[1].user,
        likes: 7870,
        caption: 'Train Ride to Hogwarts.',
        profile_picture: USERS[1].image,
        comments: [
            {
                user: 'theqazman',
                comment: 'ciaooo'
            },
            {
                user: 'paolo',
                comment: 'sucksss'
            }
        ]
    }    

]