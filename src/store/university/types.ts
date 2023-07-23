export interface StateInterface {
    name: string,
    _id: string
}

export interface CountryInterface {
    name: string,
    states: string[],
    _id: string
}

export interface UniversityState {
    state: StateInterface[],
    country: CountryInterface[]
}