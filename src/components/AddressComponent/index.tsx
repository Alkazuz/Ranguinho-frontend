import React, { Component, MouseEventHandler, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import GoogleSuggest from '../GoogleSuggest';
import Searchbar from '../Searchbar';

import { auth } from '../../utils/firebase';

import './index.css'
import { render } from 'react-dom';
import api from '../../services/api';
import { User } from 'firebase/auth';
import { FaSearch } from 'react-icons/fa';

interface AddressInterface{
    user?: User | null | undefined
}

export class AddressComponent extends Component<AddressInterface>{

    constructor(props){
        super(props);
        this.state= {
            open: false
        }
    }


    render(): React.ReactNode {

        const onClickAdress = (e) => {
            if(e.target.className == "address")
                this.setState({open: !this.state.open})

        }

        let address = this.props.user && this.props.user.address ? <div className='address'>{this.props.user.address}</div> : <div className='address'>Selecionar endereço</div>

        return (
            <div className="address-menu" onClick={onClickAdress}>
                {address}
                <div className="icon" >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
                </div>
                {this.state.open &&
                    <div className='address-menu-open lite-shadow'>
                        <div className="address-menu-content">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={50}><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"/></svg>
                            <h1 className="title">Onde você quer receber seu pedido?</h1>
                            <div className="search-input-address">
                                <div className="lupa">
                                    <FaSearch />
                                </div>
                                <div className="input-text">
                                    <GoogleSuggest/>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                }
            </div>
        )
    }

    

}