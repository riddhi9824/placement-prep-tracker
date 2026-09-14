import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddApplication from "./pages/AddApplication";
import Applications from "./pages/Applications";
import DSA from "./pages/DSA";

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
        />
        <Route 
            path="/add" 
            element={
              <ProtectedRoute>
                <AddApplication />
              </ProtectedRoute>
            }
        />
        <Route
            path="/applications"
            element={
              <ProtectedRoute>
                <Applications />
              </ProtectedRoute>
            }
        />
        <Route 
            path="/dsa" 
            element={
                <ProtectedRoute>
                  <DSA />
                </ProtectedRoute>
            } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;