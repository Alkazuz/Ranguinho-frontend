import React, { Component, useEffect, useState } from 'react';


import { auth, db } from '../../utils/firebase';

import api from '../../services/api';
import { User } from 'firebase/auth';
import { collection, doc, getDoc, getDocFromCache } from 'firebase/firestore';
import { PropPage, UserInfoInterface } from '../../constants/Interfaces';

export class BasePage extends Component<PropPage>{


    constructor(props){
        super(props);
        this.state = {
            userInfo: undefined 
        }
    }

    signOut(): void{
        console.log('deslogado')
    }

    onLoggedIn(userInfo: any): void{
        this.setState({userInfo: userInfo});
    }

    componentDidMount(): void {
        auth.onAuthStateChanged(async (user: User | null) => {
            
            if (user) {
                const usersRef = doc(db, "users", user.uid);
                const docSnap  = await getDoc(usersRef);
                if(docSnap.exists()){
                    const data = docSnap.data();
                    this.onLoggedIn(data);
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

