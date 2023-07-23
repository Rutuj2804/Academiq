export interface StateInterface {
    name: string,
    value: string
}

export interface CountryInterface {
    name: string,
    value: string
}

export interface LocationState {
    state: StateInterface[],
    country: CountryInterface[]
}