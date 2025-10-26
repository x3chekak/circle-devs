import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from './redux'
import WelcomePage from './pages/WelcomePage/WelcomePage.tsx';
import DataPage from './pages/DataPage/DataPage.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/data" element={<DataPage />} />
      </Routes>
    </Router>
  </Provider>
)
