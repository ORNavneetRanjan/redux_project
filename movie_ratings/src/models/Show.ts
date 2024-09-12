export type Show = {
  id: number;
  image: {
    medium: string;
    original: string;
  };
  name: string;
  genres: string[];
  rating: { average?: number };
  summary?: string;
};

export type Person = {
  person: {
    id: number;
    url: string;
    name: string;
    image: { medium: string; original: string };
  };
};
