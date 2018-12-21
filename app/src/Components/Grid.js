import React, { Component } from 'react';
import Square from "./Square";

class Grid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height: 600,
            width: 600,
            color: "white"
        }
    }

    componentDidMount() {
        this.updateCanvas();
    }

    updateCanvas() {
        const cellHeight = this.state.height / 50;
        const cellWidth = this.state.width / 50;
        const ctx = this.refs.canvas.getContext('2d');

        ctx.fillStyle = "white";
        ctx.fillRect(0,0, this.state.width, this.state.height);

        return(<Square parentContext={ctx} xPos={0} yPos={0} width={cellWidth} height={cellHeight} />);
    }

    render() {
        return (
            <div className="Grid">
                <canvas ref="canvas"
                        width={this.state.width}
                        height={this.state.height}
                        className="gridCanvas">

                </canvas>
            </div>
        );
    }
}

export default Grid;
