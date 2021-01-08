import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./ProfileSettingsPage.css"
import constants from "./../../consts";

class ProfileSettingsPage extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            updatedUser: {}
        }
    }

    componentDidMount() {
      this.setState({
        updatedUser: this.props.user
      })
    }

    componentWillReceiveProps(newProps) {
      if (newProps.user) {
        this.setState({
          updatedUser: newProps.user
        })
      }
    }

    onUpdateUserInfo(event) {
        event.preventDefault(); 
        this.props.handleUpdateUserProfile(this.state.updatedUser);
    }

    onInputChange(event, type) {
        switch (type) {
          case constants.userInputTypes.EMAIL:
            this.setState({
              updatedUser: {
                ...this.state.updatedUser,
                email: event.target.value
              }
            })
            break;
          case constants.userInputTypes.DISPLAYNAME:
            this.setState({
                updatedUser: {
                    ...this.state.updatedUser,
                displayName: event.target.value
              }
            })
            break;
          case constants.userInputTypes.PHONE_NUMBER:
            this.setState({
                updatedUser: {
                    ...this.state.updatedUser,
                phoneNumber: event.target.value
              }
            })
            break;
          case constants.userInputTypes.PASSWORD:
            this.setState({
                updatedUser: {
                    ...this.state.updatedUser,
                password1: event.target.value
              }
            })
            break;
        case constants.userInputTypes.BIO:
            this.setState({
                updatedUser: {
                    ...this.state.updatedUser,
                bio: event.target.value
                }
            })
            break;
        default:
            break;
        }
      }


    render() {
      if (this.state.updatedUser) {
        return (
          <Form className="form-section">            
            <Form.Label>Update My Account!</Form.Label>
            <Form.Group>
              <Form.Control type="email" 
                            placeholder="Enter Email" 
                            className="entry-info-section" 
                            onChange={(event) => this.onInputChange(event, constants.userInputTypes.EMAIL)}
                            value={this.state.updatedUser.email}/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" 
                            placeholder="Full Name" 
                            className="entry-info-section"
                            onChange={(event) => this.onInputChange(event, constants.userInputTypes.DISPLAYNAME)}
                            value={this.state.updatedUser.displayName}/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="number" 
                            placeholder="Phone Number" 
                            className="entry-info-section"
                            onChange={(event) => this.onInputChange(event, constants.userInputTypes.PHONE_NUMBER)}
                            value={this.state.updatedUser.phoneNumber}/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="password" 
                            placeholder="Enter Password" 
                            className="entry-info-section"
                            onChange={(event) => this.onInputChange(event, constants.userInputTypes.PASSWORD)}
                            value={this.state.updatedUser.password1}/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" 
                            id="short-bio" 
                            placeholder="Short Bio..." 
                            className="entry-info-section"
                            onChange={(event) => this.onInputChange(event, constants.userInputTypes.BIO)}
                            value={this.state.updatedUser.bio}/>
            </Form.Group>
            <Button variant="primary" type="submit" className="update-profile-button" onClick = {(event) => this.onUpdateUserInfo(event)}>
              Update my Profile
            </Button>
          </Form>
        )
      } else {
        return (<div>Not loaded yet</div>)
      }
    }
}

export default ProfileSettingsPage; 