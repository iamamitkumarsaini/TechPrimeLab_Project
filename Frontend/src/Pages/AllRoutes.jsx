import React from "react";
import { Route, Routes } from "react-router-dom";
import Hompage from "./Homepage";
import Projects from "./Projects";
import AddProjects from "./AddProjects";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";


function AllRoutes (){
     return (
      <Routes>
        <Route path="/" element={<PrivateRoute><Hompage /></PrivateRoute>}></Route>
        <Route path="/projects" element={<PrivateRoute><Projects /></PrivateRoute>}></Route>
        <Route path="/add/project" element={<PrivateRoute><AddProjects /></PrivateRoute>}></Route>

        <Route path="/login" element={<Login />}></Route>
     </Routes>
     )
}

export default AllRoutes;