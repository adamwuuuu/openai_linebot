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
import Setting from './pages/settings';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Sidebar user={true} username={"bei"}/>
       <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/pdf" element={<Pdf />}></Route>
        <Route exact path="/settings" element={<Setting />}></Route>
       </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
