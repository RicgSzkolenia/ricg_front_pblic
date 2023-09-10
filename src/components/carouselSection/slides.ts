interface Slide {
    title: string;
    imageUrl: string;
    link: string;
    detailed: string;

}
export const slides:Array<Slide> = [
    {
        title: 'jak czytać ogłoszenia rekrutacyjne, na co zwrócić uwagę',
        imageUrl: './pic1.png',
        link: 'someLink',
        detailed: ''
    },
    {
        title: 'jak czytać ogłoszenia rekrutacyjne, na co zwrócić uwagę',
        imageUrl: './pic2.png',
        link: 'someLink',
        detailed: ''
    },
    {
        title: 'jak czytać ogłoszenia rekrutacyjne, na co zwrócić uwagę',
        imageUrl: './pic3.png',
        link: 'someLink',
        detailed: ''
    },
    {
        title: 'jak czytać ogłoszenia rekrutacyjne, na co zwrócić uwagę',
        imageUrl: './pic4.png',
        link: 'someLink',
        detailed: ''
    },
    {
        title: 'jak czytać ogłoszenia rekrutacyjne, na co zwrócić uwagę',
        imageUrl: './pic4.png',
        link: 'someLink',
        detailed: ''
    }
]

interface ICourse {
    title: string;
    type: string;
    points: Array<string>
    price: number;
    link: string;
}

interface Opinion {
    avatarLink: string,
    opinion: string
}

export const opinions: Array<Opinion> = [
    {
        avatarLink: './Avatar.png',
        opinion: 'Wspiera w radzeniu sobie ze zmianą w nowym środowisku pracy',
    },
    {
        avatarLink: './Avatar.png',
        opinion: 'Wspiera w radzeniu sobie ze zmianą w nowym środowisku pracy',
    },
    {
        avatarLink: './Avatar.png',
        opinion: 'Wspiera w radzeniu sobie ze zmianą w nowym środowisku pracy',
    },
    {
        avatarLink: './Avatar.png',
        opinion: 'Wspiera w radzeniu sobie ze zmianą w nowym środowisku pracy',
    },
    {
        avatarLink: './Avatar.png',
        opinion: 'Wspiera w radzeniu sobie ze zmianą w nowym środowisku pracy',
    },
    {
        avatarLink: './Avatar.png',
        opinion: 'Wspiera w radzeniu sobie ze zmianą w nowym środowisku pracy',
    }
]