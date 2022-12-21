import type { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router'
import NavbarComponent from '../../components/NavbarComponentDesktop'
import ShopList from '../../components/ShopList'
import { BasePage } from '../BasePage'

import './index.css'

export class Class extends BasePage{
  
  componentDidMount(): void {
    super.componentDidMount()
  }

  render(): ReactNode {
    return (
      <>

        <NavbarComponent user={(this.state as any).userInfo}  onSignOut={this.signOut}/>
        <div className="content">
          <ShopList user={(this.state as any).userInfo} navigate={(this.state as any).navigate} />
        </div>
      </>)

  }
}

function Restaurantes() {
  let navigate = useNavigate();
  return <Class navigate={navigate} />
}

export default Restaurantes

