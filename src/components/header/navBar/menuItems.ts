export interface MenuItem {
    title?: string,
    url: string,
    icon?: string,
    element?: string,
    newTab?:boolean,
}
export const menuItems: Array<MenuItem>= [
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
        url: 'https://tiktok.com/@rig_eu',
        icon: 'https://res.cloudinary.com/dtb1fvbps/image/upload/v1686861783/tiktok_2_c10db1b000.svg',
        newTab: true,
    },
    {
        title: 'Kursy',
        url: 'kursy',
        element: 'courses'
    },
    {
        title: 'Kontakt',
        url: 'contact',
        element: 'contact'
    },

]