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
            beastNumber: 20,
            beastLocations: [],
            beasts: [],
            rowNumber: 20,
            columnNumber: 20,
            gridHeight: 600,
            gridWidth: 600,
            timer: 0,
            turnCounter: 0
        };

        for (let a = 0, b = this.state.columnNumber - 1; a < b; a++ ) {
            for (let c = 0, d = this.state.rowNumber - 1; c < d; c++) {
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
        let x = 0, y = 0, flag = 0, cnt = 0;
        for (let k = 0; k < this.state.beastLocations.length; k++) {
            while (flag === 0) {
                x = Math.floor(Math.random() * this.state.columnNumber);
                y = Math.floor(Math.random() * this.state.rowNumber);
                if ((x === this.state.beastLocations[k].x) && (y === this.state.beastLocations[k].y)) {

                    x = Math.floor(Math.random() * this.state.columnNumber);
                    y = Math.floor(Math.random() * this.state.rowNumber);
                } else {
                    flag = 1;
                }
                cnt++;
            }
        }
        return { x: (x + 1), y: (y + 1) };
    }


    generateBeasts() {
        console.log("generate beasts");
        let metabolism = 0, vision = 0;
        for (let k = 0, i = this.state.beastNumber; k < i; k++) {
            this.state.beastLocations.push(this.generateBeastCoordinates());
            metabolism = Math.floor(Math.random() * 3) + 1;
            vision = Math.floor(Math.random() * 4) + 2;

            this.state.beasts.push(<Beast xPos={this.state.beastLocations[this.state.beastLocations.length - 1].x}
                                          yPos={this.state.beastLocations[this.state.beastLocations.length - 1].y}
                                          metabolism={Math.floor(Math.random() * 3) + 1}
                                          vision={Math.floor(Math.random() * 4) + 2} />);
        }
    }


    flyWheel() {
      console.log('Flywheel turning');
      for (let a = 0, b = 5; a < b; a++) {

          //this.state.timer=setInterval(this.running.bind(this), 1000);
      }
    }


    running() {
        console.log('running: ' + this.state.turnCounter);
        if (this.state.turnCounter === 5) {
          console.log('clearing: ' + this.state.timer);
          clearTimeout(this.state.timer);
        }
        this.state.turnCounter += 1;
    }


    componentDidMount() {
        console.log('component Mounted');



        this.flyWheel();
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
                          columnNumber={this.state.columnNumber}
                          rowNumber={this.state.rowNumber}
                          gridHeight={this.state.gridHeight}
                          gridWidth={this.state.gridWidth}
                          markers={this.state.beastLocations}>
//                        {this.state.squares}
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Main;
