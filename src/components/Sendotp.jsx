
import { BiUserCheck } from "react-icons/bi"; 
import  { useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import {reqOtpVerication } from "../api/service.js";
import { useEffect } from "react";
const schema = yup
  .object({
    token: yup.number("uniquement les nombres").positive("uniquement positive").integer("uniquement les entiers").required("invalide"),
  })
  .required()

function Sendotp({setvue,setVueGlobal,dataUser}) {
    const [slip,setSlip]=useState(1800)
    const [errOtp,setError]=useState(false)
    const [checkUser ,setChekUser] = useState(false)
    const [load,setLoad]=useState(true)
    useEffect(()=>{
        if(slip===0){
            return ()=>{
                clearInterval(timer)
            }
        }
        const timer = setInterval(() => {
          setSlip(v=>v-1)
        }, 1000);

        return ()=>{
            clearInterval(timer)
        }
    },[slip])
     const {
         register,
         handleSubmit,
         reset,
         formState: { errors },
     } = useForm({
         resolver: yupResolver(schema),
     })
     const onSubmit = (data) => {
        setLoad(false)
        const user = {
            name:dataUser.userName,
            email:dataUser.email,
            telephone:dataUser.tel,
            password:dataUser.password,
            token:data.token
    
       }
       reqOtpVerication(user).then(()=>{
        setChekUser(true)
        setTimeout(() => {
            setLoad(true)
            setVueGlobal(false)
            setvue(true)
            reset()

        }, 2600);
            
        }).catch((response)=>{
            setError(true)
            console.log(response.data);
        })
      
    }
    return (
        <>
        {
            checkUser ? (
                   <p className="text-success text-center mt-2"><BiUserCheck style={{transform:"scale(6)"}}/></p>
                ):(
                    <form onSubmit={handleSubmit(onSubmit)} className='vstack align-items-center'>
                    <h3 className='text-center'>vérification OTP</h3>
                    <p className='text-center'>nous avons envoyez un code de verification a l&apos;addresse: <b>{dataUser.email}</b></p>
                    {
                        slip!==0 ? (
                            <p className='text-center'>il vous reste <span className="text-danger fs-4"  >{slip}</span> seconde pour entrez le code</p>
                        ):(
                            <p className='text-danger fs-3'>vous avez mis trop de temps</p>
                        )
                    }
                    <input onChange={()=>setError(false)}  {...register("token")} type="text" className='form-control w-50' placeholder='entrez le code' />
                    <p>{errors.token?.message}</p>                                                                                                                                    
                    {errOtp&&<p className='text-danger'>le code que vous avez saisie est invalide</p>}
                    <button type='submit' className='btn btn-secondary mt-3 w-100'>{
                        load ? (
                            "verifier"
                        ):(
                            <span className="spinner-border m-0 p-0" role="status">
                            </span>
                        )
                    }</button>
                    
                    </form>
                )
        }
        </>
        
      )
}

export default Sendotp
