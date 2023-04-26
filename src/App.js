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

import Sidebar from './components/sidebar';

import Pdf from "./pages/pdf"
import Home from "./pages/home"


function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Sidebar />
      <Routes>
       <Route exact path="/" element={<Home />}></Route>
       <Route exact path="/pdf" element={<Pdf />}></Route>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
