
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RegisterOnu from './pages/RegisterOnu/RegisterOnu';
import SeeOnu from './pages/SeeOnu/SeeOnu';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterOnu/>} />
        <Route path="/SeeOnu" element={<SeeOnu/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
