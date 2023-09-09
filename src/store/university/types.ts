import { NavigateFunction } from "react-router-dom";

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
    country: CountryInterface[],
    universities: any[],
    university : {
        name: string,
        value: string
    };
}

export interface CreateUniversity {
    name: string;
    
    description: string;
    
    doEst: string;
    
    state: string;
    
    country: string;
    
    avgStudents: number;
    
    isSundayHoliday: boolean;
    
    isSaturdayHoliday: boolean;

    navigate: NavigateFunction;
}