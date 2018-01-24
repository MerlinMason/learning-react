import React from "react";

import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";

class app extends React.Component {
    constructor() {
        super();
        
        // make the addFish method visible to the app
        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        
        this.state = {
            fishes: {},
            order: {}
        }
    }
    
    addFish(fish) {
        // first copy the existing state
        const fishes = {...this.state.fishes};
        const timestamp = Date.now();
        // use a timestamp as a UID in the object keys
        fishes[`fishes-${timestamp}`] = fish;
        // update just the fishes part of the state for performance reasons
        this.setState({ fishes });
    }
    
    loadSamples() {
        this.setState({
            fishes: sampleFishes
        });
    }
    
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh seafood market" />
                <ul className="list-of-fishes"></ul>
                </div>
                <Order />
                <Inventory loadSamples={this.loadSamples} addFish={this.addFish} />
            </div>
        )
    }
}

export default app;