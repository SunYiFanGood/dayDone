import React, {Component} from 'react'
import Header from './components/Header/Header'
import List from './components/List/List'
import Footer from './components/Footer/Footer'
import PubSub1 from "./Pubsub";
import './App.css'

export default class App extends Component {
    state = {
        list: [],
        //底部全选按钮功能
        allDone: (done) => {
            let arr = this.state.list.map((item) => {
                item.isDone = done;
                return item;
            })
            this.setState({
                list: arr,
            })
        },
        //底部删除全部已完成任务功能
        delHasDone: (done) => {
            let arr = this.state.list.filter((item) => {
                if (item.isDone === false) {
                    return item;
                } else {
                    return false;
                }
            })
            this.setState({
                list: arr,
            })
        },
        //点击单个任务改变状态
        changeDone: (e) => {
            let arr = this.state.list.map((item) => {
                if (item.id === +e.target.dataset.id) {
                    item.isDone = !item.isDone;
                }
                return item;
            })
            this.setState({
                list: arr,
            })
        },
        //点击按钮删除单个任务
        delOne: (e) => {
            let arr = this.state.list.filter((item) => {
                if (item.id !== +e.target.dataset.id) {
                    return item;
                } else {
                    return false;
                }

            })
            this.setState({
                list: arr,
            })
        },
        //按回车键添加任务
        addTodo: (e) => {
            if (e.keyCode === 13) {
                if (e.target.value.trimStart() === "") return;
                this.state.list.push({
                    todoName: e.target.value.trimStart(),
                    id: "",
                    isDone: false,
                });
                this.state.list.map((item, index) => {
                    item.id = index;
                    return true;
                })
                this.setState({
                    list: this.state.list,
                },)
                e.target.value = "";
            }
        }
    }

    render() {
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <PubSub1 />
                    <Header addTodo={this.state.addTodo}></Header>
                    {
                        this.state.list.length !== 0 ?
                            (<div>
                                <List list={this.state.list} changeDone={this.state.changeDone}
                                      delOne={this.state.delOne}></List>
                                <Footer list={this.state.list} allDone={this.state.allDone}
                                        delHasDone={this.state.delHasDone}></Footer>
                            </div>) : <h1>恭喜你，没有任务未完成！</h1>
                    }
                </div>
            </div>
        )
    }
    //生命周期--组件挂载完成读取缓存
    componentDidMount() {
        let str=localStorage.getItem("todos");
        let arr=JSON.parse(str);
        arr&&this.setState({
            list:arr,
        })
    }
    //生命周期--数据发生改变时重新缓存最新的数据
    componentDidUpdate() {
        let str=JSON.stringify(this.state.list);
        localStorage.setItem("todos",str);
    }

}
