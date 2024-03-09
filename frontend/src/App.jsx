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


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<HomePage />} />


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
