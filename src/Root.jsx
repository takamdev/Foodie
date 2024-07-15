import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import { useStore } from "./store.jsx"
import { useEffect } from "react"
import axios from "axios"
import { Toaster } from "sonner"

function Root() {
  const produit = useStore((state)=>state.produit)
  const host = useStore((state)=>state.host)
  const updateProduit = useStore((state)=>state.updateProduit)
  const updateMenu = useStore((state)=>state.updateMenu)
  useEffect(()=>{
     axios.get(host).then(response=>{
        updateProduit(response.data.Foot_list)
        updateMenu(response.data.Menu_list)
     }).catch(err=>{
        console.log(err);
     })
  },[])

  if(produit.length!==0){
    return (
      <main className="container-fluid pt-5">
      <Toaster position="top-center" />
      <Navbar/>
      <Outlet/>
      <Footer/>
      </main>
    )
  }else{
    return (

        <div className="loading">
           <p><span className="spinner-border text-info" style={{width:"5rem",height:"5rem"}} ></span></p>
        </div>

    )
  }
 

}

export default Root