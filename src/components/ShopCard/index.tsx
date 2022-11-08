import React, { Component, useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { RestaurantInterface, UserInfoInterface } from '../../constants/Interfaces';

import './index.css'

interface RestaurantModelInterface{
    data: RestaurantInterface,
    user: UserInfoInterface,
    navigate:  NavigateFunction
}

function ShopCard(props: RestaurantModelInterface) {

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        
        if (loading) {
          setLoading(false)
        }
      }, [loading])

    let price = props.data.delivery_price == 0 ? 
            <div className='time'>30-40 min • <div className='free'>Grátis</div></div> : 
    <div className='time'>30-40 min • {props.data.fee.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>;

    return (
            <Link to={`/restaurante/${props.data.id}`}>
                 <div className="card" key={props.data.id} >
                    <div className="image">
                        <img src={props.data.logo} alt="" />
                    </div>

                    <div className="content">
                        <p className="name">{props.data.name}</p>
                        <div className="info">
                            <div className="rate">
                                <FaStar/>
                                <div className='rate-value'>Novo</div>
                            </div>
                            <div className="description">
                                <div>• {props.data.category} • {props.data.distance} km</div>
                                
                            </div>
                        </div>
                        {
                            price
                        }
                    </div>
                </div>
            </Link>
            
    );
}

export default ShopCard;