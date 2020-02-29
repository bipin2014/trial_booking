import React, { Component } from 'react'
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userAction';
class NavBar extends Component {
    render() {
        const handleLogout=()=>{
            console.log("Logout");
            this.props.logoutUser();
        }
        return (
            <div className="sidenav">
                <a href="/"><img class="logo" height="50px" width="50px" src="https://i.pinimg.com/originals/62/4e/30/624e30b28fa472a485e2fa8d03ea09d4.png"/></a>
                <a class="con" href="/Dashboard">Home</a>
                <a class="con" href="/Center">Center</a>
                <a class="con" href="/" onClick={handleLogout}>Logout</a>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    credentials: state.user.credentials
});

const mapActionToProps = {
    logoutUser
}

export default connect(mapStateToProps, mapActionToProps)(NavBar);

