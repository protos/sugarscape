import React, { Component } from 'react';

class Square extends Component {

    constructor(props) {
        super(props);

        debugger;
        this.state = {
            xPos: this.props.xPos,
            yPos: this.props.yPos,
            height: this.props.height,
            width: this.props.width,
            ctx: this.props.parentContext
        }
    }

    render() {
        return (
            function() {
                let ctx = this.props.ctx;
                // ctx.moveTo((this.state.xPos * this.state.width), (this.state.yPos * this.state.height));
                // ctx.lineTo((this.state.xPos * this.state.width), (this.state.yPos * this.state.height));

                ctx.moveTo(0,0);
                ctx.lineTo(200, 200);


                ctx.strokeStyle = "black";
                ctx.stroke();
            }()
        );
    }
}

export default Square;
