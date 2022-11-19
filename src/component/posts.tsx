import * as React from 'react';
import { Link } from 'react-router-dom';
import LibSqlite from '../lib/LibSqlite';

interface IProps {
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
      this.getList();
    } catch (e) {
      console.error(e);
    } 
  }
  /**
  * getList
  * @param
  *
  * @return
  */     
  async getList() {
    try {   
      const db = await LibSqlite.getDb();
      const sql = `
      SELECT id, title, content, CategoryId
      FROM Post;
      `;
      const result = await LibSqlite.select(db, sql);
      if(result === null) {
        return;
      }
      console.log(result);
      const items: any[] = [];
      result.forEach(function (item: any){
        let row = {id: 0, title: "", content: ""};
console.log(item);
        if(item.length > 0) {
          row.id = item[0];
          row.title = item[1];
          row.content = item[2];
        }
        items.push(row);
      });
      console.log(items);
      this.setState({items: items});
    } catch (e) {
      console.error(e);
      alert("error, getList");
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
  * render
  * @param
  *
  */
  render() {
console.log(this.state.items);
    return (
    <div className="container py-4">
      <h3>Post</h3>
      <hr />
      <div className="row">
        <div className="col-sm-6 text-center">
          <Link to={`/post_create`} >
              <button className="btn btn-primary">Create</button>
          </Link>       
        </div>
        <div className="col-sm-6 text-center">
          {/*
          <button className="btn btn-outline-primary" onClick={() => this.export()}
          >Export</button>
          */}
        </div>
      </div>
      <hr />
      { this.state.items.map((item: any, index: number) => (
        <div key={index}>
          <h3>{item.title}</h3>
          <Link to={`/post_show?id=${item.id}`}
            className="btn btn-sm btn-outline-primary mx-2">Show
          </Link>
          <Link to={`/post_edit?id=${item.id}`}
            className="btn btn-sm btn-outline-primary mx-2">Edit
          </Link><br />
          ID: {item.id}
          <hr />
        </div>
        )        
      )}
      <hr />
      
    </div>
    );
  }  
}

/*
to={`/post_edit/${item.id}`}
  async addPost() {
    try {   
      const db = await LibSqlite.getDb();
      const sql = `
      INSERT INTO Post(title, createdAt, updatedAt)
       VALUES
      (
        'title123', 
        DATETIME('now','localtime'), 
        DATETIME('now','localtime')
      );
      `;
      db.exec(sql);
      this.getList();
    } catch (e) {
      console.error(e);
      alert("error, add");
    }
  }
*/