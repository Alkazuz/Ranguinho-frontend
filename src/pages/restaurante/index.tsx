import { FC, ReactNode, useEffect, useState } from 'react'
import { FaSearch, FaStar } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate, useParams } from 'react-router-dom';
import { BuyProductCard } from '../../components/BuyProductCard';
import { CardProduct } from '../../components/CardProduct';
import { CartShopComponent } from '../../components/CartShopComponent';
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
    (this.state as any) = {
      loading: true,
      data: undefined,
      selectedProduct: undefined,
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
      if((this.state as any).filter){
        return (
          <div className="products-list">
            {(this.state as any).data && (this.state as any).data.products.filter((product: CardProductInterface) => 
              product.name.toLowerCase().includes((this.state as any).filter.toLowerCase()) ||
              product.description.toLowerCase().includes((this.state as any).filter.toLowerCase())
            ).map((product: CardProductInterface) => 
            <div key={product.id} onClick={() => this.setState({selectedProduct: product})}>
              <CardProduct product={product} />
              </div>) }
          </div>
        )
      }

      return (
        <div className="products-list">
          {(this.state as any).data && (this.state as any).data.products
          .map((product: CardProductInterface) => 
          <div key={product.id} onClick={() => this.setState({selectedProduct: product})}>
            <CardProduct product={product} />
          </div>) }
        </div>
      )
    }
    let price = '';
    if((this.state as any).data)
      price = (this.state as any).data.delivery_info.fee == 0 ? 
      `${(this.state as any).data.delivery_info.timeMinMinutes}-${((this.state as any) as any).data.delivery_info.timeMaxMinutes} min • Grátis` : 
      `${(this.state as any).data.delivery_info.timeMinMinutes}-${(this.state as any).data.delivery_info.timeMaxMinutes} min • ${(this.state as any).data.delivery_info.fee.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`

    if((this.state as any).loading || !(this.state as any).data) return <></> ;
    
    else{
      document.title = `${(this.state as any).data.name} - Ranguinho Delivery de Comida`;
      return (
        <>
          <NavbarComponent user={(this.state as any).userInfo} onSignOut={this.signOut}/>
          <NavbarComponentMobile user={(this.state as any).userInfo} onSignOut={this.signOut}/>
          <div className="content">
            
            <div className="content-restaurant box-div">
                <div className="restaurant-content">
                    <div className="banner">
                        <RestaurantBanner banner_url={(this.state as any).data.bannerUrl} />
                    </div>
                    <div className="restaurant-info">
                      <div className="logo">
                          <LazyLoadImage src={(this.state as any).data.logo} alt="" className="restaurant-logo" />
                      </div>
                      <div className="displayname font-fsp">
                        <h1>{(this.state as any).data.name}</h1>
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

                      <div className="delivery-info box-div">
                        <span className="scheduling">Hoje</span>
                        <span className="scheduling-info">{price}</span>
                      </div>

                    </div>
                    
                    {productList()}
                    <BuyProductCard product={(this.state as any).selectedProduct} restaurant={(this.state as any).data} user={(this.state as any).userInfo} onClose={() => this.setState({selectedProduct: undefined})}/>
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
