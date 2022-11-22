import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { RestaurantInterface, UserInfoInterface } from '../../constants/Interfaces';
import api from '../../services/api';
import { auth, db } from '../../utils/firebase';
import CardLoading from '../CardLoading';
import ShopCard from '../ShopCard';

import './index.css'

interface ShopInterface{
  user: UserInfoInterface,
  navigate:  NavigateFunction,
  category?: string
}

function ShopList(props: ShopInterface){

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null)
    const [page, setPage] = useState(0)

    let consultaAPI = async () => {
          

      if(props.user.address && props.user.lat && props.user.long){
          await api.get(`/restaurant/list?lat=${props.user.lat}&lng=${props.user.long}&page=${page}${props.category ? '&category=' + props.category : ''}`)
          .then(response => {
            setData(response.data)
            setLoading(false)  
          })
      }else{
        await api.get(`/restaurant/list?page=${page}`)
          .then(response => {
            setData(response.data)
            
          })
      }
      
    }

    useEffect(() => {
    
        if (loading && auth.currentUser && props.user) {
          
          onSnapshot(doc(db, "users", auth.currentUser?.uid), (doc) => {
            consultaAPI();
  
          });
        }
      })


    if(loading && !data){
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
                    data.map((shop: RestaurantInterface) => <ShopCard navigate={props.navigate} key={shop.id} data={shop} user={props.user}/>)
                }
                
            </div>
        </div>
    );
}

export default ShopList;