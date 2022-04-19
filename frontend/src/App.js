// General Imports
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Pages Imports
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
// Component Imports
import Navbar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import SelectedVideo from './pages/SelectedVideo/SelectedVideo';

// Util Imports
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            //  <PrivateRoute>
            <HomePage />
            // </PrivateRoute>
          }
        />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/selected-video/:videoId' element={<SelectedVideo />} />
        <Route path='/:query' element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
