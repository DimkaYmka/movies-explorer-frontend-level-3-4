import Title from "../Title/Title";
import Student from "../../../images/me.jpg"

function AboutMe() {
  return (
    <section className="about-me">
      <Title title="Студент" />
      <article className="student">
        <div className="student__container">
          <h2 className="student__title">Дмитрий</h2>
          <p className="student__heading">Фронтенд-разработчик, 23 года</p>

          <p className="student__paragraph">Живу и учусь в Москве. Окончил бакалавр на Менеджера и постпил в Магистратуры на веб-разработчика. Люблю ходить в походы, сноуборд и вкусно поесть. В свободное время стараюсь учиться.</p>
          <a href="https://github.com/DimkaYmka" className="student__link" target="_blank">Github</a>
        </div>
        <div className="student__image-container">
          <img src={Student} alt="фото студента" className="student__image" />
        </div>
      </article>
    </section>
  )
}

export default AboutMe;
