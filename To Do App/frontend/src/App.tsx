import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { CssBaseline } from '@mui/material';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import TaskList from './components/tasks/TaskList';
import Header from './components/layout/Header';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex flex-1 items-center justify-center p-4 mt-16">
              <div className="w-full max-w-md">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/tasks"
                    element={
                      <ProtectedRoute>
                        <TaskList />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/" element={<Navigate to="/tasks" replace />} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
