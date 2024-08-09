import './App.css';
import RouterMain from './routers/RouterMain';
import RouterLog from './routers/RouterLog';
import { HashRouter, Route } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Route exact path='/' component={RouterMain} />
      <Route path='/log' component={RouterLog} />
    </HashRouter>
  );
}

export default App;
