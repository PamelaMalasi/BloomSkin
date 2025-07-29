import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Components/Navigation';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Skinguide from './Components/Skinguide';
import Footer from './Components/Footer';
import CreateItem from "./Components/CreateItem";
import ReadAllItem from "./Components/ReadAllItem";
import { Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './Components/UserContext';
import Register from './Components/Register';
import RequireAdmin from './Components/RequireAdmin';
import LogIn from './Components/LogIn';
import InfluencerPhoto from './Components/InfluencerPhoto';
import UpdateItem from './Components/UpdateItem';
import ReadOneItem from './Components/ReadOneItem';
import Cart from './Components/Cart';
import Page404 from "./Components/Page404";




function App() {
  return (


    <div>
      <UserContextProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/skinguide" element={<Skinguide />} />
          {/* CRUD */}
          <Route
            path="/createItem"
            element={
              <RequireAdmin>
                <CreateItem />

              </RequireAdmin>
            }
          />
          <Route
            path="/uploadInfluencer"
            element={
              <RequireAdmin>
                <InfluencerPhoto />

              </RequireAdmin>
            }
          />

          <Route
            path="/updateItem/:id"
            element={
              <RequireAdmin>
                <UpdateItem />
              </RequireAdmin>
            }
          />


          <Route path="/readAllItem" element={<ReadAllItem />} />
          <Route path="/readOneItem/:id" element={<ReadOneItem />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/cart" element={<Cart />} />
          {/* 404 Page */}
          <Route path="*" element={<Page404 />} />

        </Routes>
        < Footer />
      </UserContextProvider>
    </div>


  );
}

export default App;
