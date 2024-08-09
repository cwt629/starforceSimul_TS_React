import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import RouterMain from './routers/RouterMain';
import RouterLog from './routers/RouterLog';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<RouterMain />} />
        <Route path='/log' element={<RouterLog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
