import type { FC, ReactNode } from 'react'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useLocation, useNavigate } from 'react-router'
import queryString from 'query-string'
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
        data: undefined,
        query: undefined
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
    const values = queryString.parse(this.props.params.search)
    this.setState({query: values})
    console.log(values)
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
          {(this.state as any).query && <ShopList user={(this.state as any).userInfo} navigate={this.props.navigate} category={(this.state as any).query.category} />}
          
        </div>
      </>)

  }
}

function Buscar() {
  let navigate = useNavigate();
  const query = useLocation();
  return <Class navigate={navigate} params={query}/>
}

export default Buscar

