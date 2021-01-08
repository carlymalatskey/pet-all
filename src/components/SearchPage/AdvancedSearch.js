import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./../SearchPage/AdvancedSearch.css";
import api from "./../../api";
import consts from "./../../consts";

class AdvancedSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            height: '',
            adoptionStatus: [],
            weight: '',
            type: ''
        }
        this.handleClear = this.handleClear.bind(this);
    }

    handleClear(event) {
        event.preventDefault(); 
        this.setState({
            isChecked: false,
            name: ''
        });
    }

    handleNameInput(event) {
        event.preventDefault(); 
        this.setState({
            name: event.target.value
        })
    }

    handleHeightInput(event) {
        event.preventDefault(); 
        this.setState({
            height: event.target.value
        })
    }

    handleWeightInput(event) {
        event.preventDefault(); 
        this.setState({
            weight: event.target.value
        })
    }

    async handleSearch(event) {
        event.preventDefault();
        let { adoptionStatus, type, height, weight, name } = this.state;
        let results = await api.search.findAll(adoptionStatus, type, height, weight, name);
        let pets = results.data.pets;
        this.props.handlePetsFound(pets);
    }

    handleAdoptionStatusInput(event, type) {
        if (event.currentTarget.checked) {
            this.setState({
                adoptionStatus: this.state.adoptionStatus.concat(type)
            });
        } else {
            this.setState({
                adoptionStatus: this.state.adoptionStatus.filter(status => status !== type)
            })
        }
    }

    handleAnimalTypeInput(event, type) {
        // TODO: handle single select in UI
        if (event.currentTarget.checked) {
            this.setState({
                type: type
            });
        } else {
            this.setState({
                type: ''
            })
        }
    }
    
    render() {
        console.log(this.state.type);
        return (
            <div className="adv-search-section-with-button">
                <div className="advanced-search-section">
                    <Form className="individual-adv-search-sections">            
                        <Form.Label className="advanced-search-titles">Height</Form.Label>
                        <Form.Group>
                            <Form.Control 
                                type="text" 
                                className="adv-search-name-input"
                                value ={this.state.height}
                                onChange={(event) => this.handleHeightInput(event)}/>
                        </Form.Group>         
                        <Form.Label className="advanced-search-titles">Weight</Form.Label>
                        <Form.Group>
                            <Form.Control 
                                type="text" 
                                className="adv-search-name-input"
                                value ={this.state.weight}
                                onChange={(event) => this.handleWeightInput(event)}/>
                        </Form.Group>
                    </Form>
                    <Form className="individual-adv-search-sections">            
                        <Form.Label className="advanced-search-titles">Status</Form.Label>
                        <Form.Group className="advanced-search-page-checkboxes">
                            <Form.Check type="checkbox" className="advanced-search-options" label="Available" onChange={(e) => this.handleAdoptionStatusInput(e, consts.adoptionStatusTypes.AVAILABLE)}/>
                            <Form.Check type="checkbox" className="advanced-search-options" label="Adopted" onChange={(e) => this.handleAdoptionStatusInput(e, consts.adoptionStatusTypes.ADOPTED)}/>
                            <Form.Check type="checkbox" className="advanced-search-options" label="Fostered" onChange={(e) => this.handleAdoptionStatusInput(e, consts.adoptionStatusTypes.FOSTERED)}/>
                        </Form.Group>
                    </Form>
                    <Form className="individual-adv-search-sections">             
                        <Form.Label className="advanced-search-titles">Type</Form.Label>
                        <Form.Group className="advanced-search-page-checkboxes">
                            <Form.Check type="checkbox" className="advanced-search-options" label="Dog" onChange={(e) => this.handleAnimalTypeInput(e, consts.animalTypes.DOG)}/>
                            <Form.Check type="checkbox" className="advanced-search-options" label="Cat" onChange={(e) => this.handleAnimalTypeInput(e, consts.animalTypes.CAT)}/>
                        </Form.Group>
                    </Form>
                    <Form className="individual-adv-search-sections">             
                        <Form.Label className="advanced-search-titles">Name</Form.Label>
                        <Form.Group>
                            <Form.Control 
                                type="text" 
                                className="adv-search-name-input"
                                value ={this.state.name}
                                onChange={(event) => this.handleNameInput(event)}/>
                        </Form.Group>
                        <Button className="search-button" onClick={(e) => this.handleSearch(e)}>SEARCH</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default AdvancedSearch; 