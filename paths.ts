export const nav = [
    {
        name: 'John Cajigas',
        url: '/',
    }, {
        name: 'Projects',
        url: '/projects',
    },
    {
        name: 'Bookmarks',
        url: '/bookmarks',
    },
    {
        name: 'Posts',
        url: '/posts',
    },
    {
        name: 'Account',
        url: '/account',
    },
    
];
export default {
    home:'/',
    projects:'/products',
    post:({id}:{id: string})=> {
        return {
           href:'/post/[id]',
           as:`/posts/${id}`
        }
    }
}