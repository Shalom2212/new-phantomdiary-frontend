import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,Routes,Route,Switch} from 'react-router-dom';
import App from './App.jsx'
import './index.css'
// import { disableReactDevTools } from '@fvilers/disable-react-devtools';

// if(process.env.NODE_ENV === 'production') disableReactDevTools

ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
    <Switch>
      <Routes>
        <Route path="/*" element={<App/>}/>
      </Routes>
    </Switch>
</BrowserRouter>

);
