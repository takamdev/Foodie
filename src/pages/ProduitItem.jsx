

import { useStore } from '../store.jsx'
import  { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useParams } from 'react-router-dom';
import Commentaire from '../components/Commentaire.jsx';

function ProduitItem() {
  let {id}=useParams()
  console.log(id);
  const addProduit =useStore((state)=>state.addProduit)
  const produitList = useStore((state)=>state.produit)
  const Card = useStore((state)=>state.CARD)
  const [Produit,setProduit] =useState({})

  useEffect(()=>{
    let getProduit = produitList.find(item=>item._id===id)
    setProduit(getProduit)
},[])
const addToCard =()=>{
    const isExiste = Card.find(item=>item._id===id)
    if(!isExiste){
        addProduit(Produit)
    }else{
       toast.warning('le produit est déjà dans le panier',{
          className:"text-danger"
       })
    }
    
  }

  return (
    <section className='container'>
     <article className='row'>
        <div className="col-lg-4 col-md-6 col-sm-12">
           <img src={`/${Produit.image}`}  alt="image" className='w-100 h-100' />
        </div>
        <div className="col-lg-8 col-md-6 col-sm-12 me-auto lh-1">
            <p className='fs-3 fw-bold'>{Produit.name}</p>
            <h5 className="">
                <span className="ms-auto fs-2 text-danger">★</span>
                <span className="fs-2 text-danger">★</span>
                <span className="ms-auto fs-2 text-danger">★</span>
                <span className="fs-2 text-danger">★</span>
                <span className="fs-2">★</span>
                <span className='ms-3'>(122)</span>
            </h5>
            <p><span className='fs-4 opacity-50 text-decoration-line-through'>2000 FCFA</span> <span className='ms-3 fs-4  text-success'>{Produit.price} FCFA</span></p>
            <p>{Produit.description}</p>
            <button onClick={addToCard} className='btn btn-primary mt-3'>Ajouter au panier</button>
        </div>
    </article>
   <p className="fs-4 mt-3 fw-bold">Commentaires</p>
    <Commentaire id={id}/>
  </section>
  )
}

export default ProduitItem