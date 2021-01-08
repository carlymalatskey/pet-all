import React from "react";
import { Form, Button } from "react-bootstrap";
import api from "./../../../api";
import constants from "./../../../consts";
import "./EditPetForm.css"

class EditPetForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            updatedPet: {},
            updatePicture: undefined
        }
    }


    async componentDidMount() {
        let petId = this.props.match.params.id;
        let response = await api.pet.getPetById(petId);
        this.setState({
            updatedPet: response.data.currentPet,
        })
    }

    onInputChange(event, type) {
        switch(type) {
            case constants.animalInputTypes.TYPE_OF_PET: 
                this.setState({
                    updatedPet: {
                        ...this.state.updatedPet,
                        type: event.target.value
                    }
                })
                break;
            case constants.animalInputTypes.BREED: 
                this.setState({
                    updatedPet: {
                        ...this.state.updatedPet,
                        breed: event.target.value
                    }
                })
                break;
            case constants.animalInputTypes.NAME: 
                this.setState({
                    updatedPet: {
                        ...this.state.updatedPet,
                        name: event.target.value
                    }
                })
                break;
            case constants.animalInputTypes.ADOPTION_STATUS: 
                this.setState({
                    updatedPet: {
                        ...this.state.updatedPet,
                        adoptionStatus: event.target.value
                    }
                })
                break;
            case constants.animalInputTypes.COLOR: 
                this.setState({
                    updatedPet: {
                        ...this.state.updatedPet,
                        color: event.target.value
                    }
                })
                break;
            case constants.animalInputTypes.HEIGHT: 
                this.setState({
                    updatedPet: {
                        ...this.state.updatedPet,
                        height: event.target.value
                    }
                })
                break;
            case constants.animalInputTypes.WEIGHT: 
                this.setState({
                    updatedPet: {
                        ...this.state.updatedPet,
                        weight: event.target.value
                    }
                })
                break;
            case constants.animalInputTypes.DIET_RESTRICTIONS: 
                this.setState({
                    updatedPet: {
                        ...this.state.updatedPet,
                        dietRest: event.target.value
                    }
                })
                break;
            case constants.animalInputTypes.BIO: 
                this.setState({
                    updatedPet: {
                        ...this.state.updatedPet,
                        bio: event.target.value
                    }
                })
                break;
        }
    }

    onFileChange(event) {
        this.setState({
            updatedPicture: event.target.files[0]
        })
    }

    handleUpdatedPet = async (event) => {
        event.preventDefault(); 
        try {
            let data = new FormData()
            if (this.state.updatedPicture) {
                data.append('file', this.state.updatedPicture);
            }
            Object.keys(this.state.updatedPet).forEach(key => {
                data.append(key, this.state.updatedPet[key]);
            })
            let response = await api.pet.updatePet(data); 
            if (response.data.status === "success") {
            alert("Successfully updated pet profile");
            this.setState({
                updatedPet: response.data.updatedPet,
            }); 
            } else {
            alert("Unable to update pet profile");
            }
        } catch (error) {
            alert("Error in updating profile: " + error);
        }
    }

    handleisHypoAllergenicInput(event, type) {
        if(event.currentTarget.checked) {
          this.setState({
            updatedPet: {
              ...this.state.updatedPet, 
              isHypoallergenic: type 
            }
          })
        } 
      }
 
    render() {
        return(
            <Form className="form-section">            
            <Form.Label>Edit Pet</Form.Label>
            <Form.Group>
              <Form.Control type="text" 
                            placeholder="Type of pet" 
                            className="pet-info-section" 
                            onChange={(event) => this.onInputChange(event, constants.animalInputTypes.TYPE_OF_PET)}
                            value={this.state.updatedPet.type}/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" 
                            placeholder="Breed" 
                            className="pet-info-section" 
                            onChange={(event) => this.onInputChange(event, constants.animalInputTypes.BREED)}
                            value={this.state.updatedPet.breed}/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" 
                            placeholder="Name" 
                            className="pet-info-section" 
                            onChange={(event) => this.onInputChange(event, constants.animalInputTypes.NAME)}
                            value={this.state.updatedPet.name}/>
            </Form.Group>
            <Form.Group>
            {/*TODO: change type to select Available/Fostered/Adopted */}
              <Form.Control type="text" 
                            placeholder="Adoption Status" 
                            className="pet-info-section" 
                            onChange={(event) => this.onInputChange(event, constants.animalInputTypes.ADOPTION_STATUS)}
                            value={this.state.updatedPet.adoptionStatus}/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="number" 
                            placeholder="Height" 
                            className="pet-info-section" 
                            onChange={(event) => this.onInputChange(event, constants.animalInputTypes.HEIGHT)}
                            value={this.state.updatedPet.height}/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="number" 
                            placeholder="Weight" 
                            className="pet-info-section" 
                            onChange={(event) => this.onInputChange(event, constants.animalInputTypes.WEIGHT)}
                            value={this.state.updatedPet.weight}/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" 
                            placeholder="Color" 
                            className="pet-info-section" 
                            onChange={(event) => this.onInputChange(event, constants.animalInputTypes.COLOR)}
                            value={this.state.updatedPet.color}/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" 
                            placeholder="Bio" 
                            className="pet-info-section" 
                            onChange={(event) => this.onInputChange(event, constants.animalInputTypes.BIO)}
                            value={this.state.updatedPet.bio}/>
            </Form.Group>
            <Form.Group>
                <Form.Label className="sub-heading" >Hypoallergenic?</Form.Label>
                <Form.Check type="checkbox" className="checkboxes" label="True" onChange={(e) => this.handleisHypoAllergenicInput(e, constants.animalInputTypes.IS_HYPOALLERGENIC_TRUE)}/>
                <Form.Check type="checkbox" className="checkboxes" label="False" onChange={(e) => this.handleisHypoAllergenicInput(e, constants.animalInputTypes.IS_HYPOALLERGENIC_FALSE)}/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" 
                            placeholder="Diet Restrictions" 
                            className="pet-info-section" 
                            onChange={(event) => this.onInputChange(event, constants.animalInputTypes.DIET_RESTRICTIONS)}
                            value={this.state.updatedPet.dietRest}/>
            </Form.Group>
            {/* <Form.Group>
                <Form.Label className="sub-heading" >Change Picture?</Form.Label>
                <Form.Check type="checkbox" className="checkboxes" label="Yes" onChange={(e) => this.handleChangePictureInput(e, constants.animalInputTypes.CHANGE_PICTURE_TRUE)}/>
                <Form.Check type="checkbox" className="checkboxes" label="No" onChange={(e) => this.handleChangePictureInput(e, constants.animalInputTypes.CHANGE_PICTURE_FALSE)}/>
            </Form.Group> */}

            <div>
                <img src={this.state.updatedPet.picture} style={{width: "50%"}}/>
                <Form.Group>
                <Form.Control type="file" 
                                placeholder="Image" 
                                className="pet-info-section" 
                                onChange={(event) => this.onFileChange(event)}/>
                </Form.Group>
            </div>

            <Button variant="primary" type="submit" className="add-pet-button" onClick = {(event) => this.handleUpdatedPet(event)}>
              Save Pet
            </Button>
          </Form>
        )
    }
}

export default EditPetForm;