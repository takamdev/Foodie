import { AiFillEye } from "react-icons/ai"; 
import { AiFillEyeInvisible } from "react-icons/ai"; 
import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useStore } from '../store.jsx'
import Cookies from 'js-cookie'
import { reqGetCommande, reqLogin } from '../api/service.js'
//shema de validation du formulaire
const schema = yup
  .object({
    email:yup.string().required().matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"invalid email"),
    password: yup.string().required()
  })
  .required()
function Login({setVue,vue,resetform}){
  const [load ,setLoad]= useState(true)//etat de chargement
  const [error,setError]=useState(false)//etat d'affichage de l'erreur
  const [message,setMessage]=useState('')
  const [inputType,setInputType]=useState(true)
  const setConnect = useStore((state)=>state.setConnect)

  const produit = useStore((state)=>state.produit)
  const addProduits =useStore((state)=>state.addProduits)


  const getCommande = (id,token)=>{
    reqGetCommande(id,token).then(res=>{
      let commandes = res.data.commande
      let newCartProduit = commandes.map(commd=>{
         
            let getProduit = produit.find(item=>item._id===commd.id_prod_comd)
            let commande = {...getProduit,qte:commd.qte}
             
              
           return commande
         
          })
     addProduits(newCartProduit)      
  }).catch(error=>{
    console.log(error);
  })
}
const setEye=()=>{
  setInputType(!inputType)
}
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  //rafraichir le formulaire quant on ferme le modal
  useEffect(()=>{
    reset()
  },[resetform])
 
  //cache l'erreur quant les champ change
    useEffect(()=>{
      setError(false)
    },[watch().email,watch().password])
  const onSubmit = (data) => {
    //debut chargement
    setLoad(false)
    // /api/sign
      const user = {
        ref:data.email,
        password:data.password
      }
        reqLogin(user).then(response=>{
          //chargement terminer
          setLoad(true)
          
          Cookies.set("personn",JSON.stringify(response.data),{expires:1})
          
          const cookieValue = Cookies.get('personn');
           const parsedObject = JSON.parse(cookieValue);
            setConnect([parsedObject])
  
          
          //recuperer les commande de l'utilisateur
          getCommande(response.data.id,response.data.token)
          //rafraichir le formulaire et fermerture du modal
          reset()
          document.querySelector("#clodeModal").click()
        }).catch((response)=>{
          //affichage de l'erreur
          setMessage(response.data.message)
          setError(true)
          //chargement terminer
          setLoad(true)
        })
     
  }

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)} className='vstack  align-items-center justify-content-center'>
            <input   {...register("email")} className='form-control pt-2 pb-2' type="text" placeholder="votre email... ou nom d'utilisateur" />
            <p className='text-danger'>{errors.email?.message}</p>
            <p className='form-control p-0 password-input mb-0'>
              <input   {...register("password")} type={inputType?"password":"text"} className='form-control pt-2 pb-2' placeholder='votre mot de passe...' />
             {inputType?<AiFillEyeInvisible onClick={setEye} className="eye"/>: <AiFillEye onClick={setEye} className="eye"/>} 
            </p>
            <p className='text-danger'>{errors.password?.message}</p>
            <p className='text-danger'>{error&&message}</p>
            <button disabled={!load} type='submit' className='btn btn-secondary w-50'>{
              load ? (
                "Connexion"
              ):(
                <span className="spinner-border m-0 p-0" role="status">
                </span>
              )
            }</button>
            <p className="text-center">Pas de compte ? <button className="btn btn-outline-none" onClick={()=>setVue(!vue)}>S &apos; inscrire</button> </p>
        </form>
    </>
  )
}

export default Login
