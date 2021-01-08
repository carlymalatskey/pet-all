import React from "react"; 
import UserCard from "./UserCard";
import api from "../../../api";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: undefined
        }
    }

   async componentDidMount() {
        let response = await api.admin.getAllUsers();
        this.setState({ 
            allUsers: response.data.users
        })
    }
    render() {
        return (
            <div>
                <div>
                    Users
                </div>
                {this.state.allUsers && 
                    <div>
                        {this.state.allUsers.map(user => {
                            return <UserCard user={user} />
                        })}
                    </div>
                }
            </div>
        )
    }
}

export default Dashboard; 