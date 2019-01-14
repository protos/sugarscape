import React, { Component } from 'react';


class Grid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            squares:props.squares,
            height: props.height || 600,
            width: props.width || 600,
            noOfXSquares: props.noOfXSquares || 50,
            noOfYSquares: props.noOfYSquares || 50,
            color: props.color || 'white'
        }
    }

    componentDidMount() {
        this.updateCanvas();
    }

    updateCanvas() {
        const cellHeight = this.state.height / this.state.noOfYSquares;
        const cellWidth = this.state.width / this.state.noOfXSquares;
        const ctx = this.refs.canvas.getContext('2d');

        ctx.fillStyle = 'white';
        ctx.fillRect(0,0, this.state.width, this.state.height);

        for (let a = 0, b = 49; a < b; a++ ) {
            ctx.moveTo(((a + 1) * cellWidth), 0);
            ctx.lineTo(((a + 1) * cellWidth), this.state.height);
        }
        for (let a = 0, b = 49; a < b; a++ ) {
            ctx.moveTo(0, ((a + 1) * cellHeight));
            ctx.lineTo(this.state.width, ((a + 1) * cellHeight));
        }
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 0.5;
        ctx.stroke();
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
