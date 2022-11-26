import * as React from 'react';
import { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import LibSqlite from '../../lib/LibSqlite';
import { Link } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";
import { marked } from 'marked';
//type
type IPostItem = {
  id: number,
  title : string,
  content : string,
  category : string,
  createdAt: string,
}
//
function Page() {
  const [searchParams] = useSearchParams();
  const [postId, setPostId] = useState(0);
  const [postItem, setPostItem] = useState<IPostItem>({
    id:0, title:"", content:"", category:"", createdAt: ""
  });

  useEffect(() => {
    (async() => {
      const id = Number(searchParams.get("id"));
console.log(id);
      //@ts-ignore
      setPostId(id);
      getItem(id);
    })()    
  }, []);
  /**
  * getItem
  * @param
  *
  * @return
  */   
   const getItem = async function(id: number) {
    try {   
      const db = await LibSqlite.getDb();
      const sql = `
      select
      Post.id ,
      Post.title,
      Post.content,
      Post.createdAt,
      Category.name
      from Post
      LEFT OUTER JOIN Category
      ON Post.CategoryId = Category.id
      WHERE 
      Post.id = ${id};
      `;
      let item = await LibSqlite.select(db, sql);
      item = item[0];
console.log(item);
      let content = item[2];
      if(content === null) {
        return;
      }
      content = marked.parse(content);
      let category = item[4];
      let createdAt = item[3];
console.log(createdAt);
      if(item.length > 0) {
        setPostItem({
          id: id, title: item[1], content: content, category: category, createdAt: createdAt
        });
      }
    } catch (e) {
      console.error(e);
      alert("error, getItem");
    }
  }  
  //
//  console.log(postItem);
  return (
    <>
    <div className="container">
      <Link to={`/posts`} >
          <button className="btn btn-outline-primary my-2">Back 
          </button>
      </Link>      
      {/*
      <h3>Post Show </h3>
      <hr />
      */}
      <div className="col-sm-8">
        <h3>{postItem.title}</h3>
        {postItem.createdAt}<br />
        ID : {postId}<br />
        Category: {postItem.category}
      </div>
      <hr />
      <div className="col-sm-12">
        <div id="post_item" dangerouslySetInnerHTML={{__html: `${postItem.content}`}}>
        </div>        
      </div>
    </div>
    <style>{`
      div#post_item img{
        max-width : 100%;
        height : auto;
      }
      #post_item pre{
        background-color: #EEE;
        padding: 0.5rem;
      }      
    `}</style>     
    </>
  );
}
export default Page;
/*
<pre>{postItem.content}</pre>
SELECT id, title, content from Post WHERE
id = ${id};
*/