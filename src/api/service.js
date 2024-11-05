import axios from "axios";
const baseUrl = "https://backend-restaurant-six.vercel.app/"


const Axios = new axios.create({
    baseURL:baseUrl
})

function errorResponse(error){
    console.log(error);
    
    if(error instanceof axios.AxiosError){
        return error.response
    }else{
        return error
    }
}
export const Headers=(token,userId)=>{
    return {headers: { authorization:`Bearer ${token}`,userId:userId?userId:"" } }
}
export const reqGetAll = async ()=>{
    try {
        return await Axios.get()
    } catch (error) {
        throw  errorResponse(error)
    }
}

export const reqRegister = async (user)=>{
    try {
        return await Axios.post('/api/sign-up',user)
    } catch (error) {
        throw errorResponse(error)
    }
}

export const reqOtpVerication = async (user) =>{
    try {
      return await  Axios.post("/api/sign-up/otp-auth",user)
    } catch (error) {
        throw  errorResponse(error)
        
    }
}

export const reqDeleteProduit = async (id,user)=>{
   try {
      return await Axios.post(`/api/commd/delete/${id}`, {userId:user.id} , Headers(user.token) )
   } catch (error) {
    throw errorResponse(error)
   }
}

export const reqCommande = async (commd,user)=>{
    try {
       return await Axios.post('/api/commande/post',commd,Headers(user.token))
    } catch (error) {
        throw errorResponse(error)
    }
}

export const reqGetCommande= async (id,token)=>{
    try {
      return await Axios.get(`/api/commande/${id}`,Headers(token,id))
    } catch (error) {
      throw errorResponse(error)
    }
  }
export const reqLogin = async (user)=>{
    try {
       return await Axios.post('/api/sign',user) 
    } catch (error) {
        throw errorResponse(error)
    }
}

export const reqGetCommt= async (id,user)=>{
   try {
    return await Axios.get(`/api/commentaire/${id}`,Headers(user.token,user.id))
   } catch (error) {
    throw errorResponse(error)
   }
} 

export const reqPostCommt = async (commt,user)=>{
   try {
    return await Axios.post("/api/commt/post",commt,Headers(user.token))
   } catch (error) {
    throw errorResponse(error)
   }
}

export const reqDeleteCommt = async (id,user)=>{
    try {
        return await Axios.post(`/api/comment/delete/${id}`,{userId:user.id},Headers(user.token))
    } catch (error) {
        throw errorResponse(error)
    }
}


export const reqGetComdHist = async (user)=>{
    try {
        return Axios.get(`/api/commande/${user.id}`,Headers(user.token,user.id))
    } catch (error) {
        throw errorResponse(error)
    }
}

export const reqDeleteComd = async (id,user)=>{
    try {
        return await Axios.post(`/api/commd/delete/${id}`,{userId:user.id},Headers(user.token))
    } catch (error) {
        throw errorResponse(error)
    }
}
