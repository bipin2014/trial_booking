import React, { Component } from 'react'
import NavBar from "../Components/NavBar";
import SideNav from "../Components/SideNav";
import axios from 'axios';
import KhaltiCheckout from "khalti-web";
export default class Booking extends Component {
    state = {
        display: false,
        date: "",
        interval: "30 Minutes",
        error: null,
        timeslot: [],
        htimeslot: [],
        tcid:"",
        vechile:"bike"
    }

    // componentDidMount(){
    //     gethalfinterval();
    //     getonehourinterval();
    // }
    render() {
        const handleChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value,
            })
        }
        const checkoutBtn=(min,vec,time,tcid,date)=>{
            let price;
            if(min==="30" && this.state.vechile==="bike"){
                price=35000
            }else if(min==="60" && this.state.vechile==="bike"){
                price=60000
            }else if(min==="30" && this.state.vechile==="car"){
                price=60000
            }else if(min==="60" && this.state.vechile==="car"){
                price=100000
            }
            let config = {
                // replace this key with yours
                "publicKey": "test_public_key_3cc04817a4d14c48b523bcc98b7e5066",
                "productIdentity": "1234567890",
                "productName": time,
                "productUrl": "http://localhost:3000/book/5e50a7ff9cbba03084747e52",
                "eventHandler": {
                    onSuccess (payload) {
                        // hit merchant api for initiating verfication
                        console.log(payload);
                        let data={
                            ...payload,
                            "car":0,
                            "bike":1,
                            "tc":tcid,
                            "date":date,
                            "duration":min,
                            "startTime":time,
                        }
                        axios.post('/booking/book',data).then(res=>{
                            console.log("SUCESS",res.data);
                            if(res.data.error==null){
                                window.location.href="/dashboard"
                            }else{
                                
                            }
                            

                        }).catch(err=>{
                            console.log(err);
                            
                        })
                        
                    },
                    // onError handler is optional
                    onError (error) {
                        // handle errors
                        console.log(error);
                    },
                    onClose () {
                        console.log('widget is closing');
                    }
                }
            };
            let checkout=new KhaltiCheckout(config);
            checkout.show({amount: price});
        }
        const checkdate = () => {
            if (Date.parse(this.state.date) >= Date.now()) {
                gethalfinterval();
                getonehourinterval();
                const tcid=this.props.match.params.tc;
                console.log("TCID",tcid)
                this.setState({
                    tcid:tcid
                })
                axios.get('/tc/getdata/' + this.props.match.params.tc).then(res => {
                    console.log(res.data.data);
                    this.setState({
                        display: true
                    })
                }).catch(err => {

                })

            } else {
                console.log("Donot go");
                this.setState({
                    error: "Please donot choose previous date",
                    display: false
                })

            }

            console.log(Date.parse(this.state.date));
            console.log(Date.now());

        }

        const getonehourinterval = () => {
            let start = 6;
            let end = 18;
            let ts = []
            
            let amorpm = ""
            for (let i = start; i <= end; i++) {
                let v = i;
                if (i >= 12) {
                    amorpm = "pm"
                    if (i !== 12) {
                        v = i - 12;
                    }
                } else {
                    amorpm = "am"
                }
                ts.push({
                    "key": i,
                    value: `${v} ${amorpm}`
                })
            }
            this.setState({
                timeslot: ts
            })

        }

        const gethalfinterval = () => {
            let start = 6;
            let end = 18;
            let counter=1;
            let ts = []
            let amorpm = ""
            for (let i = start; i <= end; i++) {
                let v = i;
                if (i >= 12) {
                    amorpm = "pm"
                    if (i !== 12) {
                        v = i - 12;
                    }
                } else {
                    amorpm = "am"
                }
                ts.push({
                    "key": counter,
                    value: `${v} ${amorpm}`
                })
                counter++;
                ts.push({
                    "key": counter,
                    value: `${v}:30 ${amorpm}`
                })
                counter++;
            }
            this.setState({
                htimeslot: ts
            });

        }


        return (
            <>

                <SideNav />
                <body>
                    <center>
                        <h2 class="booktime">Book time</h2>
                        <div>
                            <input type="date" name="date" id="datepicker" onChange={handleChange} />

                        </div>
                        <button class="check" onClick={checkdate}>Check</button>

                        {this.state.display && (
                            <div class="scroll">
                                <input type="button" name="interval" value="30 Minutes"  onClick={handleChange}></input>&nbsp;&nbsp;
                                <input type="button" name="interval" value="1 Hour" onClick={handleChange}></input>

                                Vechile:<input type="radio" name="vechile" value="car" onClick={handleChange}></input>Car
                                <input type="radio" name="vechile" value="bike" onClick={handleChange} ></input>Bike
                                <table class="avail" border="0px">
                                    <tr>
                                        <th>S.N</th>
                                        <th>Time-slots</th>
                                        <th>Action</th>
                                    </tr>
                                    {
                                        this.state.interval==="30 Minutes" ?(
                                            this.state.htimeslot.map(res => (
                                                <tr>
                                                    <td>{res.key}</td>
                                                    <td>{res.value}</td>
                                                    <td><button class="check2" onClick={()=>checkoutBtn("30","bike",res.value,this.state.tcid,this.state.date)}>Confirm</button></td>
                                                </tr>
                                            ))
                                        ):(
                                            this.state.timeslot.map(res => (
                                                <tr>
                                                    <td>{res.key}</td>
                                                    <td>{res.value}</td>
                                                    <td><button class="check2" onClick={()=>checkoutBtn("60","bike",res.value,this.state.tcid,this.state.date)}>Confirm</button></td>
                                                </tr>
                                            ))
                                        )
                                    }
                                </table>
                            </div>
                        )}
                    </center>
                </body>
            </>
        )
    }
}

