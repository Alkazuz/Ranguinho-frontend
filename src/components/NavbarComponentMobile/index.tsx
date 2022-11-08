import React, { Component } from 'react';
import { Link, NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

import { auth } from '../../utils/firebase';

import './index.css'
import { AddressComponent } from '../AddressComponent';
import { signOut, User } from 'firebase/auth';
import { UserInfoInterface } from '../../constants/Interfaces';

interface NavbarInterface{
    user?: UserInfoInterface,
    onSignOut: () => void
}

function NavbarComponentMobile(props: NavbarInterface){

    const onLogout = async () => {
        console.log('deslogou')
        const data = await signOut(auth);
        props.onSignOut;
    }

    return (
        <>
            <div className="nav-header-mobile">
                <div className="navbar-mobile">
                    <div className="navs">
                        <a href='/'><img src="/images/logo.webp" alt="" /></a>
                        <AddressComponent user={props.user}/>
                    </div>
                </div>
            </div>
            <div className='tab-bar-mobile lite-shadow box-div'>
                <Link to={"/inicio"}>
                    <div className="item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
                        <span className="label">Início</span>
                    </div>
                </Link>
                
                <Link to={"/buscar"}>
                    <div className="item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"/></svg>
                        <span className="label">Buscar</span>
                    </div>
                </Link>
                
                <a  onClick={onLogout}>
                    <div className="item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={24}><path d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z"/></svg>
                        <span className="label">Sair</span>
                    </div>
                </a>
                
            </div>
        </>
        
        
        
    );
}

export default NavbarComponentMobile;