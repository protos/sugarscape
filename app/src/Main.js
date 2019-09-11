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
            beastLocations: []
        };
        this.beastNumber = 15;
        this.squareHeight = 25;
        this.squareWidth = 25;
        this.rowNumber = 15;
        this.columnNumber = 15;
//        this.beastLocations = [];
        this.squares = [];

        this.interval = 3000;
        this.nextTurnTime = new Date().getTime() + this.interval;

        for (let a = 0, b = this.columnNumber - 1; a < b; a++) {
            this.squares[a] = [];
            for (let c = 0, d = this.rowNumber - 1; c < d; c++) {
                this.squares[a].push(<Square xPos={a} yPos={c}
                                             sugarUnitNumber={Math.floor(Math.random() * 3) + 1}
                                             isOccupied="0"/>);
            }
        }
        console.log ('Squares generated');
    }


    generateBeastCoordinates(index) {
        let x = 0, y = 0, flag = 0;

        for (let k = 0; k < index; k++) {
           flag = 0;
            while (flag === 0) {
                x = Math.floor(Math.random() * this.columnNumber);
                y = Math.floor(Math.random() * this.rowNumber);
                if (this.state.beastLocations.length !== 0) {
                    if ((x === this.state.beastLocations[k].x) && (y === this.state.beastLocations[k].y)) {

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
        return { x: (x + 1), y: (y + 1) };
    }


    generateBeasts() {
        console.log("generate beasts");
        let beastLoc = [];
        let metabolism = 0, vision = 0, x, y, beastsBuffer = [];

        for (let k = 0, i = this.beastNumber; k < i; k++) {
            beastLoc.push(this.generateBeastCoordinates(k));
            metabolism = Math.floor(Math.random() * 3) + 1;
            vision = Math.floor(Math.random() * 4) + 2;

            x = beastLoc[beastLoc.length - 1].x;
            y = beastLoc[beastLoc.length - 1].y;


            beastsBuffer.push(<Marker xPos={x} yPos={y}
                                 metabolism={Math.floor(Math.random() * 3) + 1}
                                 vision={Math.floor(Math.random() * 4) + 2}
                                 color={this.getRandomColor()} />);

        }
        this.setState((state) => {
            console.log ('Setting beastLocations to state!!');
            return {beastLocations: beastLoc}
        });
        return beastsBuffer;
    }


    updateBeasts() {
        let beasts = this.state.beasts;
        let beastsBuffer = [];
        let x, y;
        for (let k = 0; k < beasts.length; k++) {
            x = (beasts[k].props.xPos + 1) <= this.columnNumber ? beasts[k].props.xPos + 1 : 1;
            y = beasts[k].props.yPos;

            beastsBuffer.push(<Marker xPos={x} yPos={y}
                                      metabolism={beasts[k].props.metabolism}
                                      vision={beasts[k].props.vision}
                                      color={beasts[k].props.color}/>);
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


    getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


    makeTurn() {
        console.log('Turning');
        this.updateBeasts();
    }


    componentDidMount() {
        this.setState({beasts: this.generateBeasts()});
        console.log('component Mounted');
        this.crankFlyWheel();
    }


    render() {
        console.log('rendering main');
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
                          markers={this.state.beasts}>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Main;
