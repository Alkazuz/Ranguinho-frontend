import React, { Component, useEffect, useState } from 'react';


import { auth, db } from '../../utils/firebase';

import api from '../../services/api';
import { User } from 'firebase/auth';
import { PropNagivation } from '../login/LoginBase';
import { collection, doc, getDoc, getDocFromCache } from 'firebase/firestore';

export class BasePage extends Component<PropNagivation>{

    constructor(props){
        super(props);
        this.state = {
            userInfo: {}
        }
    }

    signOut(): void{
        console.log('deslogado')
    }

    componentDidMount(): void {
        auth.onAuthStateChanged(async (user: User | null) => {
            
            if (user) {
                const usersRef = doc(db, "users", user.uid);
                const docSnap  = await getDoc(usersRef);
                if(docSnap.exists()){
                    console.log(docSnap.data())
                    this.setState({userInfo: docSnap.data()})
                }
            }else{
                this.props.navigate('/login')
            }
        });
    }

    render(): React.ReactNode {

        return (
            <></>
        )
    }

    

}

