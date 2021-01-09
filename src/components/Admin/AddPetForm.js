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
              type: "",
              name: "",
              color: "",
              breed: "",
              height: 0,
              weight: 0,
              adoptionStatus: "available",
              color: "",
              isHypoallergenic: true,
              bio: "",
              dietRest: []
            },
            picture: undefined
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
            case constants.animalInputTypes.NAME:
                this.setState({
                    newPet: {
                      ...this.state.newPet,
                      color: event.target.value
                    }
                });
              break;
            case constants.animalInputTypes.IS_HYPOALLERGENIC: 
              this.setState({
                  newPet: {
                      ...this.state.newPet,
                      isHypoallergenic: event.target.value == "0" ? true : false
                  }
              })
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

        handleAdoptionStatusInput(event) {
          this.setState({
            newPet: {
              ...this.state.newPet,
              adoptionStatus: event.target.value
            }
          })
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
              window.location.reload();
            } else {
              alert(`${response.data.message}`);
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
                <Form.Label className="sub-heading" >Adoption Status?</Form.Label>
                  <Form.Control as="select" onChange={(event) => this.handleAdoptionStatusInput(event)}>
                      <option value={constants.adoptionStatusTypes.AVAILABLE}>Available</option>
                      <option value={constants.adoptionStatusTypes.FOSTERED}>Fostered</option>
                      <option value={constants.adoptionStatusTypes.ADOPTED}>Adopted</option>
                  </Form.Control> 
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
                <Form.Control as="select" onChange={(event) => this.onInputChange(event, constants.animalInputTypes.IS_HYPOALLERGENIC)}>
                    <option value={"0"}>Yes</option>
                    <option value={"1"}>No</option>
                </Form.Control> 
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