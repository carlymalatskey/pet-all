import React from "react"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import "./PetDetailsText.css";

class PetDetailsText extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="about-pet-section">
                <h2 className="pet-name-heading">{this.props.pet.name}</h2>
                <div className ="pet-subsection-details">{this.props.pet.adoptionStatus} <FontAwesomeIcon className="pet-card-dot" icon={faCircle}/> {this.props.pet.type} <FontAwesomeIcon className="pet-card-dot" icon={faCircle}/> {this.props.pet.breed}</div>
                <div className="about-me-section">
                    <h2>About Me</h2>
                    <div> 
                        <h4 className="about-subheadings">Size</h4>
                        <p className="about-subheadings-answers"> I weigh {this.props.pet.weight} pounds and I am {this.props.pet.height} inches tall!</p>
                    </div>
                    {this.props.pet.isHypoallergenic ? 
                        <div> 
                            <h4 className="about-subheadings diet-rest">Hypoallergenic: </h4>
                            <p className="about-subheadings-answers diet-rest"> Yes </p>
                        </div>
                        :
                        <div> 
                            <h4 className="about-subheadings diet-rest">Hypoallergenic: </h4>
                            <p className="about-subheadings-answers diet-rest"> No </p>
                        </div>
                    }
                
                    <div> 
                        <h4 className="about-subheadings color">Color:</h4>
                        <p className="about-subheadings-answers color"> {this.props.pet.color}</p>
                    </div>
                    {this.props.pet.dietRest.length > 0 ?
                        <div> 
                            <h4 className="about-subheadings diet-rest">Dietary Restrictions: </h4>
                            <p className="about-subheadings-answers diet-rest"> {this.props.pet.dietRest}</p>
                        </div>
                        :
                        <div> 
                            <h4 className="about-subheadings diet-rest">Dietary Restrictions: </h4>
                            <p className="about-subheadings-answers diet-rest"> None </p>
                        </div>
                    }
                </div>
                <div className="meet-me-section">
                    <h2>Meet Me</h2>
                    <div className="meet-me-section-criteria"> 
                        <p className="meet-me-subheadings-answers"> {this.props.pet.bio}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default PetDetailsText;