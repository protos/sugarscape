import React, { Component } from 'react';

class Square extends Component {

    constructor(props) {
        super(props);

        debugger;
        this.state = {
            xPos: this.props.xPos || 0,
            yPos: this.props.yPos || 0,
            // height: this.props.height,
            // width: this.props.width,
            noOfSugarUnits: this.props.noOfSugarUnits || 1
        }
    }

    render() {
        return (<div className="square"/>);
    }
}

export default Square;
