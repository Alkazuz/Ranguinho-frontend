import type { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router'
import NavbarComponent from '../../components/NavbarComponent'
import ShopList from '../../components/ShopList'
import { BasePage } from '../BasePage'

import './index.css'

export class Class extends BasePage{
  
  componentDidMount(): void {
    console.log('aaa')
    super.componentDidMount()
  }

  render(): ReactNode {
    return (
      <>

        <NavbarComponent user={this.state.userInfo} onSignOut={this.signOut}/>
        <div className="content">
          <ShopList />
        </div>
      </>)

  }
}

function Restaurantes() {
  let navigate = useNavigate();
  return <Class navigate={navigate} />
}

export default Restaurantes

