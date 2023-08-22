import Promo from "./Promo/Promo.js";
import AboutProject from "./AboutProject/AboutProject.js"
import Technologies from "./Technologies/Technologies.js"
import AboutMe from "./AboutMe/AboutMe.js";
import Portfolio from "./Portfolio/Portfolio.js"
import Footer from "../Footer/Footer.js";
import Header from "../Header/Header.js";

function Main({loggedIn}) {
  return (
    <div>
      <main>
      <Promo />
      <AboutProject/>
      <Technologies/>
      <AboutMe/>
      <Portfolio/>
      </main>
      <Footer/>
    </div>
  )
}
export default Main;
