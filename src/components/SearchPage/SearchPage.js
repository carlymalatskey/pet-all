import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./SearchPage.css"
import BasicSearch from "./BasicSearch"
import AdvancedSearch from "./AdvancedSearch";
import PetCard from "../shared/PetCard";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '', 
      isBasicChecked: true,
      isAdvancedChecked: false,
      petsFound: []
    }
    this.handleBasicCheckBox = this.handleBasicCheckBox.bind(this);
    this.handleAdvancedCheckBox = this.handleAdvancedCheckBox.bind(this);
  }

  handleBasicCheckBox() {
    this.setState({
      isBasicChecked: !this.state.isBasicChecked,
      isAdvancedChecked: this.state.isBasicChecked ? this.state.isAdvancedChecked : false
    });
  }

  handleAdvancedCheckBox() {
    this.setState({
      isAdvancedChecked: !this.isAdvancedChecked,
      isBasicChecked: this.state.isAdvancedChecked ? this.state.isBasicChecked : false
    });
  }
  
  handlePetsFound(petsFound) {
    this.setState({
      petsFound
    })
  }

  render() {
    return (
      <div>
          <div className="search-overall-section">
          <p>Find your Furry Friend</p>
          <Form className="search-input-section">            
              <Form.Group controlId="formBasicCheckbox" className="search-page-checkboxes">
                <Form.Check type="checkbox" label="Basic Search"  checked={this.state.isBasicChecked} onChange={this.handleBasicCheckBox}/>
                <Form.Check type="checkbox" label="Advanced Search" checked={this.state.isAdvancedChecked} onChange={this.handleAdvancedCheckBox}/>
              </Form.Group>
          </Form>
          {this.state.isBasicChecked && 
            <BasicSearch handlePetsFound={(petsFound) => this.handlePetsFound(petsFound)}/>
          }
          {this.state.isAdvancedChecked && 
            <AdvancedSearch handlePetsFound={(petsFound) => this.handlePetsFound(petsFound)}/>
          }
          Pets Found: {this.state.petsFound.length}
        </div>
        <div className="pet-cards-results-section">
          {this.state.petsFound.map(pet => {
            return <PetCard pet={pet} user={this.props.user}/>
          })}
        </div>
      </div>
    );
  }
}
export default SearchPage;
