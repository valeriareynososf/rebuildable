import "./Navigation.css";
import legocar from "../../images/legocar.jpeg"
import legotruck from "../../images/legotruck.jpeg"
import randomlego from "../../images/randomlego.jpeg"

function About() {
  return (
    <>
      <h1 className="aboutTitle">About</h1>
      <div className="aboutContainer">
        <h2 className="aboutH2">What is Rebuildable?</h2>
        <p className="aboutParagraph">
          Rebuildable is a clone of Rebrickable. You can share your Lego
          creations and choose from the sets submitted by other designers.
        </p>
        <div className="picturesAbout">
          <div className="photoDivs">
            <img src={legotruck} alt="TruckImage" />
            <p className="legoCap">I HAVE THIS</p>
          </div>
          <span className="mathSigns"> + </span>
          <div className="photoDivs">
            <img src={randomlego} alt="randomLegoImage" />
            <p className="legoCap">AND A BUNCH OF THESE</p>
          </div>
          <span className="mathSigns"> = </span>
          <div className="photoDivs">
            <img src={legocar} alt="CarImage" />
            <p className="legoCap">I CAN BUILD THIS, YAY!</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
