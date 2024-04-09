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
import VerifiedLink from './pages/VerifiedLink';
import RecoveryEmail from './pages/RecoveryEmail';
import ChangePassword from './pages/ChangePassword';
import ConfirmLink from './pages/ConfirmLink';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' >

      <Route path="/" element={<Header />}>
        <Route index element={<HomePage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='resetpassword' element={<RecoveryEmail />} />
        <Route path='getPassword/:userId/:resetString' element={<ChangePassword />} />

        <Route path='signup' element={<SignUpPage />} />
        <Route path='' element={<PrivateRoute />}>
          <Route path='profile' element={<ProfilePage />} />

        </Route>

      </Route>
      <Route path='verifiedlink' element={<VerifiedLink />} />
      <Route path='confirmverification/:userId/:resetString' element={<ConfirmLink />} />

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
