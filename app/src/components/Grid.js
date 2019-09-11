import React, { Component } from 'react';

class Grid extends Component {


    constructor(props) {
        console.log("Grid Constructor");
        super(props);
        this.cellHeight = this.props.height / this.props.columnNumber;
        this.cellWidth = this.props.width / this.props.rowNumber;
    }


    componentDidMount() {
        console.log('Grid component mounted');
        this.canvasContext = this.refs.canvas.getContext('2d');
        this.updateCanvas();
    }


    updateCanvas() {
        if (!this.canvasContext) {
            return;
        }
        this.canvasContext.clearRect(0, 0, this.props.width, this.props.height);
        this.canvasContext.fillStyle = 'white';
        this.canvasContext.fillRect(0,0, this.props.width, this.props.height);

        for (let a = 1, b = this.props.columnNumber; a < b; a++ ) {
            this.canvasContext.moveTo(a * this.cellWidth, 0);
            this.canvasContext.lineTo(a * this.cellWidth, this.props.height);
        }

        for (let a = 1, b = this.props.rowNumber; a < b; a++ ) {
            this.canvasContext.moveTo(0, a * this.cellHeight);
            this.canvasContext.lineTo(this.props.width, a * this.cellHeight);
        }
        this.canvasContext.strokeStyle = 'black';
        this.canvasContext.lineWidth = 0.5;
        this.canvasContext.stroke();
        this.renderMarkers();
    }


    renderMarkers() {
        this.canvasContext.lineWidth = 1;
        for (let a = 0, b = this.props.markers.length; a < b; a++) {
            let ptX = 0;
            let ptY = 0;

            ptX = (this.props.markers[a].props.xPos * this.cellWidth  - (this.cellWidth / 2));
            ptY = (this.props.markers[a].props.yPos * this.cellHeight - (this.cellHeight / 2));
            this.canvasContext.fillStyle = this.props.markers[a].props.color;
            this.canvasContext.beginPath();
            this.canvasContext.arc(ptX, ptY, 7, 0, 2 * Math.PI, false);
            this.canvasContext.fill();
            this.canvasContext.stroke();
        }
    }


    render() {
        console.log ('Rendering Grid');
        this.updateCanvas();
        return (
            <div className="Grid">
                <canvas ref="canvas"
                        width={this.props.width}
                        height={this.props.height}
                        className="gridCanvas">
                </canvas>
            </div>
        );
    }
}

export default Grid;
