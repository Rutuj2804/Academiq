import React, { useEffect, useState } from "react";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { GoPrimitiveDot } from "react-icons/go";
import { Button, IconButton } from "@mui/material";
import {
    AddRounded,
    EditRounded,
    FileDownloadRounded,
} from "@mui/icons-material";
import { layoutTheme } from "../../store/settings/types";
import { getRolesDefinitionDisplayCount, getUniversityRoleDefinition } from "../../store/roles/actions";
import moment from "moment";

const getName = (t:any) => {
    if(t.midname === undefined) {
        return `${t.firstname} ${t.lastname}`
    } else {
        return `${t.firstname} ${t.midname} ${t.lastname}`
    }
}

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
                    {params.row.name}{" "}
                    <span>
                        <GoPrimitiveDot />
                    </span>
                </h6>
            </div>
        ),
    },
    {
        field: "Status",
        headerName: "Status",
        headerAlign: "center",
        width: 200,
        align: "center",
        disableColumnMenu: true,
        renderCell: (params) => <span className={params.row.isActive ? "tag active" : "tag delete"}>{params.row.isActive ? "Active" : "Deleted"}</span>,
    },
    {
        field: "Created By",
        headerName: "Created By",
        headerAlign: "center",
        width: 300,
        align: "center",
        disableColumnMenu: true,
        renderCell: (params) => <p className="mb-0">{getName(params.row.createdBy)}</p>,
    },
    {
        field: "Created On",
        headerName: "Created On",
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
    ACTIVE = "ACTIVE",
    DELETED = "DELETED",
}

const RolesDefinition = () => {
    const [activeTab, setActiveTab] = useState(TabType.ACTIVE);
    const [selectedRow, setSelectedRow] = useState<GridRowSelectionModel>([]);

    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

    const theme = useSelector((state: RootState) => state.settings.theme);

    const universityID = useSelector((state: RootState) => state.university.university.value)
    const rolesDefined = useSelector((state: RootState) => state.roles.defined)
    const display = useSelector((state: RootState) => state.roles.display)

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["RESPONSIBILITIES", "Roles Definition"],
                link: "/roles",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if(universityID) {
            dispatch(getUniversityRoleDefinition({ universityID: universityID, isActive: "T" }))
            dispatch(getRolesDefinitionDisplayCount(universityID))
        }
    }, [universityID])

    const onTabClick = (tabType : TabType) => {
        if(tabType === TabType.ACTIVE) {
            setActiveTab(tabType)
            dispatch(getUniversityRoleDefinition({ universityID: universityID, isActive: "T" }))
        } else if(tabType === TabType.DELETED) {
            setActiveTab(tabType)
            dispatch(getUniversityRoleDefinition({ universityID: universityID, isActive: "F" }))
        }
    }

    return (
        <div className="section__Wrapper">
            <header>
                <div className="left">
                    <h4>{breadcrumps.name[1]}</h4>
                    <div
                        className="breadcrumps"
                        onClick={() => navigate(breadcrumps.link)}
                    >
                        {breadcrumps.name.join(" > ")}
                    </div>
                </div>
                <div className="right">
                    <FcPieChart />
                    <FcBarChart />
                </div>
            </header>

            <main className="classes__Wrapper">
                <div className="paper">
                    <div className="header">
                        <h4>My Roles</h4>
                    </div>
                    <div className="classes__Header">
                        <div className="left">
                            <Button
                                onClick={() => onTabClick(TabType.ACTIVE)}
                                className={
                                    TabType.ACTIVE === activeTab ? "active" : ""
                                }
                            >
                                Active ({display.active})
                            </Button>
                            <Button
                                onClick={() => onTabClick(TabType.DELETED)}
                                className={
                                    TabType.DELETED === activeTab
                                        ? "active"
                                        : ""
                                }
                            >
                                Deleted ({display.deleted})
                            </Button>
                            {selectedRow.length > 0 ? (
                                <Button className="red">
                                    Delete ({selectedRow.length})
                                </Button>
                            ) : null}
                        </div>
                        <div className="right">
                            <Button
                                endIcon={<AddRounded />}
                                onClick={() => navigate("/roles/create")}
                            >
                                Add
                            </Button>
                            <Button endIcon={<FileDownloadRounded />}>
                                Download
                            </Button>
                        </div>
                    </div>
                    <div className="data-grid">
                        <DataGrid
                            rows={rolesDefined}
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

export default RolesDefinition;
