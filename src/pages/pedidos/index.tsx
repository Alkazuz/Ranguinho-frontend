import { FC, ReactNode, useEffect, useState } from 'react'
import { FaSearch, FaStar } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate, useParams } from 'react-router-dom';
import { CardProduct } from '../../components/CardProduct';
import NavbarComponent from '../../components/NavbarComponentDesktop';
import NavbarComponentMobile from '../../components/NavbarComponentMobile';
import RestaurantBanner from '../../components/RestaurantComponents/RestaurantBanner';
import { CardProductInterface, RestaurantInterface } from '../../constants/Interfaces';
import api from '../../services/api';
import { auth } from '../../utils/firebase';
import { BasePage } from '../BasePage';

import './index.css'

export class Class extends BasePage{

  constructor(props){
    super(props);
    (this.state as any) = {
      loading: true,
      data: undefined,
    }
  }

  async consultarApi(){
    const token = await auth.currentUser?.getIdToken()
    await api.get(`/orders/find`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(response => {
        if(response.status == 200){
          this.setState({data: response.data})
        }
      })
      this.setState({loading: false})
  }

  onLoggedIn(userInfo: any): void {
    this.consultarApi();
  }

  componentDidMount(): void {
    super.componentDidMount()
    
  }


  render(): ReactNode {

    if((this.state as any).loading || !(this.state as any).data) return <></> ;
    
    else{
      document.title = `Pedidos - Ranguinho Delivery de Comida`;
      return (
        <>
          
        </>
      )
    }
  }

  
}

function Pedidos() {
  let navigate = useNavigate();
  let params = useParams();
  return <Class navigate={navigate} params={params}/>
}

export default Pedidos
