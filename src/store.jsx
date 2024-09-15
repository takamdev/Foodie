import { create } from 'zustand'

export const useStore = create((set) => {


  return  {
    produit: [],
    menu:[],
    updateProduit:(list)=>set(()=>({produit:list})),
    updateMenu:(list)=>set(()=>({menu:list})),
    isConnect:[],
    setConnect: (user)=>set(()=>({isConnect:user})),
    CARD:[],
    addProduit:(produit)=>set((state)=>({CARD:[...state.CARD,{...produit,qte:1}]})),
    currentCommd:[],//commande en cours
    addProduits:(list)=>set((state)=>({currentCommd:[...state.CARD,...list]})),
    resetCard:(list)=>set(()=>({CARD:list})),
    comt:[],
    setCommt:(commt)=>set((state)=>({comt:[...state.comt,commt]})),
    updateCommnt:(list)=>set(()=>({comt:list})),

}
})
