import React, { Component } from 'react'
import axios from 'axios';
import {

    ExpandOutlined

} from '@ant-design/icons';
export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        axios.get('https://reqres.in/api/users')
            .then(res => {
                console.log(res.data)
                this.setState({
                    users: res.data.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        return (
            <div>
                <h1 className="main-head" >Indywise</h1>
                <div className="main-div">
                    {
                        this.state.users.map((user, index) => (
                            <div className="uk-card uk-card-default uk-width-1-1@m uk-margin-top" key={index}>

                                <div className="uk-card-header" style={{ border: 'none' }}>
                                    <div className="uk-grid-small uk-flex-middle" uk-grid="true">
                                        <div className="uk-width-auto">

                                            <img src={user.avatar} alt="avatar" style={{ height: '70px', borderRadius: '100px' }} />
                                        </div>
                                        <div className="uk-width-expand">

                                            <h3 className="uk-card-title uk-margin-remove-bottom card-head">{`${user.first_name} ${user.last_name}`}</h3>

                                            <p className="uk-text-meta uk-margin-remove-top">{user.email}</p>
                                        </div>
                                        <div className="uk-width-auto">

                                            <ExpandOutlined style={{ fontSize: '22px', color: '#2C3E50', marginLeft: '20px', cursor: 'pointer' }}
                                                onClick={() => this.props.history.push(`/profile/${user.id}`)} />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))
                    }
                </div>

            </div>
        )
    }
}
