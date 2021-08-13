import React, { useState } from 'react'
import Header from './components/Header/Header'
import List from './components/List/List'
import Footer from './components/Footer/Footer'
import './App.css'
export default function  App () {
    let [list,setList]=useState([{
        "name":"吃饭",
        "isDone":true,
        "id":1
    },{
        "name":"睡觉",
        "isDone":false,
        "id":2
    }])
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header list={list}></Header>
          <div>
            <List list={list}></List>
            <Footer></Footer>
          </div>
        </div>
      </div>
    )
}
