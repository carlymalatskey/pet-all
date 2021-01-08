import React from "react"; 
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./AddPetForm.css"
import constants from "./../../consts";
import api from "./../../api";

class AddPetForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newPet: {
            },
            picture: undefined,
            isHypoallergenicChecked: true
        }
    }

    onInputChange(event, type) {
        switch(type) {
            case constants.animalInputTypes.TYPE_OF_PET: 
              this.setState({
                  newPet: {
                    ...this.state.newPet,
                    type: event.target.value
                  }
                })
                break;
            case constants.animalInputTypes.NAME: 
              this.setState({
                  newPet: {
                  ...this.state.newPet,
                  name: event.target.value
                  }
              })
              break;
            case constants.animalInputTypes.COLOR: 
              this.setState({
                  newPet: {
                  ...this.state.newPet,
                  color: event.target.value
                  }
              })
              break;
            case constants.animalInputTypes.BREED:
              this.setState({
                newPet: {
                  ...this.state.newPet,
                  breed: event.target.value
                }
              })
              break;
            case constants.animalInputTypes.HEIGHT:
              this.setState({
                newPet: {
                  ...this.state.newPet,
                  height: event.target.value
                }
              })
              break;
            case constants.animalInputTypes.WEIGHT:
              this.setState({
                newPet: {
                  ...this.state.newPet,
                  weight: event.target.value
                }
              })
              break;
            case constants.animalInputTypes.ADOPTION_STATUS:
              this.setState({
                  newPet: {
                    ...this.state.newPet,
                    adoptionStatus: event.target.value
                  }
              })
              break;
            case constants.animalInputTypes.NAME:
                this.setState({
                    newPet: {
                      ...this.state.newPet,
                      color: event.target.value
                    }
                });
              break;
            case constants.animalInputTypes.BIO:
                this.setState({
                    newPet: {
                    ...this.state.newPet,
                    bio: event.target.value
                    }
                });
              break;
            case constants.animalInputTypes.DIET_RESTRICTIONS:
                this.setState({
                    newPet: {
                    ...this.state.newPet,
                    dietRest: event.target.value
                    }
                });
              break;
            default:
              break;
          }
        }

      handleAddPetSubmit = async (event) => {
        event.preventDefault(); 
          try {
            let data = new FormData()
            data.append('file', this.state.picture);
            Object.keys(this.state.newPet).forEach(key => {
              data.append(key, this.state.newPet[key]);
            })
            let response = await api.admin.addPet(data);
            if (response.data.status === "success") {
              alert("Successfully added a pet");
              this.setState({
                pet: response.data.pet,
              }); 
            } else {
              alert("Unable to add pet");
            }
          } catch (error) {
            alert("Error in adding a pet: " + error);
          } 
        }
      
       onFileChange(event) {
        this.setState({
            picture: event.target.files[0]
        });
      }

      handleisHypoAllergenicInput(event, type) {
        if(event.currentTarget.checked) {
          this.setState({
            newPet: {
              ...this.state.newPet, 
              isHypoallergenic: type 
            },
          })
        }
      }

    render() {
        return (
            <Form className="form-section">            
            <Form.Label>Add a Pet</Form.Label>
            <Form.Group>
              <Form.Control type="text" 
                            placeholder="Type of pet" 
                            className="pet-info-section" 
                            onChange={(event) => this.onInputChange(event, constants.animalInputTypes.TYPE_OF_PET)}
                            value={this.state.newPet.type}/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" 
                            placeholder="Breed" 
                            className="pet-info-section" 
                            onChange={(event) => this.onInputChange(event, constants.animalInputTypes.BREED)}
                            value={this.state.newPet.breed}/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" 
                            placeholder="Name" 
                            className="pet-info-section" 
                            onChange={(event) => this.onInputChange(event, constants.animalInputTypes.NAME)}
                            value={this.state.newPet.name}/>
            </Form.Group>
            <Form.Group>
            {/*TODO: change type to select Available/Fostered/Adopted */}
              <Form.Control type="text" 
                            placeholder="Adoption Status" 
                            className="pet-info-section" 
                            onChange={(event) => this.onInputChange(event, constants.animalInputTypes.ADOPTION_STATUS)}
                            value={this.state.newPet.adoptionStatus}/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="number" 
                            placeholder="Height" 
                            className="pet-info-section" 
                            onChange={(event) => this.onInputChange(event, constants.animalInputTypes.HEIGHT)}
                            value={this.state.newPet.height}/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="number" 
                            placeholder="Weight" 
                            className="pet-info-section" 
                            onChange={(event) => this.onInputChange(event, constants.animalInputTypes.WEIGHT)}
                            value={this.state.newPet.weight}/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" 
                            placeholder="Color" 
                            className="pet-info-section" 
                            onChange={(event) => this.onInputChange(event, constants.animalInputTypes.COLOR)}
                            value={this.state.newPet.color}/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" 
                            placeholder="Bio" 
                            className="pet-info-section" 
                            onChange={(event) => this.onInputChange(event, constants.animalInputTypes.BIO)}
                            value={this.state.newPet.bio}/>
            </Form.Group>
            <Form.Group>
                <Form.Label className="sub-heading" >Hypoallergenic?</Form.Label>
                <Form.Check type="checkbox" 
                            className="checkboxes" 
                            label="True" 
                            onChange={(e) => this.handleisHypoAllergenicInput(e, constants.animalInputTypes.IS_HYPOALLERGENIC_TRUE)}
                            onClick={this.setState({isHypoallergenicCheck: !this.state.isHypoallergenicCheck})}/>
                <Form.Check type="checkbox" 
                            className="checkboxes" 
                            label="False" 
                            onChange={(e) => this.handleisHypoAllergenicInput(e, constants.animalInputTypes.IS_HYPOALLERGENIC_FALSE)}
                            onClick={this.setState({isHypoallergenicCheck: !this.state.isHypoallergenicCheck})}/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" 
                            placeholder="Diet Restrictions" 
                            className="pet-info-section" 
                            onChange={(event) => this.onInputChange(event, constants.animalInputTypes.DIET_RESTRICTIONS)}
                            value={this.state.newPet.dietRest}/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="file" 
                            placeholder="Image" 
                            className="pet-info-section" 
                            onChange={(event) => this.onFileChange(event)}
                            />
            </Form.Group>
            <Button variant="primary" type="submit" className="add-pet-button" onClick = {(event) => this.handleAddPetSubmit(event)}>
              Add a pet
            </Button>
          </Form>
        )
    }
}


export default AddPetForm; 