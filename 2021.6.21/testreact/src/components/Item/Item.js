import React from 'react'
import './Item.css'
export default function  Item (props){
    return (
      <li>
        <label>
          <input type="checkbox" checked={props.item.isDone}  onChange={()=>{

          }}/>
          <span className={props.item.isDone?"done":""}>{props.item.name}</span>
        </label>
        <button className="btn btn-danger">删除</button>
      </li>
    )
}
