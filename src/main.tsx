import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {GlobalStyle} from '@/style';
import {RecoilRoot} from 'recoil';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyle />
      <App />
    </RecoilRoot>
  </React.StrictMode>,
)
