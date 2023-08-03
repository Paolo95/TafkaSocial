import { USERS } from './users'
export const POSTS = [
    {
        imageUrl: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?cs=srgb&dl=pexels-pixabay-56866.jpg&fm=jpg&_gl=1*mh6rmk*_ga*NDU1NzY3ODk1LjE2Njc2MTA2NTg.*_ga_8JE65Q40S6*MTY2NzYxMDY1OC4xLjEuMTY2NzYxMDk3OC4wLjAuMA',
        user: USERS[0].user,
        likes: 7870,
        caption: 'Building the Netflix clone with React JS. This is going to be a fun build. #firebase #dev',
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
        imageUrl: 'https://images.pexels.com/photos/2071150/pexels-photo-2071150.jpeg?cs=srgb&dl=pexels-matheus-henrin-2071150.jpg&fm=jpg&_gl=1*ujl074*_ga*NDU1NzY3ODk1LjE2Njc2MTA2NTg.*_ga_8JE65Q40S6*MTY2NzYxMDY1OC4xLjEuMTY2NzYxMDg2OC4wLjAuMA',
        user: USERS[1].user,
        likes: 770,
        caption: 'Train Ride to Hogwarts.',
        profile_picture: USERS[1].image,
        comments: [
            {
                user: 'theqazman',
                comment: 'ciaooo'
            }
        ]
    }    

]