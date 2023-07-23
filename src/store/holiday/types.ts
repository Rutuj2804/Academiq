export interface Holiday {
    _id: string,
    name: string,
    description: string,
    date: string,
    country: string,
    __v: number
}

export interface HolidayState {
    holidays: Holiday[]
}