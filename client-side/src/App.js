import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Home/Home";

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <Home />
      </div>
    </>
  );
}

export default App;
