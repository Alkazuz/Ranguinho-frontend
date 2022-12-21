import type { FC, ReactNode } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useNavigate } from 'react-router'
import { CardBannerList } from '../../components/CardBannerList'
import { CategoryList } from '../../components/CategoryList'
import NavbarComponent from '../../components/NavbarComponentDesktop'
import NavbarComponentMobile from '../../components/NavbarComponentMobile'
import ShopList from '../../components/ShopList'
import api from '../../services/api'
import { auth } from '../../utils/firebase'
import { AddressInput } from '../AddressInput'
import { BasePage } from '../BasePage'

import './index.css'

export class Class extends BasePage{
  
  constructor(props){
    super(props);
    (this.state as any) = {
        userInfo: undefined,
        data: undefined
    }
  }

  onLoggedIn(user: any): void {
    api.get(`/start/${user.lat}/${user.long}`)
          .then(response => {
            this.setState({data: response.data})
      })
  }

  componentDidMount(): void {
    super.componentDidMount()
  }

  render(): ReactNode {
    if(auth.currentUser && ((this.state as any).userInfo == undefined || !(this.state as any).userInfo.address)){
      return (<AddressInput user={(this.state as any).userInfo} navigate={this.props.navigate} />)
    }

    return (
      <>

        <NavbarComponent user={(this.state as any).userInfo} onSignOut={this.signOut}/>
        <NavbarComponentMobile user={(this.state as any).userInfo} onSignOut={this.signOut}/>
        
        <div className="content">
          {(this.state as any).data && <CategoryList restaurants={(this.state as any).data.restaurants} categories={(this.state as any).data.categories} />}
          {(this.state as any).data && <CardBannerList cards={(this.state as any).data.banners}/>}
          <ShopList user={(this.state as any).userInfo} navigate={this.props.navigate}/>
        </div>
      </>)

  }
}

function Inicio() {
  let navigate = useNavigate();
  return <Class navigate={navigate} />
}

export default Inicio

