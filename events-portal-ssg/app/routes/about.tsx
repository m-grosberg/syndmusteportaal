import { Link } from "react-router";

import { PageHeader } from "../../src/components/AppHeader";
import { Footer } from "../../src/components/Footer";
import { useTheme } from "../../src/hooks/useTheme";

export default function About() {
  const { theme } = useTheme();
  return (
    <>
      <title>Korraldajast | LooduseNautijad</title>
      <meta name="description" content="LooduseNautijate korraldajast." />
      <meta property="og:title" content="Korraldajast | LooduseNautijad" />
      <meta property="og:description" content="LooduseNautijate korraldajast." />
      <div className={`app theme-${theme}`}>
      <PageHeader />
      <main className="app__main">
        <h2>Sündmused</h2>
        <p>LooduseNautijad on kogukond, mis kogub inimesi, kes hõivatuvad looduse kaitsmisega ja taastamisega.</p>
        <Link to="/">Vaata sündmuste kava</Link>
      </main>
      <Footer organization="LooduseNautijad" />
      </div>
    </>
  );
}  