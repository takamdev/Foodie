import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Not_found  from "./pages/Not_found";
import Contact from "./pages/Contact.jsx";
import Commande from "./pages/Commande.jsx";
import HistoCommande from "./pages/HistoCommande.jsx";
import ProduitItem from "./pages/ProduitItem.jsx";
import { RouterProvider } from "react-router-dom";
import Root from "./Root.jsx";
import Menu from "./pages/Menu.jsx";



function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element:<Root/>,
      errorElement:<Not_found/>,
      children:[
        {
          path:"",
          element:<Home/>,
        },
        { path:"contact",
          element:<Contact/>
        },
        {
          path:'commd',
          element:<Commande/>
        },
        {
           path:"histo-commande",
           element:<HistoCommande/>
        },
        {
           path:"menu",
           element:<Menu/>
        },
        {
          path:"produit/:id",
          element:<ProduitItem/>
        }

      ]
          
      
    }
  ])



  return (
    <RouterProvider router={router}/>
  )
}

export default App