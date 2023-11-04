import client from './client';

const getPosts = async (request: string, setPosts?: any) => {
  const data = await client.fetch<any>(`*[_type == ${request}]`);
  data.map((item: any) => {
    const arr = [];
    console.log(item);
    console.log(item.title);
    arr.push(item);
    setPosts(arr);
    return console.log(item?.body[0]?.children[0].text);
  });
};
export default getPosts;
