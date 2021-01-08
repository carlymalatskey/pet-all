import React from "react";
import Card from 'react-bootstrap/Card';
import "./PetCard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import api from "./../../api";

class PetCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleUnsave = async () => {
        let petId = this.props.pet.id;
        let response = await api.pet.removedSavedPet(petId);
        if (response.data.status === "success") {
            alert("Successfully removed saved pet");
        } else {
            alert("An error occurred in removing saved pet");
        }
        window.location.reload(false);
    }

    handleSave = async () => {
        let petId = this.props.pet.id;
        let response = await api.pet.save(petId);
        if (response.data.status === "success") {
            alert("Successfully saved pet");
        } else {
            alert("An error occurred in saving pet");
        }
        window.location.reload(false);
    }

    render() {
        let isPetSaved = this.props.user.savedPets.includes(this.props.pet.id);
        return (
            <div>
                <Card className="pet-card">
                    <Card.Img variant="top" className="pet-image" src={''}/>
                    {isPetSaved ? 
                        <FontAwesomeIcon className="hover-button saved-heart-icon general-icon" icon={faHeart} onClick={() => this.handleUnsave()}/>
                        :
                        <FontAwesomeIcon className="hover-button unsaved-heart-icon general-icon" icon={faHeart} onClick={() => this.handleSave()}/>
                    }                    <Card.Body>
                        <Card.Img className="pet-image" src={this.props.pet.picture}></Card.Img>
                        <Card.Title className="pet-name">{this.props.pet.name}</Card.Title>
                        <Card.Text className="pet-details">
                            {this.props.pet.adoptionStatus} <FontAwesomeIcon className="pet-card-dot" icon={faCircle}/> {this.props.pet.breed}
                        </Card.Text>
                        <Link className="pet-card-button" to={`/petpage/${this.props.pet.id}`}>Learn More About Me!</Link> 
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default PetCard; 