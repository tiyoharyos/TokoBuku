import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Button, ButtonGroup, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LisBuku from './components/ListBuku';
import EditBuku  from "./components/updateData";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LisBuku/>}/>
        <Route path="updateBuku/:id" element={<EditBuku/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
