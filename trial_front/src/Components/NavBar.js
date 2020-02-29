import React, {Component} from 'react'
export default class NavBar extends Component {
    render() {
        return (
            <>
                <nav>
                    <ul>
                        <li><a href={"signup"}>Sign Up</a></li>
                    </ul>
                </nav>
                <div class="container">
                    <a class="logo" href="/">Trial Booking</a>
                </div>
            </>
        )
    }
}

