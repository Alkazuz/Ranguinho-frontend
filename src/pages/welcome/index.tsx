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
          <Autocomplete
            apiKey={'AIzaSyDhnPHfLISXT_d2wFtxq25dW7Ona0APPHs'}
            onPlaceSelected={(place) => console.log(place)}
          />
          <ShopList />
        </div>
      </>
  )
}

export default Welcome
