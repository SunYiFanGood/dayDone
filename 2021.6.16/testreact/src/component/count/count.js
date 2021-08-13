import React from "react";
import PropTypes from "prop-types"
import {logDOM} from "@testing-library/react";

class Count extends React.Component {
    static propTypes = {
        count: PropTypes.number.isRequired
    }
    // constructor() {
    //     super();
    //     this.state={
    //         count:0,
    //         name:"zs",
    //         info:"HH"
    //     }
    // }
    state = {
        username: "",
    }

    render() {
        return <div>
            <h1>{this.props.name}</h1>
            <h3>{this.props.count}</h3>
            <p>{this.props.info}</p>
            <button onClick={this.props.fn}>
                +++
            </button>
            <form>
                <input type="text" value={this.state.username} onChange={
                    this.fn("username","value")
                }/>
                <button onClick={(e) => {
                    e.preventDefault()
                    console.log(this.state.username)
                }}>按钮
                </button>
            </form>
        </div>
    }

    fn = (name, value) => {
        return (e)=>{
            this.setState({
                [name]: e.target[value],
            })
        }
    }
}

Count.defaultProps = {
    count: "请传入值，类型为number"
}
export default Count