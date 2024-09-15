import { Link } from "react-router-dom"


function Not_found() {
  return (
    <main className="container">
    <section className="row d-flex justify-content-center align-items-center vh-100">
        <div className="col">
            <p className="text-center">
                <span>404 Not_found </span>
                <span>
                        cliquer <Link to="/">ICI</Link> pour aller à la page d&apos;acceuil
                    </span>
            </p>
        </div>
    </section>
</main>
  )
}

export default Not_found