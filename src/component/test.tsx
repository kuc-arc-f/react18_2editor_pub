import * as React from 'react';
//import { useEffect, useState } from 'react';
import { useEffect } from 'react';
import LibSqlite from '../lib/LibSqlite';
import LibStorage from '../lib/LibStorage';

function Page() {
  useEffect(() => {
    (async() => {
//console.log(result);
    })()    
   
  }, []);
  //
  const dbSave = async function (){
    const db = await LibSqlite.getDb();
    const sql = `
    INSERT INTO Post(title, content, CategoryId, createdAt, updatedAt)
     VALUES
    (
      't1', 
      'c1',
      'ca11',
      DATETIME('now','localtime'), 
      DATETIME('now','localtime')
    );
    `;
    await db.exec(sql);    
    await LibStorage.save(db);
  }
  //
  const dbGet = async function (){
    const db = await LibStorage.get();
    if(db === null) {
      alert("Error, db is null")
      return;
    }
    await LibSqlite.setImportDb(db);
  }  
  //
  const test = async function (){
    const db = await LibSqlite.getDb();
    let res = JSON.stringify(db.exec("SELECT sqlite_version();"));
    console.log(res);
    res = JSON.stringify(db.exec(`SELECT * FROM Post;`));
    console.log(res)
  }    
  //
  return (
    <div className="container">
      <h3>Test </h3>
      <hr />
      <p>welcome, about</p>
      <hr />
      <button onClick={() => dbSave()}>save
      </button>
      <hr />
      <button onClick={() => dbGet()}>get
      </button>
      <hr />
      <button onClick={() => test()}>test
      </button>
    </div>
  );
}
export default Page;
/*
      const buffer = new ArrayBuffer(db);

    (async() => {
      const db = await LibSqlite.getDb();
      let res = JSON.stringify(db.exec("SELECT sqlite_version();"));
      console.log(res);
      res = JSON.stringify(db.exec(`CREATE TABLE users(id INTEGER PRIMARY KEY, name TEXT);`));
      res = JSON.stringify(db.exec(`INSERT INTO users(name) VALUES ('hoge123');`));
      res = JSON.stringify(db.exec(`INSERT INTO users(name) VALUES ('fuga123');`));
      res = JSON.stringify(db.exec(`SELECT * FROM users;`));
      console.log(res)
    })()
*/