import { FC, ReactNode, useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate, useParams } from 'react-router-dom';
import NavbarComponent from '../../components/NavbarComponentDesktop';
import NavbarComponentMobile from '../../components/NavbarComponentMobile';
import RestaurantBanner from '../../components/RestaurantComponents/RestaurantBanner';
import { RestaurantInterface } from '../../constants/Interfaces';
import api from '../../services/api';
import { BasePage } from '../BasePage';

import './index.css'

export class Class extends BasePage{

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      data: undefined
    }
  }

  async consultarApi(userInfo: any){
    let { id } = this.props.params;
    await api.get(`/restaurant/find/${id}?lat=${userInfo.lat}&lng=${userInfo.long}`)
      .then(response => {
        if(response.status == 200){
          this.setState({data: response.data})
        }
      })
      this.setState({loading: false})
  }

  onLoggedIn(userInfo: any): void {
    this.consultarApi(userInfo);
  }

  render(): ReactNode {
    if(this.state.loading) return <></> ;
    else{
      return (
        <>
          <NavbarComponent user={this.state.userInfo} onSignOut={this.signOut}/>
          <NavbarComponentMobile user={this.state.userInfo} onSignOut={this.signOut}/>
          <div className="content-restaurant box-div" style={{width: '1000px'}}>
              <div className="restaurant-content">
                  <div className="banner">
                      <RestaurantBanner banner_url={this.state.data.logo} />
                  </div>
                  <div className="restaurant-info">
                    <div className="logo">
                        <LazyLoadImage src={this.state.data.logo} alt="" className="restaurant-logo" />
                    </div>
                    <div className="displayname">
                      <h1>{this.state.data.name}</h1>
                      <div className="rate">
                          <FaStar/>
                          <div className='rate-value'>Novo</div></div>
                    </div>
                  </div>
                  
              </div>
          </div>
        </>
      )
    }
  }

  
}

function Restaurante() {
  let navigate = useNavigate();
  let params = useParams();
  return <Class navigate={navigate} params={params}/>
}

export default Restaurante
