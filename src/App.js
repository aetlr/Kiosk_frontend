import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './page/StartPage';
import OrderPage from './page/OrderPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </Router>
  );
}

export default App; 