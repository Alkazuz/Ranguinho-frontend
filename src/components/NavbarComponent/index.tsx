import React, { Component } from 'react';
import GoogleSuggest from '../GoogleSuggest';
import Searchbar from '../Searchbar';

import './index.css'

class NavbarComponent extends Component {
    render() {
        return (
            <div style={{position: 'relative', height:'auto'}}>
                <div className="navbar">
                    <div className="navs">
                        <ol>
                            <li>
                                <img src="images/logo.webp" alt="" />
                            </li>

                            <li><a href='/' className='selected'>Início</a></li>
                            <li><a href='/'>Restaurantes</a></li>
                        </ol>
                    </div>
                
                    <div className="navs">
                        <Searchbar />
                    </div>
                    
                    <div className="navs">
                        <GoogleSuggest />
                    </div>


                </div>
            </div>
            
        );
    }
}

export default NavbarComponent;