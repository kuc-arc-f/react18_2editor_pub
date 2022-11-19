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
      const name = document.querySelector<HTMLInputElement>('#name');
      console.log(name?.value); 
//return;
      const db = await LibSqlite.getDb();
      const sql = `
      INSERT INTO Category(name, createdAt, updatedAt)
       VALUES
      (
        '${name?.value}', 
        DATETIME('now','localtime'), 
        DATETIME('now','localtime')
      );
      `;
      await db.exec(sql);
      await LibStorage.save(db);
      navigate('/category');
    } catch (e) {
      console.error(e);
      alert("error, add");
    }
  }  
  //
  return (
    <div className="container">
      <Link to={`/category`} >
          <button className="btn btn-outline-primary my-2">Back 
          </button>
      </Link>      
      <h3>Category Create </h3>
      <hr />
      <div className="col-sm-6">
        <label>Name:</label>
        <input type="text" name="name" id="name" className="form-control"
           />
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