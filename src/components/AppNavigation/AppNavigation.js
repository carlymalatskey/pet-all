import React from "react";
import "./AppNavigation.css"
import { Link } from "react-router-dom";
import Logo from "./../../assets/Logo2.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faUserAlt, faHeart, faUserShield } from '@fortawesome/free-solid-svg-icons';
import Image from "react-bootstrap/Image";
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav';
import Button from "react-bootstrap/Button";

class AppNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  
  render() {
    const { isSignedIn } = this.props; 
    return (
      <Nav className="navbar-header-content">
          <div className="left-header-section">
            <Image src={Logo} className="logo-image" fluid/>
            <div className="left-header-labels">
                <Link className="nav-bar-labels" to="/home"><FontAwesomeIcon className="navbar-icons" icon={faPaw}/>Home</Link>
                <Link className="nav-bar-labels" to="/search"><FontAwesomeIcon className="navbar-icons" icon={faPaw}/>Search</Link>
            </div>
          </div>
          {isSignedIn &&
             <div className="right-side-navbar">
                <Link className="heart-label" to="/mypets"><FontAwesomeIcon className="heart-navbar-icon" icon={faHeart}/></Link>
                <div>
                  {isSignedIn && this.props.user.isAdmin && <FontAwesomeIcon className="navbar-icons user-admin-icon" icon={faUserShield}/>}
                </div>
                <NavDropdown title={<div className="username-label" ><FontAwesomeIcon className="navbar-icons" icon={faUserAlt}/>{this.props.user.displayName}</div>}>
                  <div className="dropdown-section">
                      <NavDropdown.Item className="dropdown-labels">
                          <Button
                            className="dropdown-labels" 
                            activeClassName="selected"
                            onClick={this.props.signOut}
                          > Sign Out
                          </Button>
                      </NavDropdown.Item>
                      <NavDropdown.Item className="dropdown-labels">
                          <Link 
                          className="dropdown-labels" 
                          activeClassName="selected" 
                          to="/profile-settings">
                          Profile Settings
                          </Link>
                      </NavDropdown.Item>
                      {this.props.user.isAdmin &&
                        <div className="admin-labels">
                          <NavDropdown.Item className="dropdown-labels">
                              <Link 
                                className="dropdown-labels" 
                                activeClassName="selected" 
                                to="/add-pet">
                                Add a Pet
                              </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item className="dropdown-labels">
                            <Link 
                              className="dropdown-labels" 
                              activeClassName="selected" 
                              to="/dashboard">
                              Dashboard
                            </Link>
                        </NavDropdown.Item>
                      </div>
                      }
                  </div>
                </NavDropdown>
            </div>
          }
      </Nav>
    );
  }
}

export default AppNavigation;
