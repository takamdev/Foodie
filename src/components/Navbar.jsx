
import { TbSquarePlus } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai"; 
import { GiShoppingCart } from "react-icons/gi";
import { FaUserAlt } from "react-icons/fa"; 
import { FaShoppingBag } from "react-icons/fa"; 
import  {useState } from 'react'
import "./nav.css"
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
import { useStore } from "./../store.jsx";
import { toast } from "sonner";
import axios from "axios";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { CgRemoveR } from "react-icons/cg";


function Navbar() {
    const navigateTo = useNavigate()
    const [vue,setVue]= useState(false)
    const[reset,setReset]=useState(false)
    const isConnect = useStore((state)=>state.isConnect)
    const setConnect =useStore((state)=>state.setConnect)
    const Card = useStore((state)=>state.CARD)
    const host = useStore((state)=>state.host)
    const resetCard = useStore((state)=>state.resetCard)
    const [load,SetLoad]=useState(true)
    // gesion des session avec cookie
  useEffect(()=>{
    const cookieValue = Cookies.get('personn');
    if (cookieValue!==undefined) {
      const parsedObject = JSON.parse(cookieValue);
      setConnect([parsedObject])
    } else {
      setConnect([])

    }
  },[])

    const addQte = (id)=>{
        let newCart =Card.map(item=>{
           if(item.qte<10){
            if(item._id===id){
              return {
                ...item,qte:item.qte+1
              }
             }else{
              return item
             }
           }else{
            return item
           }
        })
        resetCard(newCart)
    }
    const removeQte = (id)=>{
      let newCart =Card.map(item=>{
        if(item.qte>1){
         if(item._id===id){
           return {
             ...item,qte:item.qte-1
           }
          }else{
           return item
          }
        }else{
          return item
         }
     })
     resetCard(newCart)
    }

    const deleteProduitToCart =(id)=>{
       let newCart = Card.filter(item=>item._id!==id)
       resetCard(newCart)
       const idUitl=isConnect[0].id
       const token = isConnect[0].token //authorization
       const Axios = axios.create({
        headers:{
          authorization:`Bearer ${token}`
        }
       })
       Axios.post(host+`/api/commd/delete/${id}`,{userId:idUitl}).then(res=>{
        resetCard(newCart)
        toast.success(res.data.message,{
          className:'text-success'
        })
       }).catch(err=>{
        console.log(err);
       })
       
    }
const commmander=()=>{
  if(Card.length===0){
    toast.warning('le panier est vide ajouter des produit',{
      className:"text-danger"
    })
  }else{
    SetLoad(false)
    for (let index = 0; index < Card.length; index++) {
      const idUitl=isConnect[0].id
      const token = isConnect[0].token //authorization
      const commd ={
        id_prod_comd:Card[index]._id,
        id_util_comd:idUitl,
        qte:Card[index].qte,
        userId:idUitl
      }
      const Axios = axios.create({
        headers:{
          authorization:`Bearer ${token}`
        }
      })
     Axios.post(host+'/api/commande/post',commd).then(()=>{
      if(index===Card.length-1){SetLoad(true) ,resetCard([])}
     }).catch(({response})=>{
      if(index===Card.length-1){SetLoad(true), resetCard([])}
      console.log(response.data);
     })
    }
  }
  
}
const closeNav = ()=>{
  const currentWidth = window.innerWidth;
  if(currentWidth<993) document.querySelector("#navbarToggle").click()

}
const logOut = ()=>{
  Cookies.remove("personn")
  setConnect([])
}
  return (
  <>
      
      <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{vue?"S'inscrire":"Se connecter"}</h1>
              <button type="button" id="clodeModal" onClick={()=>{setVue(false),setReset(!reset)}} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            {
              vue?(
              <>
                <SignUp resetform={reset} setVue={setVue} vue={vue}/>
              </>
              ):(
              <>
                  <Login  resetform={reset} setVue={setVue} vue={vue}/>
              </>
              )
            }
            </div>
          </div>
        </div>
      </div>
      

      <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
        <div className="offcanvas-header">
          <h4 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">votre panier <GiShoppingCart /></h4>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <h4>Total:
            {
              Card.reduce((some,item)=>{
                return some + (item.qte*item.price)
          },0)
            }
            FCFA</h4>
          {
            isConnect.length ===0 ? 
            (<button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal">Connecter vous</button>
          ):(
              <div className="hstack">
                 <button disabled={!load} onClick={commmander} className="btn btn-primary">
                    {
                      load ? (
                        "Commander"
                      ):(
                        "Commande..."
                      )
                    }
                 </button>
                 <button  onClick={()=>{navigateTo("/histo-commande")}} data-bs-dismiss="offcanvas" aria-label="Close" className="btn btn-primary ms-auto"  >
                    historique de commandes
                 </button>
              </div>
            
            )
            
          }
          {
            Card.length===0 ?(
              <p className="display-5 text-center">aucun produit dans le panier</p>
            ):(
              <table className="table">
              <thead>
                <tr>
                  <th className="text-center" scope="col">item</th>
                  <th className="text-center" scope="col">titre</th>
                  <th className="text-center" scope="col">prix</th>
                  <th className="text-center" scope="col">qte</th>
                  <th className="text-center" scope="col">enlever</th>
                </tr>
              </thead>
              <tbody>
                {
                  Card.map((item,key)=>{
                    return (
                      <tr key={key} className="w-100 p-0 border-bottom">
                        <th className=" border-0 " scope="row"><img width={40} height={40} src={`/${item.image}`} alt="item" /></th>
                        <td className=" border-0 ">{item.name}</td>
                        <td className=" border-0 fs-3">{item.price}</td>
                        <td className="d-flex border-0 fs-3"><TbSquarePlus onClick={()=>{addQte(item._id)}} role="button" className="fs-1 mt-2 text-primary" /><span className="fs-5 mt-2 text-secondary">{item.qte}</span><CgRemoveR onClick={()=>removeQte(item._id)} className="fs-1 mt-2"/></td>
                        <td className=" border-0 "><AiFillDelete onClick={()=>{deleteProduitToCart(item._id)}} role="button" className="text-danger fs-1 mt-2"/></td>
                      </tr>
                      )
                  })
                }
              
               
              </tbody>
            </table>
            )
          }

        </div>
      </div>

      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold" href="/">FOODIE</Link>
            <button className={`navbar-toggler`} type="button" id="navbarToggle" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className={`nav-link `  } onClick = {closeNav}  to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={`nav-link` } onClick = {closeNav}  to="/menu">Menu</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={`nav-link ` } onClick = {closeNav} to="/contact">Contact</NavLink>
                </li>
              </ul>
            
            </div>
          
          </div>
          <section className={`iconePanier hstack gap-3`}>
                <p className="fs-2 position-relative"><FaShoppingBag role="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" /> 
                    <span style={{
                    width:"25px",
                    height:"25px",
                    fontSize:"22px",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    top:"0",
                    left:"10px"
                    }} className="text-white bg-danger position-absolute rounded-circle">
                      <b>{Card.length}</b>
                    </span>  
                </p>
                {
                  isConnect.length!==0?(
                    <div className="btn-group me-2">
                    <p type="button" className="fs-2" data-bs-toggle="dropdown" aria-expanded="false">
                    <FaUserAlt />
                    </p>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li role="button" className="dropdown-item">{isConnect[0].userName}</li>
                        <li role="button" className="dropdown-item" onClick={logOut}>log out</li>
                      
                    </ul>
                    </div>
                  ):(
                    <button className="btn rounded-pill  border-primary" data-bs-toggle="modal" data-bs-target="#modal">Login</button>
                  )
                }
              
              
            
              
          </section>
      </nav>
    
  </>

  )
}

export default Navbar