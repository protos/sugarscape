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
            noOfBeasts: 400,
            beastLocations: [],
            beasts: []
        };

        for (let a = 0, b = 49; a < b; a++ ) {
            for (let c = 0, d = 49; c < d; c++) {
                this.state.squares[a] = [];
                this.state.squares[a].push(<Square xPos={a}
                                                   yPos={c}
                                                   noOfSugarUnits={Math.floor(Math.random() * 3) + 1} />);
            }
        }
        console.log ('Squares generated.');
    }


    generateBeastCoordinates() {
        let x = 0, y = 0, flag = 0;
        for (let k = 0; k < this.state.beastLocations.length; k++) {
            while (flag === 0) {
                x = Math.floor(Math.random() * 49);
                y = Math.floor(Math.random() * 49);
                if ((x === this.state.beastLocations[k].x) && (y === this.state.beastLocations[k].y)) {

                    console.log ('its the same');
                    x = Math.floor(Math.random() * 49);
                    y = Math.floor(Math.random() * 49);
                } else {
                    flag = 1;
                }
            }
        }
        return { x: x, y: y };
    }


    componentDidMount() {
        console.log('component Mounted');
        let metabolism = 0, vision = 0;
        for (let k = 0, i = this.state.noOfBeasts; k < i; k++) {
            this.state.beastLocations.push(this.generateBeastCoordinates());
            metabolism = Math.floor(Math.random() * 3) + 1;
            vision = Math.floor(Math.random() * 4) + 2;

            this.state.beasts.push(<Beast xPos={this.state.beastLocations[this.state.beastLocations.length - 1].x}
                                          yPos={this.state.beastLocations[this.state.beastLocations.length - 1].y}
                                          metabolism={Math.floor(Math.random() * 3) + 1}
                                          vision={Math.floor(Math.random() * 4) + 2} />);
        }
        // trigger flywheel event loop.
    }


    render() {
        console.log('rendering');
        return (
            <div className="App">
                <header className="App-header">
                    SS
                </header>
                <div className="main-content">
                    <Grid squares={this.state.squares}>
                        {this.state.squares}
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Main;
