import { Link } from "react-router-dom"


function Not_found() {
  return (
    <main className="container">
    <section className="row d-flex justify-content-center align-items-center vh-100">
        <div className="col">
            <p className="text-center">
                <span>Page 404</span>
                <span>
                        cliquer <Link to="/">ICI</Link> pour aler à la page d&apos;acceuil
                    </span>
            </p>
        </div>
    </section>
</main>
  )
}

export default Not_found