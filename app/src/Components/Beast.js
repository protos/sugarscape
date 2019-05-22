import React, { Component } from 'react';

class Beast extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: {
                x: props.xPos,
                y: props.yPos
            },
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

export default Beast;
