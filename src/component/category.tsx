import * as React from 'react';
import { Link } from 'react-router-dom';
import LibSqlite from '../lib/LibSqlite';
import LibStorage from '../lib/LibStorage';
//
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
      const result = await LibSqlite.select(db, "SELECT id, name FROM Category;");
      if(result === null) {
        return;
      }
      console.log(result);
      const items: any[] = [];
      result.forEach(function (item: any){
//        let row = {id: 0, title: "", content: ""};
        let row = {id: 0, name: ""};
        console.log(item);
        if(item.length > 0) {
          row.id = item[0];
          row.name = item[1];
//          row.content = item[2];
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
  * render
  * @param
  *
  */
  render() {
console.log(this.state.items);
    return (
    <div className="container py-4">
      <h3>Category</h3>
      <hr />
      <div className="row">
        <div className="col-sm-6 text-center">
          <Link to={`/category_create`} >
              <button className="btn btn-primary">Create</button>
          </Link>       
        </div>
        <div className="col-sm-6 text-center">
        </div>
      </div>
      <hr />
      { this.state.items.map((item: any, index: number) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <Link to={`/category_edit?id=${item.id}`}
            className="btn btn-sm btn-outline-primary mx-2">Edit
          </Link>
          <hr />
        </div>
        )        
      )}
      
    </div>
    );
  }  
}
//
/*
to={`/post_edit/${item.id}`}*
*/