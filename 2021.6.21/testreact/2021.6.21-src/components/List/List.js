import React, { Component } from 'react'
import Item from '../Item/Item'
import './List.css'
export default class List extends Component {
  render() {
      let {list}=this.props;
      let {changeDone}=this.props;
      let {delOne}=this.props;
    return (
      <ul className="todo-main">

          {list.map((item)=>{
              return <Item item={item} key={item.id} changeDone={changeDone} delOne={delOne}></Item>
          })}
      </ul>
    )
  }
}
