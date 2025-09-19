
export interface Diagram {
  id: string;
  group: string;
  title: string;
  code: string;
}

export type DiagramGroup = [string, Diagram[]];
