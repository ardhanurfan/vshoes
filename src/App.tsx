import {
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Cookies from "js-cookie";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

const ProtectedRoute = () => {
  const token = Cookies.get("token_vshoes");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {/* <Navbar /> */}
      <Outlet />
    </>
  );
};

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Dummy title={"Not Found"} />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<LandingPage />} />
      </Route>
    </Routes>
  );
}

function Dummy({ title }: { title: string }) {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      {title}
    </div>
  );
}