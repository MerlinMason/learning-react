import React from "react";

class AddFishForm extends React.Component {
    createFish(event) {
        event.preventDefault();
        
        const fish = {
            name: this.name.value,
            price: this.price.value,
            status: this.status.value,
            description: this.description.value,
            image: this.image.value,
        }
        
        // this function is passed through from App -> Inventory -> AddFishForm
        this.props.addFish(fish);
        
        // vanilla javascript to reset the form
        this.form.reset();
    }
    
    render() {
        return(
            <form className="fish-edit" ref={(input) => this.form = input } onSubmit={(e) => this.createFish(e)}>
                <input ref={(input) => this.name = input} type="text" placeholder="Name" />
                <input ref={(input) => this.price = input} type="text" placeholder="Price" />
                <select ref={(input) => this.status = input}>
                    <option value="available">Fresh!</option>
                    <option value="unavilable">Sold out</option>
                </select>
                <textarea ref={(input) => this.description = input} type="text" placeholder="Description"></textarea>
                <input ref={(input) => this.image = input} type="text" placeholder="Image" />
                <button type="submit">+ Add Item</button>
            </form>
        )
    }
}

export default AddFishForm;