import React, { Component } from 'react'
import './Item.css'
export default class Item extends Component {
  render() {
      let {item}=this.props;
      let {changeDone}=this.props;
      let {delOne}=this.props;
    return (
      <li>
        <label>
          <input type="checkbox" checked={item.isDone} data-id={item.id} onChange={changeDone}/>
          <span className={item.isDone?"done":""}>{item.todoName}</span>
        </label>
        <button data-id={item.id} className="btn btn-danger" onClick={delOne}>删除</button>
      </li>
    )
  }
}
