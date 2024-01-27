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
    }
]