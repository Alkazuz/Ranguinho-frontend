import React, { useEffect, useState } from 'react';
import { RestaurantInterface } from '../../constants/Interfaces';
import api from '../../services/api';
import ShopCard from '../ShopCard';

import './index.css'

function ShopList(){

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])

    let consultaAPI = async () => {
      setLoading(false)
      await api.post('/restaurant/list', {lat: -18.9971648, log: -57.6569564})
        .then(response => {
          setData(response.data)
          
        })
    }

    useEffect(() => {
    
        if (loading) {
          consultaAPI();
        }
      }, [loading])

    return (
        <div>
            <h1>Lojas</h1>
            <div className="cardlist">
                {
                    data.map((shop: RestaurantInterface) => <ShopCard name={shop.name} logo={shop.logo} category={shop.category} lat={shop.lat} long={shop.long} uuid={shop.uuid} rate={shop.rate} delivery_price={shop.delivery_price} key={shop.id}/>)
                }
                
            </div>
        </div>
    );
}

export default ShopList;