import { createSlice } from "@reduxjs/toolkit";
import { RolesfState } from "./types";
import { getMyRole, getRolesDefinitionDisplayCount, getUniversityRoleDefinition, getUniversityRoles, getUniversityRolesDisplayData } from "./actions";

const initialState: RolesfState = {
    defined: [],
    assigned: [],
    definedDetail: {},
    assignedToMe: {},
    display: {
        all: 0,
        active: 0,
        deleted: 0
    }
};

export const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUniversityRoleDefinition.fulfilled, (s, a) => {
            s.defined = a.payload
        });
        builder.addCase(getRolesDefinitionDisplayCount.fulfilled, (s, a) => {
            s.display = a.payload
        });
        builder.addCase(getMyRole.fulfilled, (s, a) => {
            s.assignedToMe = a.payload
        });
        builder.addCase(getUniversityRoles.fulfilled, (s, a) => {
            s.assigned = a.payload
        });
        builder.addCase(getUniversityRolesDisplayData.fulfilled, (s, a) => {
            s.display = a.payload
        });
    }
});

// export const {} = roleSlice.actions;

export default roleSlice.reducer;
