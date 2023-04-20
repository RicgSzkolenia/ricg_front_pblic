interface PerfomanceItem {
    title: string;
    count: number;
    prefix?: string;
    suffix?: string;
}

export const perfomanceItems:Array<PerfomanceItem> = [
    {
        count: 23,
        title: 'Lata w biznesie rekrutacyjnym',
        suffix: ''

    },
    {
        prefix: '+',
        count: 70,
        title: 'Projektów doradczych w obszarze HR',
    },
    {
        prefix: '+',
        count: 2950,
        title: 'Projektów rekrutacyjnych',
        suffix: 'K'
    },
    {
        prefix: '+',
        count: 400,
        title: 'Które skorzystały z naszego Indywidualnego Coachingu kariery',
        suffix: 'osob'
    }
]