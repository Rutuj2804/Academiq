import { NavigateFunction } from "react-router-dom";
import { DemandType, PaginationInterface } from "../../utils/types";

export interface ConfigurationsState {
    demandTypes: DemandType[];
    demandType: DemandType;
    display: {
        all: number,
        active: number,
        deleted: number
    },
}

export interface GetDemandTypesRequest {
    universityID: string
}

export interface GetDemandTypeRequest {
    universityID: string;
    demandTypeID: string
}

export interface AddNewDemandTypeRequest {
    universityID: string;
    name: string;
    description: string;
    navigate: NavigateFunction
}

export interface UpdateDemandTypeRequest extends AddNewDemandTypeRequest {
    demandTypeID: string
}

export interface DeleteDemandTypesRequest {
    demandTypeID: string[];
    universityID: string;
}