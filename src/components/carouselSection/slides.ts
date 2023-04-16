interface Slide {
  title: string;
  imageUrl: string;
  link: string;
  detailed: string;
}
export const slides: Array<Slide> = [
  {
    title: "jak czytać ogłoszenia rekrutacyjne, na co zwrócić uwagę",
    imageUrl: "./pic1.png",
    link: "someLink",
    detailed: "",
  },
  {
    title: "jak czytać ogłoszenia rekrutacyjne, na co zwrócić uwagę",
    imageUrl: "./pic2.png",
    link: "someLink",
    detailed: "",
  },
  {
    title: "jak czytać ogłoszenia rekrutacyjne, na co zwrócić uwagę",
    imageUrl: "./pic3.png",
    link: "someLink",
    detailed: "",
  },
  {
    title: "jak czytać ogłoszenia rekrutacyjne, na co zwrócić uwagę",
    imageUrl: "./pic4.png",
    link: "someLink",
    detailed: "",
  },
  {
    title: "jak czytać ogłoszenia rekrutacyjne, na co zwrócić uwagę",
    imageUrl: "./pic4.png",
    link: "someLink",
    detailed: "",
  },
];

interface ICourse {
  title: string;
  type: string;
  points: Array<string>;
  price: number;
  link: string;
}

export const courses: Array<ICourse> = [
  {
    title: "Grupowy online kurs",
    type: "Online",
    points: [
      "Dlaczego warto poddać się testom osobowościowym i kompetencyjnym",
      "Dlaczego nie wyszło- kandydat a rynek pracy blaski i cienie",
      "Strategia, analityczne myślenie, własny PR i marketing vs rynek pracy",
      "Dlaczego warto posiadać LinkedIn",
    ],
    price: 239,
    link: "",
  },
  {
    title: "Grupowy online kurs",
    type: "Online",
    points: [
      "Dlaczego warto poddać się testom osobowościowym i kompetencyjnym",
      "Dlaczego nie wyszło- kandydat a rynek pracy blaski i cienie",
      "Strategia, analityczne myślenie, własny PR i marketing vs rynek pracy",
      "Dlaczego warto posiadać LinkedIn",
    ],
    price: 239,
    link: "",
  },
];

interface Opinion {
  avatarLink: string;
  opinion: string;
}

export const opinions: Array<Opinion> = [
  {
    avatarLink: "./Avatar.png",
    opinion: "Wspiera w radzeniu sobie ze zmianą w nowym środowisku pracy",
  },
  {
    avatarLink: "./Avatar.png",
    opinion: "Wspiera w radzeniu sobie ze zmianą w nowym środowisku pracy",
  },
  {
    avatarLink: "./Avatar.png",
    opinion: "Wspiera w radzeniu sobie ze zmianą w nowym środowisku pracy",
  },
  {
    avatarLink: "./Avatar.png",
    opinion: "Wspiera w radzeniu sobie ze zmianą w nowym środowisku pracy",
  },
  {
    avatarLink: "./Avatar.png",
    opinion: "Wspiera w radzeniu sobie ze zmianą w nowym środowisku pracy",
  },
  {
    avatarLink: "./Avatar.png",
    opinion: "Wspiera w radzeniu sobie ze zmianą w nowym środowisku pracy",
  },
];
