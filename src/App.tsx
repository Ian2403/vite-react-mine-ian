import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import InfoPersonalPage from "./pages/InfoPersonalPage";
import AnimalesPage from "./pages/AnimalesPage";
import EmpleadosPage from "./pages/EmpleadosPage";
import ServiciosPage from "./pages/ServiciosPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";  
import InformacionNuevaPage from "./pages/InformacionNuevaPage.tsx";  
// Importarcion  para agregar nueva informacion
import AddAnimalesPage from "./layouts/add/AddAnimalesPage.tsx";
import AddInfoPersonalPage from "./layouts/add/AddInfoPersonalPage.tsx";
import AddServiciosPage from "./layouts/add/AddServiciosPage.tsx";
import AddEmpleadosPage from "./layouts/add/AddEmpleadosPage.tsx";
// Importarcion para editar informacion
import EditServiciosPage from "./layouts/edit/EditServiciosPage.tsx";
import EditAnimalesPage from "./layouts/edit/EditAnimalesPage.tsx";
import EditInfoPersonalPage from "./layouts/edit/EditInfoPersonalPage.tsx";
import EditEmpleadosPage from "./layouts/edit/EditEmpleadosPage.tsx";

// ==========================================
// EL GUARDIA DE SEGURIDAD (Ruta Protegida)
// ==========================================
const ProtectedRoute = () => {
  // Buscamos si guardaste el "usuario" en el navegador al hacer login
  const isLogged = localStorage.getItem("usuario");

  if (!isLogged) {
    // Si NO está logueado, lo mandamos a la fuerza al login
    return <Navigate to="/login" replace />;
  }

  // Si SÍ está logueado, lo dejamos pasar a las rutas hijas
  return <Outlet />;
};

export default function App() {
  return (
    <Routes>
      {/* 1. RUTA PÚBLICA: Cualquiera puede ver el Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* 2. RUTAS PROTEGIDAS: Requieren inicio de sesión */}
      <Route element={<ProtectedRoute />}>
        {/* Mantenemos tu MainLayout para el diseño */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/info-personal" element={<InfoPersonalPage />} />
          <Route path="/animales" element={<AnimalesPage />} />
          <Route path="/empleados" element={<EmpleadosPage />} />
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/informacion-nueva" element={<InformacionNuevaPage />} />
          {/* Ruta comodín para agregar según la tabla seleccionada */}       
          <Route path="/agregar-animales" element={<AddAnimalesPage />} />
          <Route path="/agregar-info-personal" element={<AddInfoPersonalPage />} />
          <Route path="/agregar-servicios" element={<AddServiciosPage />} />
          <Route path="/agregar-empleados" element={<AddEmpleadosPage />} />
          {/* Ruta comodín para editar según la tabla seleccionada */} 
          <Route path="/editar-servicio/:id" element={<EditServiciosPage />} />
          <Route path="/editar-animales/:id" element={<EditAnimalesPage />} />
          <Route path="/editar-info-personal/:id" element={<EditInfoPersonalPage />} />
          <Route path="/editar-empleados/:id" element={<EditEmpleadosPage />} />



          
          
        </Route>
      </Route>

      {/* 3. RUTA COMODÍN: Si escriben una URL que no existe, los mandamos al inicio */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}