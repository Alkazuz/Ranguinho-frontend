import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import ShopCard from '../ShopCard';

export interface ShopInterface{
    id: string,
    name: string,
    rate: number,
    logo: string,
    delivery_price: number,
    category: string,
    lat: number,
    long: number
}

import './index.css'

function ShopList(){

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])

    let consultaAPI = async () => {
      await api.post('/restaurant/list', {lat: -18.9971648, log: -57.6569564})
        .then(response => {
          setData(response.data)
          
        })
    }

    useEffect(() => {
    
        if (loading) {
          consultaAPI();
          setLoading(false)
        }
      }, [loading])

    return (
        <div>
            <h1>Lojas</h1>
            <div className="cardlist">
                {
                    data.map((shop: ShopInterface) => <ShopCard name={shop.name} logo={shop.logo} category={shop.category} lat={shop.lat} long={shop.long} id={shop.id} rate={shop.rate} delivery_price={shop.delivery_price} key={shop.id}/>)
                }
                
            </div>
        </div>
    );
}

export default ShopList;