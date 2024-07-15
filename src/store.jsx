import { create } from 'zustand'

export const useStore = create((set) => {
const personne = JSON.parse(localStorage.getItem('personne'))||[]




  return  {
    produit: [],
    menu:[],
    updateProduit:(list)=>set(()=>({produit:list})),
    updateMenu:(list)=>set(()=>({menu:list})),
    isConnect:personne,
    setConnect: (user)=>set(()=>{
        localStorage.setItem('personne',JSON.stringify(user))
        return {isConnect:user}
    }),
    CARD:[],
    addProduit:(produit)=>set((state)=>({CARD:[...state.CARD,{...produit,qte:1}]})),
    currentCommd:[],//commande en cours
    addProduits:(list)=>set((state)=>({currentCommd:[...state.CARD,...list]})),
    resetCard:(list)=>set(()=>({CARD:list})),
    comt:[],
    setCommt:(commt)=>set((state)=>({comt:[...state.comt,commt]})),
    updateCommnt:(list)=>set(()=>({comt:list})),
    host : "https://backendrestaurant-c0vz.onrender.com"

}
})