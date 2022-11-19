import * as React from 'react';
//import { useEffect } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
  name : string,
}
//
function Page() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [postId, setPostId] = useState(0);
  const [postItem, setPostItem] = useState<IPostItem>({id:0, name:""});

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
      SELECT id, name from Category WHERE
      id = ${id};
      `;
      let item = await LibSqlite.select(db, sql);
      item = item[0];
//console.log(item);
      if(item.length > 0) {
        setPostItem({id: id, name: item[1]});
      }
    } catch (e) {
      console.error(e);
      alert("error, getItem");
    }
  }  
  /**
  * save
  * @param
  *
  * @return
  */ 
  const savePost = async function() {
    try {   
      const name = document.querySelector<HTMLInputElement>('#name');
//      console.log(title?.value); 
      const db = await LibSqlite.getDb();
      const sql = `
      UPDATE Category set name = '${name?.value}'
      WHERE id = ${postId}
      `;
      await db.exec(sql);
      await LibStorage.save(db);
      navigate('/category');
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
      DELETE FROM Category WHERE id = ${postId}
      `;
      await db.exec(sql);
      await LibStorage.save(db);
      navigate('/category');
    } catch (e) {
      console.error(e);
      alert("error, delete");
    }
  }   
  //
//  console.log(postItem);
  return (
    <div className="container">
      <Link to={`/category`} >
          <button className="btn btn-outline-primary my-2">Back 
          </button>
      </Link>      
      <h3>Category Edit </h3>
      ID : {postId}
      <hr />
      <div className="col-sm-8">
        <label>Name:</label>
        <input type="text" name="name" id="name" className="form-control"
          defaultValue={postItem.name} />
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