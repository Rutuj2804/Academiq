import { NavigateFunction } from "react-router-dom";
import { Demand, PaginationInterface } from "../../utils/types";

export interface DemandState {
    demands: Demand[];
    demand: Demand;
    demandTypes: {name: string, value: string}[];
    display: {
        all: number,
        active: number,
        deleted: number
    },
    pagination: PaginationInterface
}

export interface GetDemandsRequest {
    universityID: string;
    page?: number;
    isActive: string;
}

export interface CreateDemandLetterRequest {
    universityID: string;
    reason: string;
    type: string;
    navigate: NavigateFunction;
}

export interface DeleteDemandLetterRequest {
    universityID: string;
    demandID: string[];
}