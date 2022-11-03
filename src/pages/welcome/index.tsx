import type { FC } from 'react'
import NavbarComponent from '../../components/NavbarComponent'
import ShopList from '../../components/ShopList'

import Autocomplete from "react-google-autocomplete";
import './index.css'

const Welcome: FC = () => {
  return (
      <>

        <NavbarComponent />
        <div className="content">
          <ShopList />
        </div>
      </>
  )
}

export default Welcome
