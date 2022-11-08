import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { RestaurantInterface, UserInfoInterface } from '../../constants/Interfaces';
import api from '../../services/api';
import { auth, db } from '../../utils/firebase';
import CardLoading from '../CardLoading';
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
          await api.get(`/restaurant/list?lat=${props.user.lat}&lng=${props.user.long}`)
          .then(response => {
            setData(response.data)
            
          })
      }else{
        await api.get('/restaurant/list')
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


    if(loading){
      return (
        <div>
            <h1>Lojas</h1>
            
            <div className="cardlist">
                <CardLoading /><CardLoading /><CardLoading /><CardLoading />
                <CardLoading /><CardLoading /><CardLoading /><CardLoading />
                <CardLoading /><CardLoading /><CardLoading /><CardLoading />
            </div>
        </div>
      )
    }  

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