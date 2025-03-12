export interface Weather {
  name: string;
  main: { temp: number };
  weather: { description: string }[];
  error?: boolean;
}