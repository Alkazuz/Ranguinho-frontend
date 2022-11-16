import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Inicio from './pages/inicio'
import Restaurante from './pages/restaurante'
import PhoneLogin from './pages/login/PhoneLogin'
import EmailLogin from './pages/login/EmailLogin'
import Restaurantes from './pages/restaurantes'
import LoginMain from './pages/login/LoginMain'

function App() {

  return (
    
    <Router>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/inicio' element={<Inicio />} />

        <Route path='/restaurante/:id' element={<Restaurante />} />
        <Route path='/restaurantes' element={<Restaurantes />} />

        <Route path='/login' element={<LoginMain />} />
        <Route path='/login/celular' element={<PhoneLogin />} />
        <Route path='/login/email' element={<EmailLogin />} />

      </Routes>
    </Router>
  )
}
// yarn add react-icons
export default App