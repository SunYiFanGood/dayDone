import React, {Component} from 'react'
import PubSub from "pubsub-js"
import './Footer.css'

export default class Footer extends Component {
    render() {
        let {list} = this.props;
        let hasDone = 0;
        let {allDone} = this.props;
        let {delHasDone} = this.props;
        list.map((item) => {
            if (item.isDone === true) {
                hasDone += 1;
            }
            return true;
        })
        return (
            <div className="todo-footer">
                <label>
                    <input type="checkbox" checked={hasDone===list.length} onChange={(e) => {allDone(e.target.checked)}}/>
                </label>
                <span>
          <span>已完成 {hasDone}</span> / 全部 {list.length}
        </span>
                <button className="btn btn-danger" onClick={delHasDone}>清除已完成任务</button>
            </div>
        )
    }

    componentDidMount() {
        PubSub.subscribe("money", (name, data) => {
            console.log(name, data)
        });
        console.log(">>>>>>>>>>>")
    }

}
