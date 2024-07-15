import Card from "../components/Card.jsx";
import { useStore } from "../store.jsx";
import { useNavigate } from "react-router-dom";


function Home() {
  const produit = useStore((state)=>state.produit)
  const navigateTo = useNavigate()
  return (


      <section className="mt-2">
          <article className={`banier ps-5 pe-5`}>
          <p className="fs-1">Commande ta nurriture <br /> favorie ici</p>
          <p className="fs-5">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic
              <span className="d-lg-block d-sm-none d-md-block cacheText">
              voluptatem ab, repellat explicabo neque quam deserunt unde
              ratione molestiae consectetur deleniti quis eius dolore numquam
              vitae nam totam officiis dolorem.
              </span>
          </p>
          <button onClick={()=>navigateTo('/menu')} className="btn border-primary rounded-pill">Voir les menus</button>
          </article>
          <article className="row mt-3">
              {produit.map((item, key) => {
                  return (
                      <div key={key} className="col-sm-12 col-md-4 col-lg-3 mt-4">
                          <Card produit={item} />
                      </div>
                  );
              })}
          </article>
      
      </section>
    
  )
}

export default Home