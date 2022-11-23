import React, { Component, useState } from 'react';
import { Link, NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";
import Searchbar from '../Searchbar';
import { RiFilePaper2Line, RiCoupon2Line } from 'react-icons/ri';
import {BsChatDots} from 'react-icons/bs'
import {AiOutlineHeart} from 'react-icons/ai'
import {BiWallet} from 'react-icons/bi'
import { auth } from '../../utils/firebase';

import './index.css'
import { AddressComponent } from '../AddressComponent';
import { signOut, User } from 'firebase/auth';
import { UserInfoInterface } from '../../constants/Interfaces';


interface NavbarInterface{
    user?: UserInfoInterface,
    onSignOut: () => void
}

function NavbarComponent(props: NavbarInterface){

    const [profile, setProfile] = useState(false);

    const location = useLocation().pathname;

    let inicio = location.includes("/inicio") || location == '/' ? <Link className='selected' to="/">Início</Link> : <Link to="/">Início</Link>
    let restaurant = location.includes("/restaurante") ? <Link className='selected' to="/restaurantes">Restaurantes</Link> : <Link to="/restaurantes">Restaurantes</Link>

    const onLogout = async () => {
        await signOut(auth);
        props.onSignOut;
    }

    const handleProfileClick = () =>{
        setProfile(!profile)
    }

    const profileContent = () => {
        return (<>
            {profile && <div className="profile-div box-div lite-shadow">
                <div className="header">
                    <h1 className='font-figerona'>Olá, {auth.currentUser?.displayName}</h1>
                </div>
                <div className="nav-profile">
                    <ul>
                        <li>
                            <div className="item box-div">
                                <BsChatDots size={24}/>
                                <a className='font-text'>Chat</a>
                            </div>
                        </li>

                        <li>
                            <div className="item box-div">
                                <RiFilePaper2Line size={24}/>
                                <a className='font-text'>Pedidos</a>
                            </div>
                        </li>

                        <li>
                            <div className="item box-div">
                                <RiCoupon2Line size={24}/>
                                <a className='font-text'>Cupons</a>
                            </div>
                        </li>

                        <li>
                            <div className="item box-div">
                                <AiOutlineHeart size={24}/>
                                <a className='font-text'>Favoritos</a>
                            </div>
                        </li>

                        <li>
                            <div className="item box-div">
                                <BiWallet size={24}/>
                                <a className='font-text'>Carteira</a>
                            </div>
                        </li>

                    </ul>
                </div>
            </div> }
        </>)
    }

    return (
        <div className="nav-header">
            <div className="navbar">
                <div className="navs">
                    <a href='/'><LazyLoadImage src="/images/logo.webp" alt="" /></a>
                    <ul>
                        <li>{inicio}</li>
                        <li>{restaurant}</li>
                    </ul>
                </div>
            
                <div className="navs"style={{width: '700px'}}>
                    <ul style={{width: '100%'}}>
                        <li style={{width: '100%'}}><Searchbar /></li>
                    </ul>
                    
                </div>
                
                <div className="navs">
                    <ul>
                        <li>
                            <AddressComponent user={props.user}/>
                        </li>
                        <li>
                            <div className="profile" onClick={handleProfileClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={24}><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                            </div>
                            {profileContent()}
                        </li>
                        <li>
                            
                            <div className="logout" onClick={onLogout}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={24}><path d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z"/></svg>
                            </div>
                            
                        </li>
                    </ul>
                </div>
                

            </div>
        </div>
        
        
    );
}

export default NavbarComponent;