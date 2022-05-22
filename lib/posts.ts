import fs from 'fs';
import {join} from 'path'
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const postsDirectory = join(process.cwd(),'_posts');

export function getSlugs(){
    return fs.readdirSync(postsDirectory);
}
export async function getPostsBySlug(slug:string | any,fields:Array<string>) {
    const realSlug = slug.replace(/\.mdx$/,'')
    const fullPath = join(postsDirectory,`${realSlug}.mdx`)
    const fileContent = fs.readFileSync(fullPath,'utf8')
    const {data,content} = matter(fileContent);
    const items = {} as any;
    const mdxSource = await serialize(content);

    fields.forEach((field)=>{
        if(field === 'slug'){
            items[field] = realSlug;
        }
        if (field === 'content') {
            items['compiledSource'] = mdxSource.compiledSource;
        }
        if(typeof data[field] !== 'undefined'){
            items[field] = data[field]
        }
    })
    return items;
}
export async function  getAllPosts(fields:Array<string>){
    const slugs = getSlugs();
     slugs.map((slug)=>getPostsBySlug(slug,fields))
     const posts = Promise.all(slugs.map((slug)=>{
            return new Promise( async (resolve,reject)=>{
                const post = await getPostsBySlug(slug,fields);
                resolve(post);
            })
     })).then((values)=>{
         return values.sort((p1:any,p2:any)=>(p1.date > p2.date ? -1 : 1));
     });
    
    return posts;
}
