import './AboutMe.css';
import { Link } from 'react-router-dom';
import minephoto from '../../../../images/mephoto';

const AboutMe = () => {
  return (
    <section className='aboutme__container'>
    <h1 className='aboutme__title'>Студент</h1>
    <div className='aboutme__me'>
      <div className='aboutme__info'>
      <h3 className='aboutme__name'>Вазген</h3>
      <p className='aboutme__subtitle'>
      Фронтенд-разработчик, 28 лет
      </p>
      <p className='aboutme__description'>
      Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
      </p>
      <Link className='aboutme__githublink' to='https://github.com/VazgenPetrosian' target='_blank'>
      GITHUB
      </Link>
      </div>
      <img 
      className='aboutme__photo'
      src={minephoto}
      alt='Мое фото' 
      />
    </div>
    </section>
  );
};

export default AboutMe;