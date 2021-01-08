import React from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faCat } from '@fortawesome/free-solid-svg-icons';
import "./../SearchPage/BasicSearch.css"
import consts from "./../../consts";
import api from "./../../api";

class BasicSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typeToFind: ""
        }
    }

    async handleSearch(event) {
        event.preventDefault();
        let results = await api.search.findAll('', this.state.typeToFind, '', '', '');
        let pets = results.data.pets;
        this.props.handlePetsFound(pets);
    }

    render() {
        return (
            <div>
                <div className="basic-search-section">
                    <div>
                        <p className="basic-search-title">By Animal:</p>
                        <Button variant="primary" type="button" className={this.state.typeToFind == consts.animalTypes.DOG ? "selected-button" : "find-by-animal-button"} onClick={() => this.setState({typeToFind: consts.animalTypes.DOG})}>
                            <FontAwesomeIcon className="animal-icon" icon={faDog}/>
                            Find a dog
                        </Button>
                        <Button variant="primary" type="submit" className={this.state.typeToFind == consts.animalTypes.CAT ? "selected-button" : "find-by-animal-button"} onClick={() => this.setState({typeToFind: consts.animalTypes.CAT})}>
                            <FontAwesomeIcon className="animal-icon" icon={faCat}/>
                            Find a cat
                        </Button>
                    </div>
                </div>
                <Button className="basic-search-button" onClick={(e) => this.handleSearch(e)}>Search</Button>
            </div>
        )
    }
}

export default BasicSearch; 