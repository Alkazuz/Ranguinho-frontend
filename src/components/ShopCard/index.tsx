import React, { Component, useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
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

    let price = props.data.delivery_info.fee == 0 ? 
            <div className='time'>{props.data.delivery_info.timeMinMinutes}-{props.data.delivery_info.timeMaxMinutes} min • <div className='free'>Grátis</div></div> : 
    <div className='time'>{props.data.delivery_info.timeMinMinutes}-{props.data.delivery_info.timeMaxMinutes} min • {props.data.delivery_info.fee.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>;

    return (
            <Link to={`/restaurante/${props.data.id}`}>
                 <div className="card" key={props.data.id} >
                    <div className="image">
                        <LazyLoadImage src={props.data.logo} alt="" />
                    </div>

                    <div className="content">
                        <p className="name">{props.data.name}</p>
                        <div className="info">
                            <div className="rate">
                                <FaStar/>
                                <div className='rate-value'>{props.data.isNew ? 'Novo' : props.data.rate.toFixed(1)}</div>
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