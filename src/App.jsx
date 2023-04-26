import InputContent from './pages/addcontent/InputContent'
import SignIn from './pages/signinpage/SignIn';
import SignUp from './pages/signuppage/SignUp';
import Home from './pages/homepage/Home'
import { Routes,Route } from 'react-router-dom';
import './App.css'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/inputcontent' element={<InputContent/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
    </Routes>
    </>
  )
}

export default App
