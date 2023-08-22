import { Link } from "react-router-dom";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__text">
        <h1 className="promo__title">Учебный проект студента факультета <nobr>Веб-разработки</nobr>.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <Link  className="promo__link" reloadDocument to='#project'>
            Узнать больше
        </Link>
      </div>
      <div className='promo__picture'>
      </div>
    </section>
  )
}

export default Promo;
