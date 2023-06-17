export interface MenuItem {
    title?: string,
    url: string,
    icon?: string,
    subItems?: Array<MenuItem>,
}
export const menuItems: Array<MenuItem>= [
    {
        title: 'Kursy',
        url: 'kursy',
    },
    {
        title: 'Kontakt',
        url: 'contact'
    },
    {
        url: 'https://instagram.com',
        icon: 'https://res.cloudinary.com/dtb1fvbps/image/upload/v1686861783/instagram_5bb61720e9.svg'
    },
    {
        url: 'https://facebook.com',
        icon: 'https://res.cloudinary.com/dtb1fvbps/image/upload/v1686861783/facebook_2c866dc246.svg'
    },
    {
        url: 'https://tiktok.com',
        icon: 'https://res.cloudinary.com/dtb1fvbps/image/upload/v1686861783/tiktok_2_c10db1b000.svg'
    },

]