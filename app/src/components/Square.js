import React, { Component } from 'react';

class Square extends Component {

    constructor(props) {
        super(props);

        this.state = {
            xPos: this.props.xPos || 0,
            yPos: this.props.yPos || 0,
            // height: this.props.height,
            // width: this.props.width,
            sugarUnitNumber: this.props.sugarUnitNumber || 1
        }
    }

    render() {
        return (<div className="square"/>);
    }
}

export default Square;
