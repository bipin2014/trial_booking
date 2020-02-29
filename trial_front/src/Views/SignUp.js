import React, { Component } from 'react'
import NavBar from "../Components/NavBar";
import axios from 'axios'
export default class SignUp extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        cpassword: "",
        usertype: ""

    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    render() {
        const handleSubmit = (event) => {
            event.preventDefault();
            let userDetail = {
                "name": this.state.name,
                "email": this.state.email,
                "password": this.state.password,
                "confirmPassword": this.state.cpassword,
            }


            console.log(userDetail);
            if (this.state.usertype === "user") {
                console.log("user");
                

                axios.post('/user/signup', userDetail).then(res => {
                    console.log(res.data);
                    if (res.data.error) {
                        throw Error(res.data.error)
                    } else {
                        console.log(res.data);
                        this.props.history.push('/');
                    }

                }).catch(err => {
                    console.log(err);

                })

            } else if (this.state.usertype === "tc") {
                console.log("TC");
                
                axios.post('/tc/signup', userDetail).then(res => {
                    console.log(res.data);
                    if (res.data.error) {
                        throw Error("Error")
                    } else {
                        console.log(res.data);
                        this.props.history.push('/trainerlogin');
                        
                    }

                }).catch(err => {
                    console.log("error");

                })
            }
        }
        return (
            <>   <NavBar />
                <link href="https://fonts.googleapis.com/css?family=Lobster&display=swap" rel="stylesheet"/>
                <body>
                    <form class="signup" onSubmit={handleSubmit}>
                        <h2 align="center">Sign Up Form</h2>
                        <div className="container">
                            <label htmlFor="email">E-Mail</label><br />
                            <input type="text" placeholder="Enter E-Mail" name="email" onChange={this.handleChange} required /><br />
                            <label htmlFor="email">Name</label><br />
                            <input type="text" placeholder="Enter name" name="name" onChange={this.handleChange} required /><br />
                            <label htmlFor="psw">Password</label><br />
                            <input type="password" placeholder="Enter Password" name="password" onChange={this.handleChange} required />
                            <label htmlFor="psw">Confirm Password</label><br />
                            <input type="password" placeholder="Confirm Password" name="cpassword" onChange={this.handleChange} required />
                            <label>Sign Up as </label><input type="radio" value="user" name="usertype" onChange={this.handleChange} />User<input name="usertype" type="radio" value="tc" onChange={this.handleChange} />Training Center
                        <button type="submit" onClick={handleSubmit}>Sign Up</button><br />
                        </div>
                    </form>
                </body>
            </>
        )
    }
}

