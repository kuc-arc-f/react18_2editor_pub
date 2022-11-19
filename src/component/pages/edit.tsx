import * as React from 'react';
//import { useEffect } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LibSqlite from '../../lib/LibSqlite';
import LibStorage from '../../lib/LibStorage';
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
}
//
function Page() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [postId, setPostId] = useState(0);
  const [postItem, setPostItem] = useState<IPostItem>({id:0, title:"", content:""});

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
      SELECT id, title, content from Page WHERE
      id = ${id};
      `;
      let item = await LibSqlite.select(db, sql);
      item = item[0];
//console.log(item);
      if(item.length > 0) {
        setPostItem({id: id, title: item[1], content: item[2]});
      }
    } catch (e) {
      console.error(e);
      alert("error, getItem");
    }
  }  
  /**
  * addPost
  * @param
  *
  * @return
  */ 
  const savePost = async function() {
    try {   
      const title = document.querySelector<HTMLInputElement>('#title');
      const content = document.querySelector<HTMLInputElement>('#content');
//      console.log(title?.value); 
      const db = await LibSqlite.getDb();
      const sql = `
      UPDATE Page set title = '${title?.value}' , 
      content = '${content?.value}'
      WHERE id = ${postId}
      `;
      await db.exec(sql);
      await LibStorage.save(db);
      navigate('/pages');
    } catch (e) {
      console.error(e);
      alert("error, add");
    }
  }  
  /**
  * deletePost
  * @param
  *
  * @return
  */
   const deletePost = async function() {
    try {   
      const db = await LibSqlite.getDb();
      const sql = `
      DELETE FROM Page WHERE id = ${postId}
      `;
      await db.exec(sql);
      await LibStorage.save(db);
      navigate('/pages');
    } catch (e) {
      console.error(e);
      alert("error, delete");
    }
  }   
  //
//  console.log(postItem);
  return (
    <div className="container">
      <Link to={`/pages`} >
          <button className="btn btn-outline-primary my-2">Back 
          </button>
      </Link>        
      <h3>Page Edit </h3>
      ID : {postId}
      <hr />
      <div className="col-sm-8">
        <label>Title:</label>
        <input type="text" name="title" id="title" className="form-control"
          defaultValue={postItem.title} />
      </div>
      <div className="col-sm-12">
        <label>Content:</label>
        <textarea name="content" id="content" className="form-control" rows={10}
          placeholder="" defaultValue={postItem.content}></textarea>
      </div>
      <div className="col-sm-18 my-2">
        <button className="btn btn-primary" onClick={() => savePost()} 
        >Save</button>
        <button className="btn btn-danger mx-2" onClick={() => deletePost()} 
        >Delete</button>
      </div>
      
    </div>
  );
}
export default Page;