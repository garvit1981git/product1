import AuroraBackground from "./Components/LandingPage/BgColor";
import Footer from "./Components/LandingPage/Footer";
import Guide from "./Components/LandingPage/Guide";
import HerosSection from "./Components/LandingPage/HerosSection";
import Navbar from "./Components/LandingPage/Navbar";
import Reviews from "./Components/LandingPage/Reviews";
import StartNow from "./Components/LandingPage/StartNow";
import TopSlide from "./Components/LandingPage/TopSlide";
// import Footer from "./Components/LandingPage/Footer";
// import Guide from "./Components/LandingPage/Guide";
// import HerosSection from "./Components/HerosSection";
// import Navbar from "./Components/LandingPage/Navbar";
// import Reviews from "./Components/LandingPage/Reviews";
// import StartNow from "./Components/LandingPage/StartNow";
// import TopSlide from "./Components/LandingPage/TopSlide";

export default function Home() {
  return (
    <>
      {/* <AuroraBackground> */}
      <Navbar></Navbar>
      <HerosSection></HerosSection>
      <TopSlide></TopSlide>
      <Guide></Guide>
      <Reviews></Reviews>
      <StartNow></StartNow>
      <Footer></Footer>
      {/* </AuroraBackground> */}
    </>
  );
}
