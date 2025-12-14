import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About'; // Import About Page
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Mentorship from './pages/Mentorship';
import ProjectInquiry from './pages/ProjectInquiry';
import CreatorGuide from './pages/CreatorGuide';
import Blogs from './pages/Blogs';
import BlogPost from './pages/BlogPost';
import Resources from './pages/Resources';
import ForgotPassword from './pages/ForgotPassword';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import AdminLogin from './pages/AdminLogin';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/signup', '/forgot-password', '/admin-login'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="bg-tech-bg min-h-screen text-gray-100 font-inter">
      <AuthProvider>
        {shouldShowNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/mentorship" element={
            <ProtectedRoute>
              <Mentorship />
            </ProtectedRoute>
          } />
          <Route path="/start-project" element={
            <ProtectedRoute>
              <ProjectInquiry />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/creator-guide" element={<CreatorGuide />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogPost />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />

          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedAdminRoute>
              <AdminPanel />
            </ProtectedAdminRoute>
          } />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
}


export default App;
