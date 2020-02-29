import React, { Component } from 'react'
import SideNav from "../Components/SideNav";
import TrainerSide from "../Components/TrainerSide";
import axios from 'axios';
export default class TDashboard extends Component {
    state = {
        bookings: []
    }

    componentDidMount() {
        axios.get('/booking/getfromtrainer').then(res => {
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
                    <TrainerSide/>
                    <h2 className="dash">Dashboard</h2>
                    <center>
                        
                        {this.state.bookings.length > 0 ? (
                            <table>
                                <tr>
                                    <th>User</th>
                                    <th>Date</th>
                                    <th>Vechile</th>
                                    <th>Duration</th>
                                    <th>Booked Time</th>
                                </tr>
                                {this.state.bookings.map(res => (
                                    <tr>
                                        <td>{res.user.name}</td>
                                        <td>{res.date}</td>
                                        {res.car>0?(
                                            <td>Car {res.car}</td>
                                        ):(
                                            <td>Bike {res.bike}</td>
                                        )}

                                        <td>{res.duration} min</td>
                                        <td>{res.startTime}</td>
                                    </tr>
                                ))}

                            </table>
                        ) : (
                                <div>
                                    <h1>No Bookings Available</h1>
                                </div>
                            )}
                    </center>

                </body>
            </>
        )
    }
}

