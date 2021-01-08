import React from "react";
import Modal from "react-modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./../Modal.css";
import api from "../../../../../api";

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: ''
    }
  }

  componentDidMount() {
    Modal.setAppElement('body'); 
  }


  onInputChange(event, type) {
      switch(type) {
        case "email":
          this.setState({
            email: event.target.value
          }
        )
        break;
        case "password":
          this.setState({
              password: event.target.value
            }
          )
          break;
      }
  }

  async handleLogin(event) {
    event.preventDefault();
    let response = await api.authentication.login(this.state.email, this.state.password);
    if (response.data.status === "success") {
      this.props.handleLoggedIn(); 
    } else {
      alert("bad credentials, try again");
    }
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.showModal} portalClassName="modal">
          <Form>
            <Form.Label>Sign In</Form.Label>
            <Form.Group>
              <Form.Control type="email" 
                            placeholder="Enter Email" 
                            className="entry-info-section"
                            onChange={(event) => this.onInputChange(event, "email")}
                            value={this.state.email}/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="password" 
                            placeholder="Enter Password" 
                            className="entry-info-section"
                            onChange={(event) => this.onInputChange(event, "password")}
                            value={this.state.password}/>
            </Form.Group>
            <Button variant="primary" type="submit" className="entry-button" onClick={(event) => this.handleLogin(event)}>
              Login
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default LoginModal;
