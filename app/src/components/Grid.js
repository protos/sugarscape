import React, { Component } from 'react';

class Grid extends Component {

    constructor(props) {
      console.log("Grid Constructor")
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
      console.log('Grid component mounted')
      this.canvasContext = this.refs.canvas.getContext('2d');
      this.updateCanvas(1);
    }

    updateCanvas() {
        const cellHeight = this.height / this.columnNumber;
        const cellWidth = this.width / this.rowNumber;

        this.canvasContext.fillStyle = 'white';
        this.canvasContext.fillRect(0,0, this.width, this.height);

        for (let a = 1, b = this.columnNumber; a < b; a++ ) {
            this.canvasContext.moveTo(a * cellWidth, 0);
            this.canvasContext.lineTo(a * cellWidth, this.height);
        }
        for (let a = 1, b = this.rowNumber; a < b; a++ ) {
            this.canvasContext.moveTo(0, a * cellHeight);
            this.canvasContext.lineTo(this.width, a * cellHeight);
        }
        this.canvasContext.strokeStyle = 'black';
        this.canvasContext.lineWidth = 0.5;
        this.canvasContext.stroke();

        this.renderMarkers(cellHeight, cellWidth);
    }

    renderMarkers(cellHeight, cellWidth) {
        console.log ('No of beasts: ' + this.state.markers.length);

        this.canvasContext.lineWidth = 1;
        for (let a = 0, b = this.state.markers.length; a < b; a++) {
            let ptX = 0;
            let ptY = 0;

            ptX = (this.state.markers[a].props.xPos * cellWidth  - (cellWidth / 2));
            ptY = (this.state.markers[a].props.yPos * cellHeight - (cellHeight / 2));
            this.canvasContext.fillStyle = this.getRandomColor();
            this.canvasContext.beginPath();
            this.canvasContext.arc(ptX, ptY, 7, 0, 2 * Math.PI, false);
            this.canvasContext.fill();
            this.canvasContext.stroke();

            console.log ('marker: ' + this.state.markers[a].props.xPos + ' ' + ptX + ' ' +  this.state.markers[a].props.yPos + ' ' +
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
        console.log ('Rendering Grid');
        //this.renderMarkers();
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
