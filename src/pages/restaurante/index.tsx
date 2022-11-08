import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import NavbarComponent from '../../components/NavbarComponentDesktop';
import RestaurantBanner from '../../components/RestaurantComponents/RestaurantBanner';
import { RestaurantInterface } from '../../constants/Interfaces';
import api from '../../services/api';

import './index.css'

const index: FC = () => {

  let { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<RestaurantInterface | undefined>(undefined)

  let consultaAPI = async () => {
    
    await api.get(`/restaurant/find/${id}`)
      .then(response => {
        if(response.status == 200){
          setData(response.data)
          setLoading(false)
        }
        
        
      })
  }

  useEffect(() => {
      if(!loading){
        document.title = `${data.name} | Ranguinho`
      }
      if (loading) {
        consultaAPI();
      }
    }, [loading])

  if(loading) return <></> ;
  else{
    return (
      <>
        <NavbarComponent />
        <div className="content">
            <div className="restaurant-content">
                <RestaurantBanner banner_url={data.logo} />

            </div>
        </div>
      </>
    )
  }

  
}

export default index
