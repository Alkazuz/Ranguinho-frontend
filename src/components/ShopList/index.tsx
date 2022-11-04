import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { RestaurantInterface, UserInfoInterface } from '../../constants/Interfaces';
import api from '../../services/api';
import { auth, db } from '../../utils/firebase';
import ShopCard from '../ShopCard';

import './index.css'

interface ShopInterface{
  user: UserInfoInterface
}

function ShopList(props: ShopInterface){

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])

    let consultaAPI = async () => {
      setLoading(false)      

      if(props.user.address && props.user.lat && props.user.long){
          await api.post('/restaurant/list', {lat: props.user.lat, log: props.user.long})
          .then(response => {
            setData(response.data)
            
          })
      }else{
        await api.post('/restaurant/list')
          .then(response => {
            setData(response.data)
            
          })
      }
      
    }

    useEffect(() => {
    
        if (loading && auth.currentUser) {
          
          onSnapshot(doc(db, "users", auth.currentUser?.uid), (doc) => {
            consultaAPI();
  
          });
        }
      })

    return (
        <div>
            <h1>Lojas</h1>
            <div className="cardlist">
                {
                    data.map((shop: RestaurantInterface) => <ShopCard fee={shop.fee} distance={shop.distance} name={shop.name} logo={shop.logo} category={shop.category} lat={shop.lat} long={shop.long} uuid={shop.uuid} rate={shop.rate} delivery_price={shop.delivery_price} key={shop.id}/>)
                }
                
            </div>
        </div>
    );
}

export default ShopList;