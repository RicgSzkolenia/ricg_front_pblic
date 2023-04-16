export interface MenuItem {
  title: string;
  url: string;
  subItems?: Array<MenuItem>;
}
export const menuItems: Array<MenuItem> = [
  {
    title: "Kursy",
    url: "/kursy",
    subItems: [
      {
        title: "Webinary",
        url: "/webinar",
      },
    ],
  },
  {
    title: "O nas",
    url: "/info",
  },
  {
    title: "Kontakt",
    url: "/contact",
  },
];
