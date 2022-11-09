import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './component/Home';
import About from './component/about';
import Navibar from './component/Navibar';
import Test from './component/test';
import ImportData from './component/ImportData';
import Post from './component/posts';
import PostCreate from './component/posts/create';
import PostEdit from './component/posts/edit';
import PostShow from './component/posts/show';
/* pages */
import Pages from './component/pages';
import PageCreate from './component/pages/create';
import PageEdit from './component/pages/edit';
import PageShow from './component/pages/show';
/* category */
import Category from './component/category';
import CategoryCreate from './component/category/create';
import CategoryEdit from './component/category/edit';

//
function App() {
  return (
    <div className="App">
      {/*
      <h1>Hello React Router v6</h1>
      */}
      <Navibar name="Editor" />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/test' element={<Test />} />
        <Route path='/file' element={<ImportData />} />        
        <Route path='/posts' element={<Post />} />        
        <Route path='/post_create' element={<PostCreate />} />        
        <Route path='/post_edit' element={<PostEdit />} />        
        <Route path='/post_show' element={<PostShow />} />  
        {/* pages  */}
        <Route path='/pages' element={<Pages />} />
        <Route path='/page_create' element={<PageCreate />} />
        <Route path='/page_edit' element={<PageEdit />} />
        <Route path='/page_show' element={<PageShow />} />
        {/* category   */}
        <Route path='/category' element={<Category />} />
        <Route path='/category_create' element={<CategoryCreate />} />
        <Route path='/category_edit' element={<CategoryEdit />} />

      </Routes>
    </div>
  );
}

export default App;
