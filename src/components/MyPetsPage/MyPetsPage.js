import React from "react";
import "./../MyPetsPage/MyPetsPage.css";
import SavedPets from "./SavedPets/SavedPets";
import OwnedPets from "./OwnedPets/OwnedPets";
import Button from "react-bootstrap/esm/Button";
import api from "./../../api";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from 'react-bootstrap/ToggleButton'

class MyPetsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ownedPets: {
                fosteredPets: [],
                adoptedPets: []
            },
            savedPets: [],
            showSaved: true,
            finishedLoadingInfo: false,
            context: "favorites"
        }
    }

    async componentDidMount() {
        let userId = this.props.user.id; 
        let response = await api.user.getPets(userId);
        this.setState({
            ownedPets: {
                fosteredPets: response.data.fosteredPets,
                adoptedPets: response.data.adoptedPets
            },
            savedPets: response.data.savedPets,
            finishedLoadingInfo: true
        })
    }

    handleContextChange = (e) => {
        let newContext = e.target.value;
        this.setState({
            context: newContext
        })
    }

    render() {
        return (
            <div>
                {this.state.finishedLoadingInfo && 
                    <div>
                        <Button
                            type="submit"
                            onClick={(e) => this.setState({context: "favorites"})}
                            className={this.state.context === "favorites" ? "selected-btn" : "unselected-buttons"}
                        >Favorite Pets</Button>
                        <Button
                            type="submit"
                            onClick={(e) => this.setState({context: "ownedpets"})} 
                            className={this.state.context !== "favorites" ? "selected-btn" : "unselected-buttons"}
                        >Owned Pets</Button>
                        {this.state.context === 'favorites' ? 
                            <SavedPets savedPets={this.state.savedPets} user={this.props.user}/>
                            :
                            <OwnedPets fosteredPets={this.state.ownedPets.fosteredPets} adoptedPets={this.state.ownedPets.adoptedPets} user={this.props.user}/>
                        }
                    </div>
                }
        </div>
        )
    }
}

export default MyPetsPage; 