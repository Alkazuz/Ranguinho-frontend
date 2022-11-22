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
import { BasePage } from '../BasePage';

import './index.css'

export class Class extends BasePage{

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      data: undefined,
      filter: ''
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

  componentDidMount(): void {
    super.componentDidMount()
    
  }


  render(): ReactNode {

    const handleChangeFilter = (filter: string): void =>{
      this.setState({
        filter
      })
    }

    const productList = () => {
      if(this.state.filter){
        return (
          <div className="products-list">
            {this.state.data && this.state.data.products.filter((product: CardProductInterface) => 
              product.name.toLowerCase().includes(this.state.filter.toLowerCase()) ||
              product.description.toLowerCase().includes(this.state.filter.toLowerCase())
            ).map((product: CardProductInterface) => <CardProduct product={product} />) }
          </div>
        )
      }

      return (
        <div className="products-list">
          {this.state.data && this.state.data.products.map((product: CardProductInterface) => <CardProduct product={product} />) }
        </div>
      )
    }

    if(this.state.loading) return <></> ;
    
    else{
      document.title = `${this.state.data.name} - Ranguinho Delivery de Comida`;
      return (
        <>
          <NavbarComponent user={this.state.userInfo} onSignOut={this.signOut}/>
          <NavbarComponentMobile user={this.state.userInfo} onSignOut={this.signOut}/>
          <div className="content">
            <div className="content-restaurant box-div">
                <div className="restaurant-content">
                    <div className="banner">
                        <RestaurantBanner banner_url={this.state.data.bannerUrl} />
                    </div>
                    <div className="restaurant-info">
                      <div className="logo">
                          <LazyLoadImage src={this.state.data.logo} alt="" className="restaurant-logo" />
                      </div>
                      <div className="displayname font-fsp">
                        <h1>{this.state.data.name}</h1>
                        <div className="rate">
                            <FaStar/>
                            <div className='rate-value font-figerona'>Novo</div></div>
                      </div>
                    </div>
                    <div className="restaurant-menu">
                      <div className="search-item">
                          <div className="search-input-item">
                            <div className="lupa">
                                <FaSearch />
                            </div>
                            <div className="input-text">
                                <input type="text" id="search" placeholder="Busque no cardápio"
                                autoComplete='off'
                                name="search" 
                                onChange={(e) => handleChangeFilter(e.target.value) }
                                />
                            </div>
                        </div>
                      </div>

                      <div className="delivery-info">
                        
                      </div>

                    </div>
                    
                    {productList()}
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
