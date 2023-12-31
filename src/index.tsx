import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/nunito';
import 'i18n/i18n';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import theme from 'themes/theme';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './assets/fonts/nunito-sans.woff2';
import './assets/fonts/ubuntu-mono.woff2';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
        <ToastContainer />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
