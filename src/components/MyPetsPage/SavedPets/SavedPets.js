import React from "react";
import PetCard from "./../../shared/PetCard";
import api from "./../../../api";
import { Link } from "react-router-dom";

class SavedPets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            savedPets: [],
            finishedLoadingInfo: false
        }
    }

    async componentDidMount() {
        let promises = Promise.all(this.props.savedPets.map(petId => api.pet.getPetById(petId)));
        promises.then(results => Promise.all(results.map(response => response.data.currentPet))).then(results => {
            this.setState({
                savedPets: results,
                finishedLoadingInfo: true
        })})
    }

    render() {
        return(
            <div>
                {!this.state.finishedLoadingInfo ? 
                    <div>WAIT! LOADING!</div>
                    :
                    <div>
                        {this.state.savedPets.length == 0 ?
                            <div>
                                <div>
                                    <h1>No favorites here yet</h1>
                                    <p>When you find a pet you love, add it to you favorites list</p>
                                </div>
                                <div>
                                    <Link className="find-a-pet-label" to="/search">Find a Pet</Link> 
                                </div>
                            </div>
                            :
                            <div>
                                {this.state.savedPets.map(savedPet => {
                                    return <PetCard pet={savedPet} user={this.props.user}/>
                                })}
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}

export default SavedPets;
