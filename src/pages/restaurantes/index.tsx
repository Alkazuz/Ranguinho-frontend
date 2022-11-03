import type { FC, ReactNode } from 'react'
import NavbarComponent from '../../components/NavbarComponent'
import ShopList from '../../components/ShopList'
import { BasePage } from '../BasePage'

import './index.css'

export class Restaurantes extends BasePage{
  
  render(): ReactNode {
    return (
      <>

        <NavbarComponent user={this.state.userInfo} />
        <div className="content">
          <ShopList />
        </div>
      </>)

  }
}

