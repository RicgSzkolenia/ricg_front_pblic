interface PerfomanceItem {
    title: string;
    count: number;
    prefix?: string;
    suffix?: string;
}

export const perfomanceItems:Array<PerfomanceItem> = [
    {
        count: 133,
        title: 'Courses completed',
        suffix: '+'

    },
    {
        count: 305,
        title: 'Courses completed',
        suffix: '+'
    },
    {
        count: 56,
        title: 'Courses completed',
        suffix: 'K'
    },
    {
        count: 11,
        title: 'Courses completed',
        suffix: 'ML'
    }
]