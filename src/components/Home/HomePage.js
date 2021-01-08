import React, { Component } from "react";
import "./HomePage.css";
import PetDetailsPage from "./../../components/PetDetails/PetDetailsPage";
import MyPetsPage from "./../MyPetsPage/MyPetsPage";
import AppNavigation from "../AppNavigation/AppNavigation";
import ProfileSettingsPage from "./../../components/ProfileSettings/ProfileSettingsPage";
import SearchPage from "./../../components/SearchPage/SearchPage";
import {} from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import NotLoggedInHome from "./NotLoggedInHome/NotLoggedInHome";
import LoggedInHome from "./LoggedInHome/LoggedInHome";
import Cookies from "universal-cookie";
import api from "../../api";
import AddPetForm from "./../Admin/AddPetForm";
import EditPetForm from "./../Admin/EditPetForm/EditPetForm"
import Dashboard from "../Admin/Dashboard/Dashboard";

const cookies = new Cookies();

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { //TODO: consider what to do with user
      isSignedIn: false,
      user: undefined
    };
  }

  async componentDidMount() {
    let userId = cookies.get('petAdoptionUserId');
    let user = await api.user.getUserDetails(userId);
    if (userId) {
      this.setState({
        isSignedIn: true,
        user: user.data.user
      })
    }
  }

  handleUpdateUserProfile = async (updatedUser) => {
    try {
      let response = await api.user.updateUser(updatedUser); 
      if (response.data.status === "success") {
        alert("Successfully updated profile");
        this.setState({
          user: response.data.updatedUser,
          isSignedIn: true
        }); 
    } else {
      alert("Unable to update profile");
    }
  } catch (error) {
    alert("Error in updating profile: " + error);
  }
}

  handleSignUp = async (newUser) => {
    try{
      let response = await api.authentication.signUp(newUser);
      if (response.data.status === "success") {
        alert("Successfully signed up");
        this.setState({
          user: response.data.user,
          isSignedIn: true
        }); 
      } else {
        alert(response.data.error.message);
      }
    } catch (error) {
      alert("Error in signing up: " + error);
    } 
  }

  handleLoggedIn = async () => {
    let userId = cookies.get('petAdoptionUserId');
    if (userId) {
      let user = await api.user.getUserDetails(userId);
      this.setState({
        user: user.data.user,
        isSignedIn: true
      })
    }
  }

  handleSignOut = async () => {
    try {
      let response = await api.authentication.signOut(); 
      if (response.data.status === "success") {
        alert("Successfully signed out");
        this.setState({
          user: undefined,
          isSignedIn: false
        });
      } else {
        alert("Unable to sign out");
      }
    } catch (error) {
      alert("Error in signing out: " + error)
    }
  }

  handleAddPet = async (newPet, picture) => {
    try {
      let data = new FormData()
      data.append('file', picture);
      Object.keys(newPet).forEach(key => {
        data.append(key, newPet[key]);
      })
      let response = await api.admin.addPet(data);
      if (response.data.status === "success") {
        alert("Successfully added a pet");
        this.setState({
          pet: response.data.pet,
        }); 
      } else {
        alert("Unable to add pet");
      }
    } catch (error) {
      alert("Error in adding a pet: " + error);
    } 
  }

  handleUpdatedPet = async (updatedPet) => {
    try {
      let response = await api.pet.updatePet(updatedPet); 
      if (response.data.status === "success") {
        alert("Successfully updated profile");
        this.setState({
          pet: response.data.updatedPet,
          isSignedIn: true
        }); 
      } else {
        alert("Unable to update profile");
      }
    } catch (error) {
      alert("Error in updating profile: " + error);
    }
  }

  render() {
    return (
      <Router>
        <AppNavigation isSignedIn={this.state.isSignedIn} user={this.state.user} signOut={() => this.handleSignOut()}/>
        <div className="website-section">
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/home" render={props => this.state.isSignedIn ? <LoggedInHome {...props} user={this.state.user}/> : <NotLoggedInHome {...props} signedUp={(newUser) => this.handleSignUp(newUser)} loggedIn={() => this.handleLoggedIn()}/>}/>
            <Route path="/search">
              <SearchPage user={this.state.user} />
            </Route>
            <Route path="/profile-settings">
              <ProfileSettingsPage user={this.state.user} handleUpdateUserProfile={this.handleUpdateUserProfile}></ProfileSettingsPage>
            </Route>
            <Route path="/mypets" render={props => this.state.isSignedIn ? <MyPetsPage {...props} user={this.state.user}/> : <NotLoggedInHome {...props} signedUp={(newUser) => this.handleSignUp(newUser)} loggedIn={() => this.handleLoggedIn()}/>}/>
            <Route path="/petpage/:id" render={(props) => <PetDetailsPage {...props} user={this.state.user} editPet={() => this.handleEditPet()}/>}/>
            <Route path="/add-pet">
              <AddPetForm user={this.state.user} handleAddPet={(newPet, picture) => this.handleAddPet(newPet, picture)}/>
            </Route>
            <Route path="/dashboard">
              <Dashboard user={this.state.user} />
            </Route>
            <Route path="/editPet/:id" render={(props) => <EditPetForm {...props}/>}>
            </Route>
          </Switch> 
        </div>
      </Router>
    );
  }
}

export default HomePage;
