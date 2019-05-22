import React, { Component } from 'react';

class Grid extends Component {

    constructor(props) {
        super(props);

        this.state = {
            markers: props.markers,
        }

        this.height = props.height || 500;
        this.width = props.width || 500;
        this.rowNumber = props.rowNumber || 50;
        this.columnNumber = props.columnNumber || 50;

    }

    componentDidMount() {
        this.updateCanvas();
    }

    updateCanvas() {
        const cellHeight = this.height / this.columnNumber;
        const cellWidth = this.width / this.rowNumber;
        const ctx = this.refs.canvas.getContext('2d');

        ctx.fillStyle = 'white';
        ctx.fillRect(0,0, this.width, this.height);

        for (let a = 1, b = this.columnNumber; a < b; a++ ) {
            ctx.moveTo(a * cellWidth, 0);
            ctx.lineTo(a * cellWidth, this.height);
        }
        for (let a = 1, b = this.rowNumber; a < b; a++ ) {
            ctx.moveTo(0, a * cellHeight);
            ctx.lineTo(this.width, a * cellHeight);
        }
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 0.5;
        ctx.stroke();

        this.renderMarkers(ctx, cellHeight, cellWidth);
    }

    renderMarkers(ctx, cellHeight, cellWidth) {
        console.log ('No of beasts: ' + this.state.markers.length);

        ctx.lineWidth = 1;
        for (let a = 0, b = this.state.markers.length; a < b; a++) {
            let ptX = 0;
            let ptY = 0;

            ptX = (this.state.markers[a].x * cellWidth  - (cellWidth / 2));
            ptY = (this.state.markers[a].y * cellHeight - (cellHeight / 2));
            ctx.fillStyle = this.getRandomColor();
            ctx.beginPath();
            ctx.arc(ptX, ptY, 7, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.stroke();

            console.log ('marker: ' + this.state.markers[a].x + ' ' + ptX + ' ' +  this.state.markers[a].y + ' ' +
            ptY);
        }
    }


    getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }


    render() {
        return (
            <div className="Grid">
                <canvas ref="canvas"
                        width={this.width}
                        height={this.height}
                        className="gridCanvas">
                </canvas>
            </div>
        );
    }
}

export default Grid;
