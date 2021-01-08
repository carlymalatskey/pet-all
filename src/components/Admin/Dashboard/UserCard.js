import React from "react"; 
import Card from "react-bootstrap/Card";
import Collapse from 'react-bootstrap/Collapse'
import Button from "react-bootstrap/Button";
import "./UserCard.css";
import { Link } from "react-router-dom";

class UserCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    renderPets (pets) {
        return (
        <div>
            {pets.length > 0 ?
                pets.map(pet => {
                    return <Link to={`/petpage/${pet.id}`} className="pet-name">{pet.name}</Link>
                })
                :
                <div>None</div>
            }
        </div>)
    }

    render () {
        return (
            <div>
                <Card className="user-card" onClick={() => this.setState({open: !this.state.open})}> 
                        <Card.Body>
                            <Card.Title className="user-name">{this.props.user.displayName}</Card.Title>
                            <Card.Text>
                                {`Email: ${this.props.user.email}`}
                                {/* TODO: indicate whether admin or user */}
                                {/* {this.props.isAdmin ? "Admin" : "User"} */}
                            </Card.Text>  
                    {this.state.open && 
                        <div id="example-collapse-text">
                            <div>
                                {`Phone Number: ${this.props.user.phoneNumber}`}
                            </div>
                            <div>
                                {`Adopted Pets:` }
                                {this.renderPets(this.props.user.adoptedPets)}
                            </div>
                            <div>
                                {`Fostered Pets:` }
                                {this.renderPets(this.props.user.fosteredPets)}
                            </div>
                            <div>
                                {`Saved Pets:` }
                                {this.renderPets(this.props.user.savedPets)}
                            </div>
                        </div>
                    }
                        </Card.Body>
                </Card>
            </div>
        
        );
    }
}



export default UserCard; 