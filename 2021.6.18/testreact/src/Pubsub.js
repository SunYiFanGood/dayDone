import React, {Component} from 'react';
import PubSub from "pubsub-js"
export default class PubSub1 extends Component {
    componentDidMount() {
        PubSub.publish('money',888888)
    }
    render() {
        return (
            <div></div>
        );
    }
}
