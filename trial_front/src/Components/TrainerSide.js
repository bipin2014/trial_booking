import React, {Component} from 'react';
import {logoutUser} from "../redux/actions/userAction";
import {connect} from "react-redux";
import jwtDecode from "jwt-decode";

class TrainerSide extends Component {
    render() {
        const handleLogout=()=>{
            console.log("Logout");
            this.props.logoutUser();
        }

        const token=localStorage.getItem("AUTH-TOKEN")
        const decodedToken = jwtDecode(token);
        return (
            <div className="sidenav">

                <a href="/tDashboard"><img className="logo" height="50px" width="50px"
                                 src="https://i.pinimg.com/originals/62/4e/30/624e30b28fa472a485e2fa8d03ea09d4.png"/></a>
                <a href={"#"}>{decodedToken.name}</a>
                <a className="con" href="/tDashboard">Home</a>
                <a className="con" href="/settings">Settings</a>
                <a className="con" href="/" onClick={handleLogout}>Logout</a>
            </div>
        );
    }
}


const mapActionToProps = {
    logoutUser
}

export default connect(null , mapActionToProps)(TrainerSide);