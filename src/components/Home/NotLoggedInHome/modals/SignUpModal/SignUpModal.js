import React from "react";
import Modal from "react-modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./../Modal.css"

class SignUpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: {
        email: '',
        displayName: '',
        phoneNumber: '',
        password1: '',
        password2: '', 
      }
    }
  }

  componentDidMount() {
    Modal.setAppElement('body'); 
  }

  onInputChange(event, type) {
    switch (type) {
      case "email":
        this.setState({
          newUser: {
            ...this.state.newUser,
            email: event.target.value
          }
        })
        break;
      case "full-name-text":
        this.setState({
          newUser: {
            ...this.state.newUser,
            displayName: event.target.value
          }
        })
        break;
      case "number":
        this.setState({
          newUser: {
            ...this.state.newUser,
            phoneNumber: event.target.value
          }
        })
        break;
      case "passwordOne":
        this.setState({
          newUser: {
            ...this.state.newUser,
            password1: event.target.value
          }
        })
        break;
      case "passwordTwo":
        this.setState({
          newUser: {
            ...this.state.newUser,
            password2: event.target.value
          }
        })
        break;
      default:
        break;
    }
  }

  async handleSignUpSubmit(event) {
    event.preventDefault();
    if (this.state.newUser.password1 === this.state.newUser.password2) {
      this.props.handleSignedUp(this.state.newUser);
    } else {
      alert("Passwords don't match!");
    }
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.showModal} portalClassName="modal">
          <Form className="form-section">            
            <Form.Label>Create An Account!</Form.Label>
            <Form.Group>
              <Form.Control type="email" 
                            placeholder="Enter Email" 
                            className="entry-info-section" 
                            onChange={(event) => this.onInputChange(event, "email")}
                            value={this.state.newUser.email}
                            required/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" 
                            placeholder="Full Name" 
                            className="entry-info-section"
                            onChange={(event) => this.onInputChange(event, "full-name-text")}
                            value={this.state.newUser.displayName}
                            required/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="number" 
                            placeholder="Phone Number" 
                            className="entry-info-section"
                            onChange={(event) => this.onInputChange(event, "number")}
                            value={this.state.newUser.phoneNumber}
                            required/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="password" 
                            placeholder="Enter Password" 
                            className="entry-info-section"
                            onChange={(event) => this.onInputChange(event, "passwordOne")}
                            value={this.state.newUser.password1}
                            required/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="password" 
                            id="confirm-password" 
                            placeholder="Confirm Password" 
                            className="entry-info-section"
                            onChange={(event) => this.onInputChange(event, "passwordTwo")}
                            value={this.state.newUser.password2}
                            required/>
            </Form.Group>
            <Button variant="primary" type="submit" className="entry-button" onClick = {(event) => this.handleSignUpSubmit(event)}>
              Join Today
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default SignUpModal;
