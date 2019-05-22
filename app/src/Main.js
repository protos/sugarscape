import React, { Component } from 'react';
import Grid from './components/Grid'
import Square from './components/Square'
import Beast from './components/Beast'
import './css/Main.css';


class Main extends Component {


    constructor(props) {
        console.log('constructor');
        super(props);
        this.state = {
            squares: [],
            beastLocations: [],
            beasts: []
        };
        this.beastNumber = 20;
        this.squareHeight = 50;
        this.squareWidth = 50;
        this.rowNumber = 20;
        this.columnNumber = 20;
        this.interval = 1000;
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
        this.generateBeasts();
    }


    generateBeastCoordinates() {
        let x = 0, y = 0, flag = 0;
        for (let k = 0; k < this.state.beastLocations.length; k++) {
            while (flag === 0) {
                x = Math.floor(Math.random() * this.columnNumber);
                y = Math.floor(Math.random() * this.rowNumber);
                if ((x === this.state.beastLocations[k].x) && (y === this.state.beastLocations[k].y)) {

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
        //console.log("generate beasts");
        let metabolism = 0, vision = 0;
        for (let k = 0, i = this.beastNumber; k < i; k++) {
            this.state.beastLocations.push(this.generateBeastCoordinates());
            metabolism = Math.floor(Math.random() * 3) + 1;
            vision = Math.floor(Math.random() * 4) + 2;

            this.state.beasts.push(<Beast xPos={this.state.beastLocations[this.state.beastLocations.length - 1].x}
                                          yPos={this.state.beastLocations[this.state.beastLocations.length - 1].y}
                                          metabolism={Math.floor(Math.random() * 3) + 1}
                                          vision={Math.floor(Math.random() * 4) + 2} />);
        }
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
      console.log('Turning');
      // clear grid
      //regenerate beasts;
      this.generateBeasts();
      this.render();
    }


    componentDidMount() {
        console.log('component Mounted');

        this.crankflyWheel();
    }


    render() {
        console.log('rendering');
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
                          markers={this.state.beastLocations}>
//                        {this.state.squares}
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Main;
