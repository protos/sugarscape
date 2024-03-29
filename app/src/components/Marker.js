import React, { Component } from 'react';

class Marker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location: {
                x: props.xPos,
                y: props.yPos
            },
            color: props.color,
            metabolism: props.metabolism,   // 1 - 3
            vision: props.vision,           // 2 - 4
            foodStore: 0                    // integer
        };
    }

    render() {
        return (
            <div className="Beast">
                X
            </div>
        );
    }
}

export default Marker;