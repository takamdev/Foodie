

import  { useEffect, useState } from 'react'
import CardMenu from './../components/CartMenu.jsx'
import Card from '../components/Card.jsx'
import { useStore } from '../store.jsx'



function Menu() {

    const menu_list = useStore((state)=>state.menu)
    const food_list = useStore((state)=>state.produit)
    const [FootList,setFootList] = useState([])

    useEffect(()=>{
        setFootList(food_list)
    },[])

    // fonction e fitragre des menus
    function filtre(name){
        let newFooteList = food_list.filter(item=>item.category===name)
        if(newFooteList.length!==0){
        setFootList(newFooteList)
        }else{
        setFootList(food_list)
        }
        
    }

  return (
  <section id='Menu' className='mt-5'>
    <div>
      <p className='fs-2'>Explore Our Menu</p>
      <p className='me-auto pe-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro neque reiciendis dicta minus a, 
        quisquam corrupti sint, at odit, ex id! Quam doloribus voluptatum beatae, 
        quod atque officia excepturi earum dolor velit tenetur delectus corporis soluta hic quis, deserunt asperiores
      </p>
    </div>
    <article className='hstack gap-4 hide'>
     {
      menu_list.map((item,key)=>{
       
        return (
          <div key={key}>
            <CardMenu menu={item} click={()=>{filtre(item.menu_name)}}/>
          </div>
        )
      })
     }
    </article>
     <p></p>
    <button onClick={filtre} className='btn btn-secondary mt-2 buttonSelect'>All Menu</button>
    <select onChange={(e)=>{filtre(e.target.value)}} className="form-select selectList" aria-label="Default select example">
      <option defaultValue = "">All Menu</option>
      <option value="Salad">Salad</option>
      <option value="Rolls">Rolls</option>
      <option value="Deserts">Deserts</option>
      <option value="Sandwich">Sandwich</option>
      <option value="Cake">Cake</option>
      <option value="Pure Veg">Pure Veg</option>
      <option value="Pasta">Pasta</option>
      <option value="Noodles">Noodles</option>
    </select>

    <article className='row'>
    {
        FootList.map((item,key)=>{
          return (
            <div key={key} className="col-sm-12 col-md-4 col-lg-3 mt-4">
             <Card produit={item}/>
            </div>
          )
        })
      }
    </article>
  </section>
  )
}

export default Menu