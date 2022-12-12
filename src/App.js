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
import CustomerBugLog from "./pages/customerBugLog/customerBugLog";
import CustomerNotes from "./pages/customerNotes/customerNotes";
import CustomerComplaints from "./pages/customerComplaints/customerComplaints";
import CustomerInvoices from "./pages/customerInvoices/customerInvoices";
import ArchivedProjects from "./pages/archivedProjects/archivedProjects";
import Messenger from "./pages/messenger/messenger";
import Holidays from "./pages/holidays/holidays";

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
                path="/customerDetail/:id"
                element={user ? <CustomerDetail /> : <Navigate to="/login" />}
              />
              <Route
                path="/customerDetail/:id/notes"
                element={user ? <CustomerNotes /> : <Navigate to="/login" />}
              />
              <Route
                path="/customerDetail/:id/bugLog"
                element={user ? <CustomerBugLog /> : <Navigate to="/login" />}
              />
              <Route
                path="/customerDetail/:id/complaints"
                element={
                  user ? <CustomerComplaints /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/customerDetail/:id/invoiceHistory"
                element={user ? <CustomerInvoices /> : <Navigate to="/login" />}
              />
              <Route
                path="/archivedProjects"
                element={user ? <ArchivedProjects /> : <Navigate to="/login" />}
              />
              <Route
                path="/messenger"
                element={user ? <Messenger /> : <Navigate to="/login" />}
              />
              <Route
                path="/holidays"
                element={user ? <Holidays /> : <Navigate to="/login" />}
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
