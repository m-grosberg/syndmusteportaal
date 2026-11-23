import { NavLink } from "react-router";

export const AppHeader = () => {
  return (
    <div className="page-header">

      <h1>LooduseNautijad</h1>
      
      <p>LooduseNautijad on koodanud kokku kõige loodusrohkemad tegevused  ja sündmused.
        Meie eesmärk on pakkuda inimestele võimalust leida ja osaleda erinevatel sündmustel, 
        mis loovad uusi mälestusi ja ka uusi sõpruseid.
      </p>
      
      <h2 className="organizer">
        Korraldaja: Loodus NordOÜ
      </h2>

      <nav aria-label="Peamenüü">
        <NavLink to="/" end>Kava</NavLink>
        <NavLink to="/korraldajast">Korraldajast</NavLink>
        <NavLink to="/admin">Haldus</NavLink>
      </nav>

    </div>
  );
};
