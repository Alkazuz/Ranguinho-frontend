import React, { Component, useEffect, useState } from 'react';


import { auth, db } from '../../utils/firebase';

import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { PropPage } from '../../constants/Interfaces';

export class BasePage extends Component<PropPage>{


    constructor(props){
        super(props);
        this.state = {
            userInfo: undefined 
        }
    }

    signOut(): void{
    }

    onLoggedIn(user: any): void{
        this.setState({userInfo: user});
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

