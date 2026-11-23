import { NavLink } from "react-router";
import { ThemeToggle } from "./ThemeToggle";

export const AppHeader = () => {
  return (
    <header className="app__header">
      <nav className="top-navigation" aria-label="Peamenüü">
        <div className="top-navigation__inner">
          <NavLink className="top-navigation__brand" to="/" end>
            LooduseNautijad
          </NavLink>

          <div className="top-navigation__actions">
            <div className="top-navigation__links">
              <NavLink to="/" end>Kava</NavLink>
              <NavLink to="/korraldajast">Korraldajast</NavLink>
              <NavLink to="/admin">Haldus</NavLink>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="page-header">
        <h1>LooduseNautijad</h1>

        <p>
          LooduseNautijad on kogunud kokku kõige looduslähedasemad tegevused
          ja sündmused. Meie eesmärk on aidata inimestel leida ja osaleda
          erinevatel sündmustel, mis loovad uusi mälestusi ja sõprussuhteid.
        </p>

        <h2 className="organizer">
          Korraldaja: Loodus NordOÜ
        </h2>
      </div>
    </header>
  );
};

export const PageHeader = AppHeader;