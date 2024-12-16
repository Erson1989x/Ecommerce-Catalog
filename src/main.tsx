
import ReactDOM from 'react-dom/client'; // Keep this import
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import './index.css';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);