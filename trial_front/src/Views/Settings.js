import React, { Component } from 'react'
import TrainerSide from "../Components/TrainerSide";
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

export default class Settings extends Component {
    state={
        image:null
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    render() {
        const handleSubmit=(event)=>{
            event.preventDefault();
            let bodyFormData = new FormData();

            bodyFormData.append("image", this.state.image);

            axios.post('/', bodyFormData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                .then(data => {
                    console.log(data.data);
                    this.props.history.push('/viewproducts');
                    NotificationManager.success('Product Added Sucessfully', 'Successful!', 2000);
                }).catch(err => {
                console.error(err.code);
            });
        }
        return (
            <>
                <body class="db">
                <TrainerSide/>
                <center>
                    <h2>Settings</h2>
                    <form onSubmit={handleSubmit}>

                        Name: <input type="text" name="name" placeholder="Enter Name " onChange={this.handleChange} />
                        Image: <input type="file" name="file" onChange={this.handleChange} /><br />
                        <button type="submit">Update</button>

                    </form>
                </center>

                </body>
            </>
        )
    }
}
