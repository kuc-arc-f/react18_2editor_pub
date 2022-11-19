import * as React from 'react';
import { Link } from 'react-router-dom';
import LibSqlite from '../lib/LibSqlite';
import LibPost from '../lib/LibPost';

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
      const items = await LibPost.getList(db);
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
      <h3>Post</h3>
      <hr />
      <div className="row">
        <div className="col-sm-6 text-center">
          <Link to={`/post_create`} >
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
          <Link to={`/post_show?id=${item.id}`}
            className="btn btn-sm btn-outline-primary mx-2">Show
          </Link>
          <Link to={`/post_edit?id=${item.id}`}
            className="btn btn-sm btn-outline-primary mx-2">Edit
          </Link><br />
          ID: {item.id}, category: {item.categoryName}
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
      const db = await LibSqlite.getDb();
      const sql = `
      select
      Post.id ,
      Post.title,
      Post.content,
      Post.createdAt,
      Category.name
      from Post
      LEFT OUTER JOIN Category
      ON Post.CategoryId = Category.id
      ORDER BY Post.id DESC
      ;
      `;
      const result = await LibSqlite.select(db, sql);
      if(result === null) {
        return;
      }
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
*/