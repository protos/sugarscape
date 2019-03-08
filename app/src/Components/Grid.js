import React, { Component } from 'react';


class Grid extends Component {

    constructor(props) {
        super(props);

        this.state = {
            squares:props.squares,
            height: props.height || 500,
            width: props.width || 500,
            rowNumber: props.rowNumber || 50,
            columnNumber: props.columnNumber || 50,
            color: props.color || 'white'
        }
    }

    componentDidMount() {
        this.updateCanvas();
    }

    updateCanvas() {
        const cellHeight = this.state.height / this.state.columnNumber;
        const cellWidth = this.state.width / this.state.rowNumber;
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
