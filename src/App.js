import { ToastContainer } from "react-bootstrap";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainComponent from "./components/MainComponent";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <ToastContainer />
      <Header></Header>
      <Sidebar></Sidebar>
      <div class="content-wrapper">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default App;
