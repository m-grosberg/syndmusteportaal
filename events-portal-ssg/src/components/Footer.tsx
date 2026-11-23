type FooterProps = {
  organization: string;
};

export const Footer = ({ organization }: FooterProps) => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {year} {organization}</p>
    </footer>
  );
}
