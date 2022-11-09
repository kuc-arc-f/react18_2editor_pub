import * as React from 'react';
import { useEffect, useState } from 'react';
//import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LibSqlite from '../../lib/LibSqlite';
import LibCategory from '../../lib/LibCategory';
//type
type TCategoryItem = {
  id: number,
  name : string,
}
//
function Page() {
  const navigate = useNavigate();
  //state
  const [categoryItems, setCategoryItems] = useState([]);
  /**
  * 起動処理
  * @param
  *
  * @return
  */
  useEffect(() => {
    (async() => {
      const category = await LibCategory.getList();
      console.log(category);
      setCategoryItems(category);
    })()    
  }, []);
  /**
  * addPost
  * @param
  *
  * @return
  */ 
  const addPost = async function() {
    try {   
//      console.log("post.start"); 
      const title = document.querySelector<HTMLInputElement>('#title');
      const content = document.querySelector<HTMLInputElement>('#content');
      const category = document.querySelector<HTMLInputElement>('#category');
      //content
      console.log(title?.value); 
//return;
      const db = await LibSqlite.getDb();
      const sql = `
      INSERT INTO Post(title, content, CategoryId, createdAt, updatedAt)
       VALUES
      (
        '${title?.value}', 
        '${content?.value}',
        '${category?.value}',
        DATETIME('now','localtime'), 
        DATETIME('now','localtime')
      );
      `;
      await db.exec(sql);
      navigate('/posts');
    } catch (e) {
      console.error(e);
      alert("error, add");
    }
  }  
  //
  return (
    <div className="container">
      <Link to={`/posts`} >
          <button className="btn btn-outline-primary my-2">Back 
          </button>
      </Link>      
      <h3>Post Create </h3>
      <hr />
      <div className="col-sm-6">
        <label>Title:</label>
        <input type="text" name="title" id="title" className="form-control"
           />
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
      <div className="col-sm-6">
        <label>Content:</label>
        <textarea name="content" id="content" className="form-control" rows={10}
          placeholder=""></textarea>
      </div>
      <div className="col-sm-6 my-2">
        <button className="btn btn-primary" onClick={() => addPost()} 
        >Save</button>
      </div>
      
    </div>
  );
}
export default Page;
/*
markdown input, please*/