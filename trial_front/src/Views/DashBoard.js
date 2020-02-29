import React, { Component } from 'react'
import SideNav from "../Components/SideNav";
import axios from 'axios';
export default class DashBoard extends Component {
    state = {
        bookings: []
    }

    componentDidMount() {
        axios.get('/booking').then(res => {
            console.log("book", res.data);
            this.setState({
                bookings: res.data.booked
            })

        }).catch(err => {
            console.log(err);
        })
    }

    render() {

        return (
            <>
                <body class="db">
                    <SideNav />
                    <h2 className="dash">Dashboard</h2>
                    <center>
                       
                        {this.state.bookings.length > 0 ? (
                            <table class="mybookings">
                                <tr>
                                    <th>Date</th>
                                    <th>Vehicle</th>
                                    <th>Duration</th>
                                    <th>Booked Time</th>
                                    <th>Training Center</th>
                                </tr>
                                {this.state.bookings.map(res => (
                                    <tr>
                                        <td>{res.date}</td>
                                        <td>Bike {res.bike}</td>
                                        <td>{res.duration} min</td>
                                        <td>{res.startTime}</td>
                                        <td>{res.traningcenter.name}</td>
                                    </tr>
                                ))}

                            </table>
                        ) : (
                                <div>
                                    <h1>No Bookings Available</h1>
                                    <a href="/Center">Book Now</a>
                                </div>
                            )}
                    </center>

                </body>
            </>
        )
    }
}

