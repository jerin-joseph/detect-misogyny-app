import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Link  } from 'react-router-dom';
import Result from "./components/Result";

function App() {
  return (
    <>
    <Router>
            <Route exact path="/" component={Home} />
            <Route path="/result" component={Result} />
    
    </Router>
    
    </>
  );
}

export default App;
