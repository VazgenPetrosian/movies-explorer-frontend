import '../AboutProject/AboutProject.css';

const AboutProject = () => {
return (
  <section className='about__container'>
    <h1 className='about__title'>О проекте</h1>
    <ul className='about__list'>
      <li className='about__item'>
        <h3 className='about__subtitle'>
            Дипломный проект включал 5 этапов
        </h3>
        <p className='about__description'>
        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
        </p>
      </li>
      <li className='about__item'>
        <h3 className='about__subtitle'>
            На выполнение диплома ушло 5 недель
        </h3>
        <p className='about__description'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
        </p>
      </li>
    </ul>
    <div className='about__project'>
    <div className='about__project-deadlines'>
      <p className='about__project-duration'>1 неделя</p>
      <p className='about__project-stack'>Back-end</p>
    </div>
    <div className='about__project-deadlines'>
      <p className='about__project-duration'>4 недели</p>
      <p className='about__project-stack'>Front-end</p>
    </div>
    </div>
  </section>
);
};

export default AboutProject;