
import { TiDelete } from "react-icons/ti"; 
import { useStore } from '../store.jsx'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { IoMdSend } from 'react-icons/io'

function Commentaire({id}) {
    const isConnect = useStore((state)=>state.isConnect)
    const host = useStore((state)=>state.host)
    const [comt,setCommt]=useState([])
    const [comment,setComment] = useState("")
    const [isvalid,setValid]=useState(true)
    //gestion des depandence du useEffect

    
    useEffect(()=>{

        if(isConnect.length!==0){
            const Axios = axios.create({
              headers:{
                  authorization:`Bearer ${isConnect[0].token}`,
                  userId:isConnect[0].id
              }
            })
            Axios.get(host+`/api/commentaire/${id}`)
            .then(res=>{
                  const commentaires = res.data.commantaire.map(item=>{
                      return {
                          comment:item.commantaire,
                          name:item.name_util_commt,
                          id:item._id
                          }
                  })
                  // EVITER LES COMMANTAIRES EN DOUBLE   
                  setCommt(commentaires)
                
            }).catch(err=>console.log(err))
          }

    },[isConnect.length!==0])


    
    const validation=(value)=>{
        setComment(value)
        if(comment.trim()!==""){
            setValid(false)
        } else {
            setValid(true)
        }
             
        
    }
    const addComment = ()=>{
        const commentaire = {
            comment:comment,
            name:isConnect[0].userName
        }
        setCommt(v=>[...v,commentaire]);
          
           const Axios = axios.create({
               headers:{
                   authorization:`Bearer ${isConnect[0].token}`
               }
           })
             const commt = {
               commantaire:comment,
               name_util_commt:isConnect[0].userName,
               id_prod_commt:id,
               userId:isConnect[0].id
             }

             Axios.post(host+"/api/commt/post",commt).then(res=>{
               setComment("")
               setValid(true)
             }).catch(err=>{
               console.log(err);
             })
          
    }
    const deleteCommt = (id)=>{
        const Axios = axios.create({
            headers:{
                authorization:`Bearer ${isConnect[0].token}`
            }
        })
        ///api/comment/delete/:id
        Axios.post(host+`/api/comment/delete/${id}`,{userId:isConnect[0].id}).then(res=>{
            let filter = comt.filter(item=>item.id!==id)
            setCommt(filter);
        }).catch(err=>console.log(err))
    }
    return(
            <>

                {
                    isConnect.length ===0 ? (
                        <button data-bs-toggle="modal" data-bs-target="#modal"  className="btn btn-primary">Connecter vous</button>
                    ):(
                    <article className='row mt-4'>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <textarea value={comment} onChange={(e)=>{validation(e.target.value)}} className='w-100 form-control' cols="30" rows="4"></textarea>
                            <button onClick={addComment} className={`btn btn-primary mt-3 ${isvalid && 'disabled'}`}>Envoyer <IoMdSend /></button>
                        </div>
                        <div className="col-lg-8 col-md-6 col-sm-12">
                        {
                            comt.length ===0 ? (
                                <p className="fs-2">aucun commentaire sur cette article</p>
                            ):(
                                comt.map((item,key)=>{
                        
                                    return(
                                        <div className=" ms-4 mt-2 border position-relative ps-2 rounded-2 pt-2 bg-body-tertiary" key={key}>
                                              {item.name===isConnect[0].userName && <TiDelete onClick={()=>{deleteCommt(item.id)}} role="button" className="position-absolute top-0 end-0 fs-2" />}
                                            <p className="text-uppercase fw-bold mt-2">{item.name}</p>
                                            {item.comment}
                                        </div>
                                    )
                                })
                            )
                        }
                        
                        </div>
                </article>
                    )
                }
            
            </>
        )
       
             
           
           
       
}

export default Commentaire