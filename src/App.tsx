import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Welcome from './pages/welcome'
import Restaurante from './pages/restaurante'
import PhoneLogin from './pages/login/PhoneLogin'
import LoginMain from './pages/login/LoginMain'
import EmailLogin from './pages/login/EmailLogin'
import Restaurantes from './pages/restaurantes'

function App() {

  return (
    
    <Router>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/inicio' element={<Welcome />} />

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