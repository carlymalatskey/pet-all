import React from "react";
import { Link } from "react-router-dom";

class LoggedInHome extends React.Component {
    constructor(props) { 
        super(props);
    }

    render() {
        return(
            <div>
                <h2 className="homepage-header">{`Welcome to PetAdopt ${this.props.user.displayName}!`}</h2>
                <div>              
                    <h4 className="homepage-about-text">At PetAdopt, we provide incredible homes for our furry friends,
                        who are just looking for a loving and warm environment where
                        they feel safe and secure.
                    </h4>
                </div>
            </div>
        );
    }
}

export default LoggedInHome;