
import {remark} from 'remark';
import html from 'remark-html';
export default async function mdxToHTML(markdown:any) {
    const result = await remark().use(html).process(markdown);
    return result.toString()
}