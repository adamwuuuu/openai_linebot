import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  useNavigate,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";

import Pdf from "./pages/pdf"

function Browse() {
  // 👇️ get ID from url
  const params = useParams();
  const navigate = useNavigate();
  console.log(params);
  navigate("/"+params);

  return <h2>userId is 👉️ {params.userId}</h2>;
}

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
       <Route exact path="/:id" element={<Browse />}></Route>
       <Route exact path="/pdf" element={<Pdf />}></Route>
      </Routes>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
     </BrowserRouter>
    </div>
  );
}

export default App;
