import React from "react";

import Header from "./Header";
import Order from "./Order";
import Fish from "./Fish";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import base from "../base";

class app extends React.Component {
    constructor() {
        super();
        
        // make the addFish method visible to the app
        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        
        this.state = {
            fishes: {},
            order: {}
        }
    }
    
    componentWillMount() {
        // runs right before app is rendered for first time
        
        // sync fishes data from firebase
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
        
        // check local storrage for order data
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
        
        if (localStorageRef) {
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
    }
    
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }
    
    componentWillUpdate(nextProps, nextState) {
        console.log("Something changed...")
        console.log({nextProps, nextState});
        
        localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
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
    
    addToOrder(key) {
        // copy the existing order state
        const order = {...this.state.order};
        // either increment by one or add the first instance of this item
        order[key] = order[key] + 1 || 1;
        // update state
        this.setState({ order });
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
                    <ul className="list-of-fishes">
                        {/*  
                            Our fishes state is an object rather than array...
                            we'll use Object.keys() to create an array of the object keys then .map() through that
                            we also need to give each item in the array a unique key, which can just be the object key.
                            We then pass through the fish details to the Component.
                        */}
                        {
                            Object
                            .keys(this.state.fishes)
                            .map((key) => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
                        }
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order}/>
                <Inventory loadSamples={this.loadSamples} addFish={this.addFish} />
            </div>
        )
    }
}

export default app;