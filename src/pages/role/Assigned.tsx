import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { RootState } from "../../store";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { GoPrimitiveDot } from "react-icons/go";
import { Button, IconButton } from "@mui/material";
import {
    AddRounded,
    EditRounded,
    FileDownloadRounded,
} from "@mui/icons-material";
import { layoutTheme } from "../../store/settings/types";
import { getUniversityRoles, getUniversityRolesDisplayData } from "../../store/roles/actions";
import moment from "moment";
import { getUserName } from "../../utils/helpers";

const columns: GridColDef[] = [
    {
        field: "firstName",
        headerName: "Query",
        flex: 1,
        disableColumnMenu: true,
        minWidth: 200,
        renderCell: (params) => (
            <div className="queryBlock">
                <h6>
                    {params.row.roleID.name}{" "}
                    <span>
                        <GoPrimitiveDot />
                    </span>
                </h6>
            </div>
        ),
    },
    {
        field: "Assigned To",
        headerName: "Assigned To",
        headerAlign: "center",
        width: 300,
        align: "center",
        disableColumnMenu: true,
        renderCell: (params) => <p className="mb-0">{getUserName(params.row.userID)}</p>,
    },
    {
        field: "Assigned On",
        headerName: "Assigned On",
        headerAlign: "center",
        width: 200,
        align: "center",
        disableColumnMenu: true,
        renderCell: (params) => <p className="mb-0">{moment(params.row.createdAt).format("DD MMM, YYYY")}</p>,
    },
    {
        field: " ",
        headerName: "Update Role",
        width: 150,
        disableColumnMenu: true,
        align: "center",
        renderCell: (params) => (
            <IconButton size="small" className="icon-hover">
                <EditRounded fontSize="small" />
            </IconButton>
        ),
    },
];

enum TabType {
    ACTIVE = "T",
    DELETED = "F",
}

const Assigned = () => {
    const [activeTab, setActiveTab] = useState(TabType.ACTIVE);
    const [selectedRow, setSelectedRow] = useState<GridRowSelectionModel>([]);

    const dispatch = useDispatch<any>();

    const theme = useSelector((state: RootState) => state.settings.theme);

    const universityID = useSelector((state: RootState) => state.university.university.value)

    const assigned = useSelector((state: RootState) => state.roles.assigned)
    const display = useSelector((state: RootState) => state.roles.display)

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["RESPONSIBILITIES", "Roles Assigned"],
                link: "/assigned",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if(universityID)
            dispatch(getUniversityRoles({ universityID: universityID, isActive: activeTab }))
    }, [universityID, dispatch, activeTab])

    useEffect(() => {
        if(universityID)
            dispatch(getUniversityRolesDisplayData(universityID))
    }, [universityID, dispatch])

    const onTabClick = (tabType: TabType) => {
        setActiveTab(tabType)
    }

    return (
        <div className="section__Wrapper">
            <main className="classes__Wrapper">
                <div className="paper">
                    <div className="header">
                        <h4>Roles And Responsibilities</h4>
                    </div>
                    <div className="classes__Header">
                        <div className="left">
                            <Button
                                onClick={() => onTabClick(TabType.ACTIVE)}
                                className={
                                    TabType.ACTIVE === activeTab ? "active" : ""
                                }
                            >
                                Assigned ({display.active})
                            </Button>
                            <Button
                                onClick={() => onTabClick(TabType.DELETED)}
                                className={
                                    TabType.DELETED === activeTab
                                        ? "active"
                                        : ""
                                }
                            >
                                Envoked ({display.deleted})
                            </Button>
                            {selectedRow.length > 0 ? (
                                <Button className="red">
                                    Delete ({selectedRow.length})
                                </Button>
                            ) : null}
                        </div>
                        <div className="right">
                            <Button endIcon={<AddRounded />}>Add</Button>
                            <Button endIcon={<FileDownloadRounded />}>
                                Download
                            </Button>
                        </div>
                    </div>
                    <div className="data-grid">
                        <DataGrid
                            rows={assigned}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                            pageSizeOptions={[10]}
                            checkboxSelection
                            onRowSelectionModelChange={(t) => setSelectedRow(t)}
                            disableRowSelectionOnClick
                            getRowId={(row) => row._id}
                            sx={
                                theme === layoutTheme[0]
                                    ? null
                                    : { color: "white" }
                            }
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Assigned;
