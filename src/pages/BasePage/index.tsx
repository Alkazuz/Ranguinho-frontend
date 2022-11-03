import React, { Component, useEffect, useState } from 'react';


import { auth } from '../../utils/firebase';

import api from '../../services/api';
import { User } from 'firebase/auth';

export class BasePage extends Component{

    constructor(props){
        super(props);
        this.state = {
            userInfo: {}
        }
    }

    componentDidMount(): void {
        auth.onAuthStateChanged(async (user: User | null) => {
            
            if (user) {
                await api.post('/user/find', {lat: -18.9971648, log: -57.6569564})
                .then(response => {
                    this.setState({userInfo: response.data})
                
                })
            }
        });
    }

    render(): React.ReactNode {

        return (
            <></>
        )
    }

    

}