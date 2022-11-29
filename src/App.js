import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//styles
import "./App.css";

//pages and components
import Dashboard from "./pages/dashboard/dashboard";
import Create from "./pages/create/create";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Project from "./pages/project/project";
import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";
import OnlineUsers from "./components/onlineUsers/onlineUsers";
import Customers from "./pages/customers/customers";
import CreateCustomer from "./pages/createCustomer/createCustomer";
import CustomerDetail from "./pages/customerDetail/customerDetail";

function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              <Route
                exact
                path="/"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/create"
                element={user ? <Create /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
              <Route
                path="/createCustomer"
                element={user ? <CreateCustomer /> : <Navigate to="login/" />}
              />
              <Route
                path="/customers"
                element={user ? <Customers /> : <Navigate to="/login" />}
              />
              <Route
                path="/projects/:id"
                element={user ? <Project /> : <Navigate to="/login" />}
              />
              <Route
                path="/customerDetail/:name"
                element={user ? <CustomerDetail /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
