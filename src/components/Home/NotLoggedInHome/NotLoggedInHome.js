import React from "react";
import Button from "react-bootstrap/Button";
import SignUpModal from "./modals/SignUpModal/SignUpModal.js";
import LoginModal from "./modals/LoginModal/LoginModal.js";
import { Link } from "react-router-dom";
import "./../NotLoggedInHome/NotLoggedInHome.css";

class NotLoggedInHome extends React.Component {
    constructor(props) { 
        super(props);
        this.state = { 
            showSignUpModal: false,
            showLoginModal: false,
        }
    }

    handleSignUpModal = () => {
        this.setState({
            showSignUpModal: true,
        });
    };

    handleLoginModal = () => {
        this.setState({
            showLoginModal: true,
        });
    };
    
    handleCloseModals = () => {
        this.setState({
            showSignUpModal: false,
            showLoginModal: false,
        });
    };

    handleLoggedIn() {
        this.handleCloseModals();
        this.props.loggedIn();
    }

    handleSignedUp(newUser) {
        //TODO: notify the parent
        this.props.signedUp(newUser); 
    }

    render() {
        return(
            <div>
                <h2 className="homepage-header">{`Welcome to PetAdopt!`}</h2>
                    <div>              
                        <h4 className="homepage-about-text">At PetAdopt, we provide incredible homes for our furry friends,
                            who are just looking for a loving and warm environment where
                            they feel safe and secure.
                        </h4>
                    <div className="homepage-buttons-section">
                        <Button onClick={this.handleSignUpModal}>Join Now and Adopt a Pet Today!</Button>
                        <Button onClick={this.handleLoginModal}>Login</Button>
                    </div>
                </div>
                <SignUpModal
                    showModal={this.state.showSignUpModal}
                    handleSignedUp={(newUser) => this.handleSignedUp(newUser)}
                />
                <LoginModal
                    showModal={this.state.showLoginModal}
                    handleLoggedIn={() => this.handleLoggedIn()}
                />
            </div>
        );
    }
}

export default NotLoggedInHome;