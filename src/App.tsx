import { Route, Routes } from 'react-router-dom';
import './App.css';
import RouterMain from './routers/RouterMain';
import RouterLog from './routers/RouterLog';

function App() {
  return (
    <Routes>
      <Route path='/' element={<RouterMain />} />
      <Route path='/log' element={<RouterLog />} />
    </Routes>
  );
}

export default App;
