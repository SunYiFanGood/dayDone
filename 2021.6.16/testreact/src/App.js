import React from "react";
import Count from "./component/count/count";
class App extends React.Component{
  state={
    num:4,
    count: 0,
    name: "zs",
    info: "HH",
    fn:()=>{
      this.setState(
          {count: this.state.count + 1,}
      )
    }
  }
  render() {
    return <div>
      <div>我是类组件{this.state.num}</div>
      <Count count={this.state.count} name={this.state.name} info={this.state.info} fn={this.state.fn}></Count>
    </div>
  }
}

export default App;
