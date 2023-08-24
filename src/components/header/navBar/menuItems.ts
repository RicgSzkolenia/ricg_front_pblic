export interface MenuItem {
    title?: string,
    url: string,
    icon?: string,
    element?: string,
    newTab?:boolean,
    parent?: string
}
export const menuItems: Array<MenuItem>= [
    {
        title: 'Home',
        url: '/'
    },
    {
        title: 'Webinary',
        url: '/products',
    },
    {
        title: 'Partnerzy',
        url: 'partners',
        element: 'partners',
        parent: '/'

    },
    {
        title: 'Kontakt',
        url: '/contact',
    },
    {
        url: 'https://instagram.com/ricg_eu?igshid=MzRlODBiNWFlZA==',
        icon: 'https://res.cloudinary.com/dtb1fvbps/image/upload/v1686861783/instagram_5bb61720e9.svg',
        newTab: true
    },
    {
        url: 'https://www.facebook.com/profile.php?id=100090143585440&locale=it_IT&paipv=0&eav=AfbRqzmOZexD3K-B5bXaWiwxn8J6KwoTWvdRpPP4BcHR0qtG_2Im0MLIwgPxdn4EkM4',
        icon: 'https://res.cloudinary.com/dtb1fvbps/image/upload/v1686861783/facebook_2c866dc246.svg',
        newTab: true,
    },
    {
        url: 'https://www.tiktok.com/@ricg_eu?_t=8ejDRVG0Gcn&_r=1',
        icon: 'https://res.cloudinary.com/dtb1fvbps/image/upload/v1686861783/tiktok_2_c10db1b000.svg',
        newTab: true,
    },

]