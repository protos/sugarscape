import React, { Component } from 'react';

class Square extends Component {

    constructor(props) {
        super(props);

        this.state = {
            xPos: this.props.xPos || 0,
            yPos: this.props.yPos || 0,
            // height: this.props.height,
            // width: this.props.width,
        }
        this.sugarUnitNumber = this.props.sugarUnitNumber || 1;
        this.isOccupied = 0;
    }

    render() {
      this.sugarUnitNumber = this.props.sugarUnitNumber;
      this.isOccupied = this.props.isOccupied;
      return null;
    }
}

export default Square;
