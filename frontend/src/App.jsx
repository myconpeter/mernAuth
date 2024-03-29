import './App.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";



// components
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<HomePage />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='signup' element={<SignUpPage />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path='profile' element={<ProfilePage />} />

      </Route>



    </Route>
  )
);


function App() {


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
