import React, { Component } from 'react'
import './Header.css'
export default class Header extends Component {
  render() {
    let {addTodo}=this.props;
    return (
      <div className="todo-header">
        <input type="text" onKeyDown={addTodo} placeholder="请输入任务名，按回车键添加！"/>
      </div>
    )
  }
}
