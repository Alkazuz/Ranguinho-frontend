import React, { Component, useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { RestaurantInterface } from '../../constants/Interfaces';

import './index.css'

function ShopCard(props: RestaurantInterface) {

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        
        if (loading) {
          setLoading(false)
        }
      }, [loading])

    

    let price = props.delivery_price == 0 ? 
            <div className='time'>30-40 min • <div className='free'>Grátis</div></div> : 
    <div className='time'>30-40 min • {props.fee.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>;

    return (
            <a href={`/restaurante/${props.uuid}`}>
                <div className="card" key={props.uuid} >
                <div className="image">
                    <img src={props.logo} alt="" />
                </div>

                <div className="content">
                    <p className="name">{props.name}</p>
                    <div className="info">
                        <div className="rate">
                            <FaStar/>
                            <div className='rate-value'>Novo</div>
                        </div>
                        <div className="description">
                            <div>• {props.category} • {props.distance} km</div>
                            
                        </div>
                    </div>
                    {
                        price
                    }
                </div>
            </div>
            </a>
            
    );
}

export default ShopCard;