import React from "react";
import { formatPrice } from "../helpers";

class Fish extends React.Component {
    render() {
        // extract details from this.props with es6 destructuring (saves typing this.props a lot in the template)
        const { details } = this.props;
        
        const isAvailable = details.status === "available";
        const btnTxt = isAvailable ? "Add To Order" : "Sold Out";
        
        return(
            <li className="menu-fish">
                <img src={details.image} alt={details.name}/>
                <h3 className="fish-name">
                    {details.name}
                    <span className="price">{formatPrice(details.price)}</span>
                </h3>
                <p>{details.desc}</p>
                <button disabled={!isAvailable}>{btnTxt}</button>
            </li>
        )
    }
}

export default Fish;