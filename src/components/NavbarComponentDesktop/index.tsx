import React, { Component, useEffect, useRef, useState } from 'react';
import { Link, NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";
import Searchbar from '../Searchbar';
import { RiFilePaper2Line, RiCoupon2Line } from 'react-icons/ri';
import {BsChatDots} from 'react-icons/bs';
import {AiOutlineHeart} from 'react-icons/ai'
import {BiWallet, BiUser} from 'react-icons/bi'
import { auth } from '../../utils/firebase';
import {MdLogout} from 'react-icons/md'
import './index.css'
import { AddressComponent } from '../AddressComponent';
import { signOut, User } from 'firebase/auth';
import { UserInfoInterface } from '../../constants/Interfaces';


interface NavbarInterface{
    user?: UserInfoInterface,
    onSignOut: () => void
}

function useOutsideAlerter(ref, onClick: () => void) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            onClick();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

function NavbarComponent(props: NavbarInterface){

    const [profile, setProfile] = useState(false);
    const wrapperRef = useRef(null);

    useOutsideAlerter(wrapperRef, () => setProfile(false));

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
            {profile && <div ref={wrapperRef} className="profile-div box-div lite-shadow">
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

                        <li>
                            
                            <div className="item box-div" onClick={onLogout}>
                                <MdLogout size={24}/>
                                <a className='font-text'>Sair</a>
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
                            <div className="profile" >
                                <BiUser onClick={handleProfileClick} size={24}/>
                                {profileContent()}
                            </div>
                            
                        </li>
                        
                    </ul>
                </div>
                

            </div>
        </div>
        
        
    );
}

export default NavbarComponent;