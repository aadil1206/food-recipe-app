
import "./App.css";
import Index from "./routes/index";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Search from "./component/Search";
import Catagory from "./component/Category";

function App() {
  return (
    <div className="App-main">
      <Router>
        <Search />
        <Catagory />
        <Index />
      </Router>
    </div>
  );
}

export default App;
