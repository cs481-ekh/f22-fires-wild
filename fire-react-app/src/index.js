import React from 'react'
import App from './App'
import "./styles.css"
import { BrowserRouter } from "react-router-dom"
import { render } from 'react-dom';

// const root = createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//     <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

const container = document.getElementById('root');

render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
container
);