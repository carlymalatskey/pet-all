import React from "react";
import PetCard from "./../../shared/PetCard";
import { Link } from "react-router-dom";
import api from "./../../../api";

class OwnedPets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ownedPets: [],
            finishedLoadingInfo: false
        }
    }

    async componentDidMount() {
        let allPetsToFetch = [].concat(this.props.adoptedPets).concat(this.props.fosteredPets);
        let promises = Promise.all(allPetsToFetch.map(petId => api.pet.getPetById(petId)));
        promises.then(results => Promise.all(results.map(response => response.data.currentPet))).then(results => {
            this.setState({
                ownedPets: results,
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
                        {this.state.ownedPets.length == 0 ?
                            <div>
                                <div>
                                    <h1>No owned pets yet</h1>
                                    <p>When you find a pet you love, own it!</p>
                                </div>
                                <div>
                                    <Link className="find-a-pet-label" to="/search">Find a Pet</Link> 
                                </div>
                            </div>
                            :
                            <div>
                                {this.state.ownedPets.map(ownedPet => {
                                    return <PetCard pet={ownedPet} user={this.props.user}/>
                                })}
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}

export default OwnedPets;
