import React from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import "./PetDetailsPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import api from "./../../api";
import { alignPropType } from "react-bootstrap/esm/DropdownMenu";
import PetDetailsText from "./PetDetailsText.js";

class PetDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pet: undefined,
            isLoading: false,
            savedPets: []
        }
    }

    async componentDidMount() {
        let petId = this.props.match.params.id;
        this.setState({
            isLoading: !this.state.isLoading,
        });
        let response = await api.pet.getPetById(petId);
        this.setState({
            pet: response.data.currentPet,
            isLoading: !this.state.isLoading
        })
    }

    async handleAdopt() {
        let petId = this.props.match.params.id;
        let response = await api.pet.adopt(petId);
        if (response.data.status == "success") {
            alert(`CONGRATS! ${this.state.pet.name} has been adopted!`);
            window.location.reload();
        } else {
            alert(`Error: ${response.data.message}`);
        }
    }

    async handleFoster() {
        let petId = this.props.match.params.id; 
        let response = await api.pet.foster(petId);
        if (response.data.status == "success") {
            alert(`CONGRATS! ${this.state.pet.name} has been fostered!`);
            window.location.reload();
        } else {
            alert(`Error occurred: ${response.data.message}`);
        }
    }

    async handleSave() {
        let petId = this.props.match.params.id; 
        let response = await api.pet.save(petId);
        if (response.data.status == "success") {
            alert(`${this.state.pet.name} has been added to your favorites!`);
            window.location.reload();
        } else {
            alert(`Error: ${response.data.message}`);
        }
    }

    async handleRemovedSavedPet() {
        let petId = this.props.match.params.id; 
        let response = await api.pet.removedSavedPet(petId);
        if (response.data.status == "success") {
            alert(`${this.state.pet.name} has been removed from your favorites.`);
            window.location.reload();
        } else {
            alert(`Error: ${response.data.message}`);
        }
    }

    async handleReturn() {
        let petId = this.props.match.params.id; 
        let response = await api.pet.return(petId);
        if (response.data.status == "success") {
            alert(`${this.state.pet.name} has been returned.`);
            window.location.reload();
        } else {
            alert(`Error occurred: ${response.data.message}`);
        }
    }

    isPetSaved() {
        let petId = this.props.match.params.id; 
        return this.props.user.savedPets.includes(petId);
    }

    isUserOwningPet() {
        let petId = this.props.match.params.id; 
        return this.props.user.fosteredPets.includes(petId) || this.props.user.adoptedPets.includes(petId); 
    }
    render() {
        return (
            <div>
                {this.state.pet && this.props.user &&
                    <div>
                        <div>
                            <Image className="pet-image-heading" src={this.state.pet.picture}></Image>
                        </div>
                        <div className="under-picture-section">
                            <PetDetailsText pet={this.state.pet}></PetDetailsText>
                            <div>
                            
                                <div>
                                    {this.props.user.isAdmin ? 
                                        <Link pet={this.state.pet} to={`/editPet/${this.state.pet.id}`} className="action-button-style edit-pet">Edit Pet Information</Link> : <div></div>}
                                </div>
                                <div className="action-buttons-section">
                                    <div className="action-buttons">
                                        {this.isPetSaved() ? 

                                            <Button variant="primary" type="submit" className="action-button-style" onClick={() => this.handleRemovedSavedPet()}><FontAwesomeIcon className="heart-icon" icon={faHeart}/> Unfavorite Me :(</Button>
                                        :
                                            <Button variant="primary" type="submit" className="action-button-style" onClick={() => this.handleSave()}><FontAwesomeIcon className="heart-icon" icon={faHeart}/> Favorite Me!</Button>
                                        }
                                    {this.isUserOwningPet() ?
                                        <div>
                                            <Button variant="primary" type="submit" className="action-button-style" onClick={() => this.handleReturn()}>Return Me</Button>
                                        </div>
                                        :
                                        <div>
                                            {this.state.pet.adoptionStatus.toLowerCase() === "available" ?  
                                                <div>
                                                    <Button variant="primary" type="submit" className="action-button-style" onClick={() => this.handleFoster()}>Foster Me</Button>
                                                    <Button variant="primary" type="submit" className="action-button-style" onClick={() => this.handleAdopt()}>Adopt Me</Button>
                                                </div>
                                            : 
                                                <div className="label-not-available">
                                                    This pet is not available for adoption or fostering. 
                                                    <Link className="label-not-available" to="/search"> Find more pets</Link>
                                                </div>
                                            }
                                        </div>
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default PetDetailsPage; 