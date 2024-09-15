
import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Sendotp from './Sendotp.jsx'
import  {reqRegister}  from "./../api/service.js";
const schema = yup
  .object({
    userName: yup.string().required(),
    email: yup.string().required().matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"invalid email"),
    tel: yup.string().required().matches(/^\+237\d{9}$/,"numéro invalide entrez un numéro camerounais"),
    password: yup.string().required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'le mot de passe ne correspond pas')
   
  })
  .required()

function SignUp({setVue,vue,resetform}) { 
   const [globalData , setData]=useState({})
   const [thisVue ,setThisVue]=useState(true)
   const [load , setLoad]= useState(true)
   const [message,setMessge]=useState('')
   const [error,setError]=useState(false)//etat d'affichage de l'erreur

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },                                                      
      } = useForm({
        resolver: yupResolver(schema),
      })     
        //rafraichir le formulaire quant on ferme le modal
        useEffect(()=>{
          reset()
        },[resetform])
//cacher l'erreur quant l'utilisateur saisie

      useEffect(()=>{
        setError(false)
      },[watch().confirmPassword,watch().email,watch().password,watch().tel,watch().userName])
      const onSubmit = (data) =>{
        setLoad(false)
        setData(data)
        // /api/sign-up
        // /api/sign-up/otp-auth
       const user = {
            name:data.userName,
            email:data.email,
            telephone:data.tel,
            password:data.password,

       }
       reqRegister(user).then(()=>{
        setLoad(true)
        setThisVue(false)
        reset()
       }).catch((response)=>{
  
        setMessge(response.data.message)
        setLoad(true)
        setError(true)
       })

      }

  return (
    <>
       {
        thisVue ? (
          <form onSubmit={handleSubmit(onSubmit)} className='vstack  align-items-center justify-content-center'>
            {error&& <p className='text-danger'>{message}</p>}
            <input {...register("userName")} className='form-control pt-2 pb-2' type="text" placeholder="nom d'utilisateur" />
            <p className='text-danger'>{errors.userName?.message}</p>
            <input {...register("email")} type="text" className='form-control pt-2 pb-2' placeholder='email' />
            <p className='text-danger'>{errors.email?.message}</p>
            <input {...register("tel")} type="text" className='form-control pt-2 pb-2' placeholder='telephone' />
            <p className='text-danger'>{errors.tel?.message}</p>
            <input {...register("password")} type="password" className='form-control pt-2 pb-2' placeholder='mot de passe' />
            <p className='text-danger'>{errors.password?.message}</p>
            <input {...register("confirmPassword")} type="password" className='form-control pt-2 pb-2' placeholder='repeter le mot de passe' />
            <p className='text-danger'>{errors.confirmPassword?.message}</p>
            <button type='submit' disabled={!load} className='btn btn-secondary w-50 pt-1 pb-1'>{
              load ? (
              "S'inscrire"
              ):(
                <span className="spinner-border m-0 p-0" role="status">
                </span>
              )
            }</button>
            <p className="text-center">Déjà incript ? <button   className="btn btn-outline-none" onClick={()=>{setVue(!vue) ,reset()}}>Se connecter</button> </p>
          </form>
        ):(
          <Sendotp setvue={setThisVue} setVueGlobal= {setVue} dataUser={globalData}/>
        )
       }
        {/* data-bs-toggle="modal" data-bs-target="#exampleModal" */}
        
    </>
  )
}

export default SignUp