import React, { Component } from 'react';
import { Link, useLocation } from 'react-router-dom';
import GoogleSuggest from '../GoogleSuggest';
import Searchbar from '../Searchbar';

import { auth } from '../../utils/firebase';

import './index.css'
import { AddressComponent } from '../AddressComponent';
import { User } from 'firebase/auth';

interface NavbarInterface{
    user?: User | null | undefined
}

function NavbarComponent(props: NavbarInterface){

    const location = useLocation().pathname;

    let inicio = location.includes("/inicio") || location == '/' ? <Link className='selected' to="/">Início</Link> : <Link to="/">Início</Link>
    let restaurant = location.includes("/restaurante") ? <Link className='selected' to="/restaurantes">Restaurantes</Link> : <Link to="/restaurantes">Restaurantes</Link>

    return (
        <div className="nav-header">
            <div className="navbar">
                <div className="navs">
                    <a href='/'><img src="/images/logo.webp" alt="" /></a>
                    <ul>
                        <li>{inicio}</li>
                        <li>{restaurant}</li>
                    </ul>
                </div>
            
                <div className="navs">
                    <ul>
                        <li style={{width: '100%'}}><Searchbar /></li>
                    </ul>
                    
                </div>
                
                <div className="navs">
                    <ul>
                        <li>
                            <AddressComponent user={props.user}/>
                        </li>
                    </ul>
                </div>


            </div>
        </div>
        
        
    );
}

export default NavbarComponent;