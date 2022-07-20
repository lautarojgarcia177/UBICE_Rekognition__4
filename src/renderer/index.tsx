import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Rekognize from './pages/rekognize/Rekognize';
import Rekognizing from './pages/rekognizing/Rekognizing';
import { store } from './store';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Rekognize />} />
          <Route path="rekognizing" element={<Rekognizing />} />
        </Route>
      </Routes>
    </HashRouter>
  </Provider>
);
