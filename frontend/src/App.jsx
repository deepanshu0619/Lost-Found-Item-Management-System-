import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
      return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <Router>
      <nav className="navbar navbar-dark bg-primary mb-4 p-3 shadow-sm">
          <div className="container">
              <a className="navbar-brand fw-bold" href="/">Lost & Found Item Management System</a>
          </div>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
