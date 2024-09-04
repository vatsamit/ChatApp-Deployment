import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {AuthProvider} from "./context api/AuthProvider.jsx"
import { BrowserRouter } from 'react-router-dom'
import { SocketProvider } from './context api/SocketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  

    <BrowserRouter>
    <AuthProvider>
    <SocketProvider>
    <App />
    </SocketProvider> 
    </AuthProvider>
    </BrowserRouter>

);
