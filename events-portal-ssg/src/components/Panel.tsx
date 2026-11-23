import type { ReactNode } from "react";

type PanelProps = {
  title: string;
  children: ReactNode;
};

export const Panel = ({ title, children }: PanelProps) => {
  return (
    <section className="panel">
      
      <div className="panel-content">
      <h2>{title}</h2>
      <div className="panel-divider" />

        {children}
      </div>
    </section>
  );
};
