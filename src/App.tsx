import './App.css';
import LeaderBoard from './components/LeaderBoard';
import Setting from './components/Setting';
import Title from './components/Title';

function App() {
  return (
    <div className="App">
      <Title />
      <Setting />
      <LeaderBoard />
    </div>
  );
}

export default App;
