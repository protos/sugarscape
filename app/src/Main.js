import React, { Component } from 'react'
import Grid from './components/Grid'
import Square from './components/Square'
import Marker from './components/Marker'
import './css/Main.css';

class Main extends Component {

    constructor(props) {
        console.log('Main constructor');
        super(props);
        this.state = {
            beasts: [],
            squares: []
        };
        this.beastNumber = 35;
        this.beastLocations = [];
        this.beastRadius = 4;
        this.squareHeight = 30;
        this.squareWidth = 30;
        this.rowNumber = 24;
        this.columnNumber = 24;
        
        this.interval = 1000;
        this.nextTurnTime = new Date().getTime() + this.interval;

    }


    static getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


    generateBeastCoordinates(index) {
        let x = 0, y = 0, flag = 0;

        for (let k = 0; k < index; k++) {
            flag = 0;
            while (flag === 0) {
                x = Math.floor(Math.random() * this.columnNumber);
                y = Math.floor(Math.random() * this.rowNumber);
                if (this.beastLocations.length !== 0) {
                    if ((x === this.beastLocations[k].x) && (y === this.beastLocations[k].y)) {

                        x = Math.floor(Math.random() * this.columnNumber);
                        y = Math.floor(Math.random() * this.rowNumber);
                    } else {
                        flag = 1;
                    }
                }
                else {
                    x = Math.floor(Math.random() * this.columnNumber);
                    y = Math.floor(Math.random() * this.rowNumber);
                    flag = 1;
                }
            }
        }
        return { x: x, y: y };
    }


    initBeasts() {
        console.log("generate beasts");
        let beasts = [];

        for (let k = 0, i = this.beastNumber; k < i; k++) {
            this.beastLocations.push(this.generateBeastCoordinates(k));

            beasts.push(<Marker xPos={this.beastLocations[this.beastLocations.length - 1].x}
                                      yPos={this.beastLocations[this.beastLocations.length - 1].y}
                                      metabolism={Math.floor(Math.random() * 3) + 1}
                                      vision={Math.floor(Math.random() * 4) + 2}
                                      color={Main.getRandomColor()}
                                      radius={this.beastRadius}  />);
        }
        return beasts;
    }


    initSquares() {
        let squares = [];
        let sugarUnitNumber = 0;
        
        for (let a = 0, b = this.columnNumber + 1; a < b; a++) {
            squares[a] = [];
            for (let c = 0, d = this.rowNumber + 1; c < d; c++) {
                sugarUnitNumber = Math.floor(Math.random() * 3) + 1;
                squares[a].push(<Square xPos={a} yPos={c}
                                             sugarUnitNumber={sugarUnitNumber}
                                             isOccupied="0"/>);
            }
        }
        console.log ('Squares initialized');
        return squares;

    }


    updateBeasts() {
        let beasts = this.state.beasts, x, beastsBuffer = [];

        for (let k = 0; k < beasts.length; k++) {
            x = beasts[k].props.xPos <= this.columnNumber ? beasts[k].props.xPos + 1 : 1;

            beastsBuffer.push(<Marker xPos={x} yPos={beasts[k].props.yPos}
                                      metabolism={beasts[k].props.metabolism}
                                      vision={beasts[k].props.vision}
                                      color={beasts[k].props.color}
                                      radius={this.beastRadius} />);
        }
        this.setState({beasts: beastsBuffer});
    }


    crankFlyWheel() {
        let currentTime = new Date().getTime();

        if (currentTime >= this.nextTurnTime) {
            this.nextTurnTime = new Date().getTime() + this.interval;
            this.makeTurn();
        }
        window.requestAnimationFrame(this.crankFlyWheel.bind(this));
    }


    makeTurn() {
        //console.log('Turning');
        this.updateBeasts();
    }

        
    initMainGrid() {
        return (
            <div className="App">
                <header className="App-header">
                    SS
                </header>
                <div className="main-content">
                    <Grid columnNumber={this.columnNumber}
                          rowNumber={this.rowNumber}
                          height={this.rowNumber * this.squareHeight}
                          width={this.columnNumber * this.squareWidth}
                          markers={this.state.beasts}
                          food={this.state.squares}>
                    </Grid>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.setState({squares: this.initSquares()});
        this.setState({beasts: this.initBeasts()});
        console.log('component Mounted');
        //this.crankFlyWheel();
    }



    render() {
        console.log('rendering main');
        return this.initMainGrid();
    }
}

export default Main;
