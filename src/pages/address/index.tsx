import type { FC, ReactNode } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useNavigate } from 'react-router'
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


  componentDidMount(): void {
    super.componentDidMount()
  }

  render(): ReactNode{

    return (
      <>

        <AddressInput user={(this.state as any).userInfo} navigate={this.props.navigate}/>
      </>)

  }
}

function Address() {
  let navigate = useNavigate();
  return <Class navigate={navigate} />
}

export default Address

