import React, { Component } from 'react';

class Grid extends Component {


    constructor(props) {
        console.log("Grid Constructor");
        super(props);
        this.cellHeight = props.height / props.rowNumber;
        this.cellWidth = props.width / props.columnNumber;
    }


    componentDidMount() {
        console.log('Grid component mounted');
        this.canvasContext = this.refs.canvas.getContext('2d');
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
        this.canvasContext.lineWidth = 0.3;
        this.canvasContext.stroke();
        this.renderMarkers();
        this.renderSugar();
    }


    renderMarkers() {
        console.log("Render Markers.");
        this.canvasContext.lineWidth = 1;
        let markers = this.props.markers;
        let ptX = 0;
        let ptY = 0;
        
        for (let a = 0, b = markers.length; a < b; a++) {

            ptX = (markers[a].props.xPos * this.cellWidth  - (this.cellWidth / 2));
            ptY = (markers[a].props.yPos * this.cellHeight - (this.cellHeight / 2));
            this.canvasContext.fillStyle = markers[a].props.color;
            this.canvasContext.beginPath();
            this.canvasContext.arc(ptX, ptY, markers[a].props.radius, 0, 2 * Math.PI, false);
            this.canvasContext.fill();
            this.canvasContext.stroke();
        }
    }


    renderSugar() {
        console.log("Render Sugar.");
        let food = this.props.food;
        let ptX = 0;
        let ptY = 0;
        
        for (let a = 0, b = food.length; a < b; a++) {
            for (let c = 0, d = food[a].length; c < d; c++) {
                ptX = (a * this.cellWidth  - (this.cellWidth / 2));
                ptY = (c * this.cellHeight - (this.cellHeight / 2));
                
            this.canvasContext.fillStyle = "red";
            this.canvasContext.beginPath();
            this.canvasContext.arc(ptX, ptY, 2, 0, 2 * Math.PI, false);
            this.canvasContext.fill();
            this.canvasContext.stroke();
                
                
//                this.canvasContext.text({
//                    "text": food[a][c],
//                    "x": ptX,
//                    "y": ptY
//                });
//            console.log("Sugar!: " + food[a][c]);
            }
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
