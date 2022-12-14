import * as React from 'react';
import { Link } from 'react-router-dom';
import LibSqlite from '../lib/LibSqlite';
import LibCommon from '../lib/LibCommon';

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
      SELECT id, title, content, createdAt FROM Page
      ORDER BY id DESC;
      `;
      //SELECT id, title, content, createdAt FROM Page;
      const result = await LibSqlite.select(db, sql);
      if(result === null) {
        return;
      }
      console.log(result);
      let items: any[] = [];
      result.forEach(function (item: any){
        let row = {id: 0, title: "", content: "", createdAt: ""};
//console.log(item);
        if(item.length > 0) {
          row.id = item[0];
          row.title = item[1];
          row.content = item[2];
          row.createdAt = item[3];
        }
        items.push(row);
      });
      items = LibCommon.getDatetimeArray(items);
console.log(items);
      this.setState({items: items});
    } catch (e) {
      console.error(e);
      alert("error, getList");
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
      <h3>Pages</h3>
      <hr />
      <div className="row">
        <div className="col-sm-6 text-center">
          <Link to={`/page_create`} >
              <button className="btn btn-primary">Create</button>
          </Link>       
        </div>
        <div className="col-sm-6 text-center">
        </div>
      </div>
      <hr />
      { this.state.items.map((item: any, index: number) => (
        <div key={index}>
          <h3>{item.title}</h3>
          <Link to={`/page_show?id=${item.id}`}
            className="btn btn-sm btn-outline-primary mx-2">Show
          </Link>
          <Link to={`/page_edit?id=${item.id}`}
            className="btn btn-sm btn-outline-primary mx-2">Edit
          </Link><br />
          {item.dt_str}, ID: {item.id}
          <hr />
        </div>
        )        
      )}      
    </div>
    );
  }  
}

