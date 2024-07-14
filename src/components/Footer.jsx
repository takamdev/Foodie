import { FaFacebook } from "react-icons/fa"; 
import { BsInstagram } from "react-icons/bs"; 
import { FaTwitter } from "react-icons/fa"; 


function Footer() {
  return (
    <div className="container" id='footer'>
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div className="col-md-4 d-flex align-items-center">
        <span className="mb-3 mb-md-0 text-muted">&copy; 2022 Company, Inc</span>
      </div>
  
      <ul className="nav col-md-4 justify-content-end list-unstyled gap-2 d-flex">
        <li className="ms-3"><a className="text-muted" href="#"><FaTwitter style={{transform:"scale(1.5)"}}/></a></li>
        <li className="ms-3"><a className="text-muted" href="#"><BsInstagram style={{transform:"scale(1.5)"}}/></a></li>
        <li className="ms-3"><a className="text-muted" href="#"><FaFacebook style={{transform:"scale(1.5)"}}/></a></li>
      </ul>
    </footer>
  </div>
  )
}

export default Footer