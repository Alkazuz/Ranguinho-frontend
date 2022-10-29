import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Welcome from './pages/welcome'
import Restaurante from './pages/restaurante'

function App() {

  return (
    
    <Router>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/restaurante' element={<Restaurante />} />
      </Routes>
    </Router>
  )
}
// yarn add react-icons
export default App