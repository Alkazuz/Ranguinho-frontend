import React, { Component, MouseEventHandler, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { auth, db } from '../../utils/firebase';

import './index.css'
import { render } from 'react-dom';
import api from '../../services/api';
import { User } from 'firebase/auth';
import { FaSearch } from 'react-icons/fa';
import { getAnalytics, setUserProperties } from 'firebase/analytics';
import { UserInfoInterface } from '../../constants/Interfaces';
import { addDoc, doc, setDoc } from 'firebase/firestore';
import GoogleSuggest from '../../components/GoogleSuggest';

const analytics = getAnalytics();

interface AddressInterface{
    user: UserInfoInterface
}

export class AddressInput extends Component<AddressInterface>{

    constructor(props){
        super(props);
        this.state= {
            open: false,
            location: undefined,
            streetNumber: '',
            locked: true,
        }
    }

    
    render(): React.ReactNode {

        const onSelectLocation = (geoLocation) => {
            this.setState({location: geoLocation})
        }

        const onSaveLocation = async () => {
            const data = this.props.user;
            const loc = JSON.parse(JSON.stringify(this.state.location));
            data.address = loc.formatted_address;
            data.lat = loc.geometry.location.lat;
            data.long = loc.geometry.location.lng;
            let userid = auth.currentUser?.uid
            const docRef = doc(db, 'users', userid)
            await setDoc(docRef, data, { merge: true })
            this.setState({open: false})
        }

        
        return (
            <div id='overlay-address'>
                <div className='address-menu-open lite-shadow'>
                    <div className="address-menu-content">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={50}><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"/></svg>
                        <h1 className="title">Onde você quer receber seu pedido?</h1>
                        <div className="input-address">
                            <div className="lupa">
                                <FaSearch size={32}/>
                            </div>
                            <div className="input-text">
                                <GoogleSuggest onSelect={onSelectLocation}/>
                            </div>
                        </div>
                        <button className="btn lite-shadow btn-save" onClick={onSaveLocation}>Salvar localização</button>
                    </div>
                </div>
            </div>
            
        )
    }

    

}