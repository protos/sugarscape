import React, { Component } from 'react';
import Grid from './components/Grid'
import Square from './components/Square'
import Marker from './components/Marker'
import './css/Main.css';


class Main extends Component {


    constructor(props) {
        console.log('Main constructor');
        super(props);
        this.state = {
            squares: [],
            beasts: [],
        };
        this.beastNumber = 15;
        this.squareHeight = 50;
        this.squareWidth = 50;
        this.rowNumber = 15;
        this.columnNumber = 15;
        this.interval = 3000;
        this.beastLocations = [];
        this.nextTurnTime = new Date().getTime() + this.interval;

        for (let a = 0, b = this.columnNumber - 1; a < b; a++ ) {
            for (let c = 0, d = this.rowNumber - 1; c < d; c++) {
                this.state.squares[a] = [];
                this.state.squares[a].push(<Square xPos={a}
                                                   yPos={c}
                                                   sugarUnitNumber={Math.floor(Math.random() * 3) + 1} />);
            }
        }
        console.log ('Squares generated.');
        this.state.beasts = this.generateBeasts();
    }


    generateBeastCoordinates() {
        let x = 0, y = 0, flag = 0;
        for (let k = 0; k < this.beastLocations.length; k++) {
           flag = 0;
            while (flag === 0) {
                x = Math.floor(Math.random() * this.columnNumber);
                y = Math.floor(Math.random() * this.rowNumber);
                if ((x === this.beastLocations[k].x) && (y === this.beastLocations[k].y)) {

                    x = Math.floor(Math.random() * this.columnNumber);
                    y = Math.floor(Math.random() * this.rowNumber);
                } else {
                    flag = 1;
                }
            }
        }
        return { x: (x + 1), y: (y + 1) };
    }


    generateBeasts() {
        console.log("generate beasts");
        this.beastLocations = [];
        let metabolism = 0, vision = 0, beastsBuffer = [];
        for (let k = 0, i = this.beastNumber; k < i; k++) {
            this.beastLocations.push(this.generateBeastCoordinates());
            metabolism = Math.floor(Math.random() * 3) + 1;
            vision = Math.floor(Math.random() * 4) + 2;

            beastsBuffer.push(<Marker xPos={this.beastLocations[this.beastLocations.length - 1].x}
                                          yPos={this.beastLocations[this.beastLocations.length - 1].y}
                                          metabolism={Math.floor(Math.random() * 3) + 1}
                                          vision={Math.floor(Math.random() * 4) + 2} />);
        }
        return beastsBuffer;
    }


    crankflyWheel() {
      let currentTime = new Date().getTime();

      if (currentTime >= this.nextTurnTime) {
        this.nextTurnTime = new Date().getTime() + this.interval;
        this.makeTurn();
      }
      window.requestAnimationFrame(this.crankflyWheel.bind(this));
    }


    makeTurn() {
      // clear grid
      let beasts = this.generateBeasts();
      console.log('Turning - setting beast state');
      this.setState({beasts: beasts});
    }


    componentDidMount() {
        console.log('component Mounted');
        this.crankflyWheel();
    }


    render() {
    //debugger;
        console.log('rendering main');
        return (
            <div className="App">
                <header className="App-header">
                    SS
                </header>
                <div className="main-content">
                    <Grid squares={this.state.squares}
                          columnNumber={this.columnNumber}
                          rowNumber={this.rowNumber}
                          height={this.rowNumber * this.squareHeight}
                          width={this.columnNumber * this.squareWidth}
                          markers={this.state.beasts}>
//                        {this.state.squares}
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Main;
