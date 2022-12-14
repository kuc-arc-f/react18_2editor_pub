import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';
import LibSqlite from '../../lib/LibSqlite';
import { marked } from 'marked';
//
import {
//  Route,
//  Routes,
//  Link,
  useSearchParams,
} from "react-router-dom";
//type
type IPostItem = {
  id: number,
  title : string,
  content : string,
  createdAt: string,
}
//
function Page() {
  const [searchParams] = useSearchParams();
  const [postId, setPostId] = useState(0);
  const [postItem, setPostItem] = useState<IPostItem>({
    id:0, title:"", content: "", createdAt: ""
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
      SELECT id, title, content, createdAt from Page WHERE
      id = ${id};
      `;
      let item = await LibSqlite.select(db, sql);
      item = item[0];
//console.log(item);
      let content = item[2];
      if(content === null) {
        return;
      }
      let createdAt = item[3];
//console.log(createdAt);
      content = marked.parse(content);
      if(item.length > 0) {
        setPostItem({id: id, title: item[1], content: content, createdAt: createdAt});
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
        <Link to={`/pages`} >
            <button className="btn btn-outline-primary my-2">Back 
            </button>
        </Link>     
        {/*
        <h3>Page Show </h3>
        <hr />
        */}
        <div className="col-sm-8">
          {/* <label>Title:</label> */}
          <h3>{postItem.title}</h3>
          {postItem.createdAt}<br />
          ID : {postId}
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
*/