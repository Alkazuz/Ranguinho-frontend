import React, { Component } from 'react';
import Searchbar from '../Searchbar';

import './index.css'

class NavbarComponent extends Component {
    render() {
        return (
            <div className="navbar">
                <ol>
                    <li>
                        <img src="images/logo.webp" alt="" />
                    </li>

                    <li><a href='/' className='selected'>Início</a></li>
                    <li><a href='/'>Restaurantes</a></li>
                </ol>
                
                <Searchbar />


            </div>
        );
    }
}

export default NavbarComponent;