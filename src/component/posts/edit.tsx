import * as React from 'react';
//import { useEffect } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  //  Route,
  //  Routes,
  //  Link,
    useSearchParams,
  } from "react-router-dom";
import LibSqlite from '../../lib/LibSqlite';
import LibCategory from '../../lib/LibCategory';
//type
type IPostItem = {
  id: number,
  title : string,
  content : string,
  CategoryId: number,
}
type TCategoryItem = {
  id: number,
  name : string,
}
//
function Page() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  //state
  const [postId, setPostId] = useState(0);
  const [postItem, setPostItem] = useState<IPostItem>({
    id:0, title:"", content:"", CategoryId: 0
  });
  const [categoryItems, setCategoryItems] = useState([]);

  useEffect(() => {
    (async() => {
      const id = Number(searchParams.get("id"));
console.log(id);
      const category = await LibCategory.getList();
      console.log(category);
      setCategoryItems(category);
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
      const category = document.querySelector<HTMLInputElement>('#category');
      const db = await LibSqlite.getDb();
      const sql = `
      SELECT id, title, content, CategoryId from Post WHERE
      id = ${id};
      `;
      let item = await LibSqlite.select(db, sql);
      item = item[0];
console.log(item);
      if(item.length > 0) {
        const categoryId = item[3];
        setPostItem({
          id: id, title: item[1], content: item[2],
          CategoryId: categoryId,
        });
        if(categoryId !== null) {
          //@ts-ignore
          category.value = categoryId;         
        }
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
      const category = document.querySelector<HTMLInputElement>('#category');
//      console.log(title?.value); 
      const db = await LibSqlite.getDb();
      const sql = `
      UPDATE Post set title = '${title?.value}' , 
      content = '${content?.value}',
      CategoryId = ${category?.value}
      WHERE id = ${postId}
      `;
      await db.exec(sql);
      navigate('/posts');
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
      DELETE FROM Post WHERE id = ${postId}
      `;
      await db.exec(sql);
      navigate('/posts');
    } catch (e) {
      console.error(e);
      alert("error, deletePost");
    }
  }   
  //
//  console.log(postItem);
  return (
    <div className="container">
      <Link to={`/posts`} >
          <button className="btn btn-outline-primary my-2">Back 
          </button>
      </Link>      
      <h3>Post Edit </h3>
      ID : {postId}
      <hr />
      <div className="col-sm-8">
        <label>Title:</label>
        <input type="text" name="title" id="title" className="form-control"
          defaultValue={postItem.title} />
      </div>
      <div className="col-md-6 form-group">
        <label>Category:</label>
        <select className="form-select" name="category" id="category">
        <option key={0} value={0}></option>
        {categoryItems.map((item: TCategoryItem ,index) => (
          <option key={index} value={item.id}>{item.name}</option>
        ))
        }
        </select>
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