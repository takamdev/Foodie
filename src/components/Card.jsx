

import { AiFillPlusCircle } from "react-icons/ai"; 
import { useNavigate } from "react-router-dom";
import { useStore } from "../store.jsx";
import { toast } from "sonner";

export default function Card({ produit }) {

   const addCard = useStore((state)=>state.addProduit)
   const Card = useStore((state)=>state.CARD)

    const navigateTo = useNavigate()

    const redirection = ()=>{
      navigateTo(`/produit/${produit._id}`)
    }

    const addToCard =(id)=>{
      const isExiste = Card.find(item=>item._id===id)
      if(!isExiste){
         addCard(produit)
      }else{
         toast.warning('le produit est déjà dans le panier',{
            className:"text-danger"
         })
      }
      
    }
    
   return (
      <div className="card">
         <div className="imageHome">
        
            <img
                src={`/${produit.image}`}
                className="card-img-top"
                alt="image"
                width={100000}
                height={250}
                role="button"
                onClick={redirection}

            />
            <AiFillPlusCircle onClick={()=>{addToCard(produit._id)}} role="button" className="icone" />
         </div>
         <div className="card-body">
            <h5 className="card-title hstack"><span className="titre me-auto">{
               
               produit.name.length>8 ? produit.name.slice(0,8)+"..." : produit.name
               
               }</span> <span className="ms-auto titre ">★ ★ <i className="text-danger">★</i></span></h5>
            <p className="card-text">
               {produit.description}
            </p>
           <p className="hstack">
             <span className="text-danger">{produit.price} FCA</span>
             <span className="ms-auto">{produit.category}</span>

           </p>
         </div>
      </div>
   );
}
