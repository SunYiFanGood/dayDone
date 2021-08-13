import React from 'react'
import Item from '../Item/Item'
import './List.css'

export default function List(props) {
    let list = props.list;
    console.log(list)
    return (
        <ul className="todo-main">
            {
              list.map((item)=>{
                  return <Item item={item} key={item.id}></Item>
              })
            }
        </ul>
    )
}
