import React from "react";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
    goTostore(event) {
        event.preventDefault();

        const inputValue = this.storeInput.value;
        this.context.router.transitionTo(`/store/${inputValue}`);
    }
    
    render() {
        return (
            <form className="store-selector" onSubmit={this.goTostore.bind(this)}>
                <h2>Please enter a store</h2>
                <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input }}/>
                <button type="submit">Visit store</button>
            </form>
            
             
        )
    }
}

StorePicker.contextTypes = {
    router: React.PropTypes.object
}

export default StorePicker