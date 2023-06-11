export interface MenuItem {
    title: string,
    url: string
    subItems?: Array<MenuItem>
}
export const menuItems: Array<MenuItem>= [
    {
        title: 'Kursy',
        url: 'kursy',
    },
    {
        title: 'Kontakt',
        url: 'contact'
    }
]