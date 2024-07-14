
import axios from 'axios'
import {useState,useEffect} from 'react'
import { useStore } from '../store.jsx'

import { AiFillDelete } from "react-icons/ai"; 
export default function HistoCommande() {
    const isConnect = useStore((state)=>state.isConnect)
    const produit = useStore((state)=>state.produit)
    const host = useStore((state)=>state.host)
    const [commd,setCommd]=useState([])
    const deleteCommd = (id)=>{
        const Axios = axios.create({
            headers:{
                authorization:`Bearer ${isConnect[0].token}`,
               
            }
        })

        Axios.post(host+`/api/commd/delete/${id}`,{ userId:isConnect[0].id}).then(res=>{
            const newCommd = commd.filter(item=>item.id!==id)
            setCommd(newCommd)
        }).catch(err=>console.log(err))

    }
    
    useEffect(()=>{
        if(isConnect.length!==0){
            const Axios = axios.create({
                headers:{
                    authorization:`Bearer ${isConnect[0].token}`,
                    userId:isConnect[0].id
                }
            })

            Axios.get(host+`/api/commande/${isConnect[0].id}`).then(res=>{

               const response = res.data.commande

               const commande = response.map(item=>{
                  const result = {
                    detail: produit.filter(prod=>prod._id===item.id_prod_comd)[0],
                    qte:item.qte,
                    date:`${item.createdAt.slice(0,10)}    ${item.createdAt.slice(11,16)}`,
                    id:item._id
                  }
                  return result
               })

               setCommd(commande)
            }).catch(err=>console.log(err))
       }
    },[isConnect.length>0])
    if(commd.length!==0)return (
        <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">N</th>
                        <th scope="col">Nom</th>
                        <th scope="col">prix</th>
                        <th scope="col">image</th>
                        <th scope="col">qte</th>
                        <th scope="col">total</th>
                        <th scope="col">date</th>                        
                        <th scope="col">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            commd.map((item,index)=>{
                                return (
                                    <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.detail.name}</td>
                                    <td>{item.detail.price}</td>
                                    <td style={{width:'100px'}}><img width={40} height={40} src={`/${item.detail.image}`}/></td>
                                    <td>{item.qte}</td>
                                    <td>{item.qte*item.detail.price}</td>
                                    <td>{item.date}</td>
                                    <td><AiFillDelete onClick={()=>{deleteCommd(item.id)}} role="button" className="text-danger fs-1"/></td>
                                    </tr>
                                )
                            })
                        }
                       
                       
                    </tbody>
                </table>
           </div>
      )
}

