import './App.css';
import LeaderBoard from './components/LeaderBoard';
import Setting from './components/Setting';
import Simulator from './components/Simulator';
import Title from './components/Title';

function App() {
  return (
    <div className="App">
      <Title />
      <Setting />
      <LeaderBoard />
      <Simulator />
    </div>
  );
}

export default App;
