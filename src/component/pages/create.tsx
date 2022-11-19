import * as React from 'react';
//import { useEffect, useState } from 'react';
import { useEffect } from 'react';
import LibSqlite from '../../lib/LibSqlite';
import LibStorage from '../../lib/LibStorage';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
//
function Page() {
  const navigate = useNavigate();
  useEffect(() => {
    (async() => {
    })()    
  }, []);
  /**
  * save
  * @param
  *
  * @return
  */ 
  const save = async function() {
    try {   
//      console.log("post.start"); 
      const title = document.querySelector<HTMLInputElement>('#title');
      const content = document.querySelector<HTMLInputElement>('#content');
      //content
      console.log(title?.value); 
//return;
      const db = await LibSqlite.getDb();
      const sql = `
      INSERT INTO Page(title, content, createdAt, updatedAt)
       VALUES
      (
        '${title?.value}', 
        '${content?.value}',
        DATETIME('now','localtime'), 
        DATETIME('now','localtime')
      );
      `;
      await db.exec(sql);
      await LibStorage.save(db);
      navigate('/pages');
    } catch (e) {
      console.error(e);
      alert("error, add");
    }
  }  
  //
  return (
    <div className="container">
      <Link to={`/pages`} >
          <button className="btn btn-outline-primary my-2">Back 
          </button>
      </Link>       
      <h3>Page Create </h3>
      <hr />
      <div className="col-sm-6">
        <label>Title:</label>
        <input type="text" name="title" id="title" className="form-control"
           />
      </div>
      <div className="col-sm-6">
        <label>Content:</label>
        <textarea name="content" id="content" className="form-control" rows={10}
          placeholder=""></textarea>
      </div>
      <div className="col-sm-6 my-2">
        <button className="btn btn-primary" onClick={() => save()} 
        >Save</button>
      </div>
      
    </div>
  );
}
export default Page;
/*
markdown input, please*/