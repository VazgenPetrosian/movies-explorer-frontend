import NavTab from '../NavTab/NavTab';
import "./Promo.css";

const Promo = () => {
  return (
    <section className="promo__container">
      <h1 className="promo__title">
      Учебный проект студента факультета Веб-разработки.
      </h1>
      <NavTab />
    </section>
  );
};

export default Promo;