import { PageHeader } from "../components/AppHeader";
import { Footer } from "../components/Footer";

export const About = () => {
  return (
    <>
      <PageHeader />

      <main>
        <h1>Korraldajast</h1>
        <p>
          Loodus NordOÜ korraldab looduslähedasi sündmusi ja tegevusi.
        </p>
      </main>

      <Footer organization="Loodus NordOÜ" />
    </>
  );
};