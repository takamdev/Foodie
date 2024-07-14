
import { useStore } from '../store.jsx'


function Commande() {
    const currentCommd= useStore((state)=>state.currentCommd)
  return (
    <div>
        <table className="table">
          <thead>
            <tr>
              <th className="text-center" scope="col">item</th>
              <th className="text-center" scope="col">titre</th>
              <th className="text-center" scope="col">prix</th>
              <th className="text-center" scope="col">qte</th>
            </tr>
          </thead>
          <tbody>
            {
              currentCommd.map((item,key)=>{
                return (
                  <tr key={key} className="w-100 p-0 border-bottom">
                    <th className=" border-0 " scope="row"><img width={40} height={40} src={`/${item.image}`} alt="item" /></th>
                    <td className=" border-0 ">{item.name}</td>
                    <td className=" border-0 fs-3">{item.price}</td>
                    <td className="d-flex border-0 fs-3"><span className="fs-5 mt-2 text-secondary">{item.qte}</span></td>
                  </tr>
                  )
              })
            }
          
           
          </tbody>
        </table>
    </div>
  )
}

export default Commande