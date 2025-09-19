
import mermaid from "mermaid";

export const initMermaid = (dark: boolean): void => {
  mermaid.initialize({
    startOnLoad: false,
    theme: dark ? "dark" : "default",
    securityLevel: "loose",
    flowchart: { htmlLabels: true, diagramPadding: 8 },
    sequence: { actorMargin: 30 },
    gantt: {
      axisFormat: '%Y-%m-%d',
    }
  });
};
