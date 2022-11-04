import type { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router'
import NavbarComponent from '../../components/NavbarComponent'
import ShopList from '../../components/ShopList'
import { auth } from '../../utils/firebase'
import { AddressInput } from '../AddressInput'
import { BasePage } from '../BasePage'

import './index.css'

export class Class extends BasePage{
  
  componentDidMount(): void {
    super.componentDidMount()
  }

  render(): ReactNode {

    if(auth.currentUser && !this.state.userInfo.address){
      return (<AddressInput user={this.state.userInfo} />)
    }

    return (
      <>

        <NavbarComponent user={this.state.userInfo} onSignOut={this.signOut}/>
        <div className="content">
          <ShopList user={this.state.userInfo} />
        </div>
      </>)

  }
}

function Welcome() {
  let navigate = useNavigate();
  return <Class navigate={navigate} />
}

export default Welcome

