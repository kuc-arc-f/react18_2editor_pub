import * as React from 'react';
//import { Link } from 'react-router-dom';
import LibSqlite from '../lib/LibSqlite';
import LibConfig from '../lib/LibConfig';
import LibStorage from '../lib/LibStorage';
//
interface IProps {
//  history:string[],
}
interface IState {
  items: any[],
}
//
export default class Page extends React.Component<IProps, IState> {  
  /**
  * constructor
  * @param
  *
  * @return
  */    
  constructor(props: IProps) {
    super(props);
    this.state = {
      items: []
    };
  }
  /**
  * componentDidMount
  * @param
  *
  * @return
  */    
  async componentDidMount() {
    try {   
      console.log("post.start"); 
      this.importData();
    } catch (e) {
      console.error(e);
    } 
  }
  /**
  * importData
  * @param
  *
  * @return
  */ 
   async importData() {
    try {   
      const dbFileElm = document.querySelector<HTMLInputElement>('#file1');
      if(dbFileElm === null) {
        return;
      }      
      //@ts-ignore
      dbFileElm.onchange = () => {
        //@ts-ignore
        const f = dbFileElm.files[0];
        const r = new FileReader();
        r.onload = async function() {
          //@ts-ignore
          const Uints = new Uint8Array(r.result);
          const SQL = await LibSqlite.getSql();
          const db = new SQL.Database(Uints);
//          LibSqlite.setImportDb(db);
          await LibSqlite.setImportDb(db);
          await LibStorage.save(db);
          let res = JSON.stringify(db.exec("SELECT sqlite_version();"));
console.log(res);
          alert("Success, db import");
        }
        r.readAsArrayBuffer(f);
      }
    } catch (e) {
      console.error(e);
      alert("error, importData");
    }
  }
  /**
  * export
  * @param
  *
  * @return
  */ 
   async export() {
    try {   
      const db = await LibSqlite.getDb();
      const uint8Array = db.export();
//console.log(uint8Array);
      const blob = new Blob([uint8Array], {type: 'application/octet-binary'});
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cms.sqlite`;
      a.click();
      a.remove()      
    } catch (e) {
      console.error(e);
      alert("error, export");
    }
  }
  /**
  * remove, localStorage
  * @param
  *
  */
  async remove() {
    try {   
      //update, DB
      await LibSqlite.setImportDb(null);
      const key = LibConfig.STORAGE_KEY_DB;
      localStorage.removeItem(key);
      alert("Complete , remove");
    } catch (e) {
      console.error(e);
      alert("error, remove");
    }
  }
  /**
  * render
  * @param
  *
  */
  render() {
console.log(this.state.items);
    return (
    <div className="container py-4">
      <h3>Import, DB File</h3>
      <hr />
        <div><input type="file" id="file1" className="btn btn-outline-primary" />
        </div>
      <hr />
      <h3>Export, DB File</h3>
      <div className="col-sm-6 text-center">
        <button className="btn btn-outline-primary" onClick={() => this.export()}
        >Export</button>
      </div>
      <hr />
      <h3>Delete, Local Storage</h3>
      <div className="col-sm-6 text-center">
        <button className="btn btn-outline-primary" onClick={() => this.remove()}
        >Remove DB</button>
      </div>
      <hr />
    </div>
    );
  }  
}

/*
to={`/post_edit/${item.id}`}*/