import { Routes, Route } from "react-router-dom";
import Login from "./login";
import Sign from "./sign";
import Home from "./home";
import AnalysisForm from "./formulaire"; 
import Patient from "./patient";
import Analyst from "./analyst";
import Contact from "./contact";
import About from "./about";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/formulaire" element={<AnalysisForm />} /> 
      <Route path="/sign" element={<Sign />} />
      <Route path="/signin" element={<Login />} /> 
       <Route path="/patient" element={<Patient/>} />
      <Route path="/analyst" element={<Analyst />} />
      <Route path="/contact" element={<Contact/>}></Route>
      <Route path="/aboutUs" element={<About/>}></Route>
    </Routes>
  );
}