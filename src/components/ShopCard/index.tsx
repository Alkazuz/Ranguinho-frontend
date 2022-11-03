import React, { Component, useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { RestaurantInterface } from '../../constants/Interfaces';

import './index.css'

function ShopCard(props: RestaurantInterface) {

    const [loading, setLoading] = useState(true);
    const [distance, setDistance] = useState(0.3);
    
    useEffect(() => {
        
        if (loading) {
          setDistance(calc_distance());
          setLoading(false)
        }
      }, [loading])

    const calc_distance = () => {
        // The math module contains a function
        // named toRadians which converts from
        // degrees to radians.
        let lat1 = props.lat;
        let lon1 = props.long;
        
        let lat2 = -18.9971316;
        let lon2 = -57.6577238;

        lon1 =  lon1 * Math.PI / 180;
        lon2 = lon2 * Math.PI / 180;
        lat1 = lat1 * Math.PI / 180;
        lat2 = lat2 * Math.PI / 180;
   
        // Haversine formula
        let dlon = lon2 - lon1;
        let dlat = lat2 - lat1;
        let a = Math.pow(Math.sin(dlat / 2), 2)
                 + Math.cos(lat1) * Math.cos(lat2)
                 * Math.pow(Math.sin(dlon / 2),2);
               
        let c = 2 * Math.asin(Math.sqrt(a));
   
        // Radius of earth in kilometers. Use 3956
        // for miles
        let r = 6371;
   
        // calculate the result
        return parseFloat((c * r).toFixed(1));
    }

    const calc_delivery = () => {
        let price = distance * props.delivery_price;
        if(price == 0)
        if(price < props.delivery_price) price = props.delivery_price;
        
        return price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});;
    }

    let price = props.delivery_price == 0 ? 
            <div className='time'>30-40 min • <div className='free'>Grátis</div></div> : 
    <div className='time'>30-40 min • {calc_delivery()}</div>;

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
                            <div>• {props.category} • {distance} km</div>
                            
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