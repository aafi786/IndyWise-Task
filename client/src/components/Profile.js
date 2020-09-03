import React, { Component } from 'react';
import axios from 'axios';
import { DatePicker } from 'antd';
import { TimePicker, Button, message } from 'antd';
import moment from 'moment';

const format = 'HH:mm';



export default class Profile extends Component {

    constructor() {
        super();
        this.state = {
            profile: {},
            date: "",
            time: "",
            loading: false,
            booking: {}
        }
    }
    componentDidMount() {
        axios
            .get(`https://reqres.in/api/users/${this.props.match.params.id}`)
            .then((res) => {
                console.log(res.data)
                this.setState({ profile: res.data.data });
                axios.post('http://localhost:5000/booking/get-booking', {
                    id: this.props.match.params.id
                })
                    .then(res => {
                        console.log('Booking', res.data)
                        this.setState({
                            booking: res.data.data[0]
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })


            });
    }
    onChangeTime = (time, timeString) => {
        console.log(time, timeString);
        this.setState({
            time: timeString
        })
    }
    onChangeDate = (date, dateString) => {
        console.log(date, dateString);
        this.setState({
            date: dateString
        })
    }
    createBooking = () => {
        this.setState({
            loading: true
        })
        if (this.state.date !== "" && this.state.time !== "") {
            axios.post('http://localhost:5000/booking/add-booking', {
                id: this.state.profile.id,
                time: this.state.time,
                date: this.state.date
            })
                .then(res => {
                    this.setState({
                        loading: false
                    })
                    if (res.data.success) {
                        message.success('Slot Booked !')
                        this.componentDidMount();
                    } else {
                        message.error('Some Error Occured, Try Agaim')
                    }

                })
                .catch(err => {
                    console.log(err);
                    this.setState({
                        loading: false
                    })
                })

        } else {
            message.warn('Please Select Date N Time');
            this.setState({
                loading: false
            })
        }
    }

    removeBooking = () => {

        this.setState({
            loading: true
        })
        axios.post('http://localhost:5000/booking/remove-booking', {
            id: this.state.profile.id,
        })
            .then(res => {
                this.setState({
                    loading: false
                })
                if (res.data.success) {
                    message.success('Booking Canceled !')
                    this.componentDidMount();
                } else {
                    message.error('Some Error Occured, Try Agaim')
                }

            })
            .catch(err => {
                console.log(err);
                this.setState({
                    loading: false
                })
            })


    }
    render() {
        return (
            <div>
                <div className="main-div">

                    <div className="uk-card uk-card-default uk-width-1-1@m uk-margin-top" style={{ padding: '20px', background: '#fff' }}>

                        <div className="uk-card-header" style={{ border: 'none' }}>
                            <div className="uk-grid-small uk-flex-middle" uk-grid="true">
                                <div className="uk-width-auto">

                                    <img src={this.state.profile.avatar} alt="avatar" style={{ height: '120px', borderRadius: '100px' }} />
                                </div>
                                <div className="uk-width-expand">

                                    <h3 className="uk-card-title uk-margin-remove-bottom card-head">{`${this.state.profile.first_name} ${this.state.profile.last_name}`}</h3>

                                    <p className="uk-text-meta uk-margin-remove-top">{this.state.profile.email}</p>
                                </div>

                            </div>
                        </div>
                        {
                            (this.state.booking)
                                ? <div>
                                    <div className="uk-width-expand">

                                        <h3 className="uk-card-title uk-margin-remove-bottom card-head">Booking Details</h3>

                                        <p className="uk-text-meta uk-margin-remove-top">Date : {this.state.booking.date}</p>
                                        <p className="uk-text-meta uk-margin-remove-top">Time : {this.state.booking.time}</p>
                                        <Button
                                            loading={this.state.loading}
                                            type="primary"
                                            onClick={this.removeBooking}
                                        >
                                            Cancel Booking
                                    </Button>
                                    </div>
                                </div>
                                : <div style={{ padding: '20px' }}>
                                    <h2 className="card-head" >Book Slot</h2>
                                    <div>
                                        <h2 className="card-head-sm" >Select Date</h2>
                                        <DatePicker onChange={this.onChangeDate} />
                                    </div>
                                    <br />

                                    <div>
                                        <h2 className="card-head-sm" >Select Time</h2>
                                        <TimePicker
                                            onChange={this.onChangeTime}
                                            defaultValue={moment('00:00', format)}
                                            format={format}
                                        />
                                    </div>
                                    <br />
                                    <Button
                                        loading={this.state.loading}
                                        type="primary"
                                        onClick={this.createBooking}
                                    >
                                        Book Slot
                                    </Button>
                                </div>

                        }



                    </div>
                </div>

            </div>
        )
    }
}
