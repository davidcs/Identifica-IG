
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { IGProvider } from "./contexts/IGContext";

// Pages
import Index from "./pages/Index";
import About from "./pages/About";
import MapPage from "./pages/MapPage";
import IGDetail from "./pages/IGDetail";
import IGDetailSuggestion from "./pages/IGDetailSuggestion";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SuggestPage from "./pages/SuggestPage";
import AdminPage from "./pages/AdminPage";
import AdminIGPage from "./pages/AdminIGPage";
import UsersAdminPage from "./pages/UsersAdminPage";
import IGsListPage from "./pages/IGsListPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <IGProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/igs" element={<IGsListPage />} />
              <Route path="/ig/:id" element={<IGDetail />} />
              <Route path="/igsuggestions/:id" element={<IGDetailSuggestion />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/suggest" element={<SuggestPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/users" element={<UsersAdminPage />} />
              <Route path="/admin/igs" element={<AdminIGPage />} />
              <Route path="/igs-list" element={<IGsListPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </IGProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
