import Title from "../Title/Title";

function AboutProject() {
  return (
    <section className="project" id='project'>
      <Title title="О проекте" />
      <div className="project__plan">
        <div className="project__part">
          <h2 className="project__title">Дипломный проект включал 5 этапов</h2>
          <p className="project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="project__part">
          <h2 className="project__title">На выполнение диплома ушло 5 недель</h2>
          <p className="project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="project__progress">
        <p className="project__progress-back">1 неделя</p>
        <p className="project__progress-front">4 недели</p>
      </div>
      <div className="project__progress">
        <p className="project__back-text">Back-end</p>
        <p className="project__front-text">Front-end</p>
      </div>



    </section>
  )
}

export default AboutProject;
