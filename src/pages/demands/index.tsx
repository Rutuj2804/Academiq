import React, { useEffect, useState } from "react";
import { FcAbout, FcDocument } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import {
    AddRounded,
    DeleteRounded,
} from "@mui/icons-material";
import {  Button, IconButton } from "@mui/material";
import { GoPrimitiveDot } from "react-icons/go";

const columns: GridColDef[] = [
    {
        field: "firstName",
        headerName: "Title",
        flex: 1,
        disableColumnMenu: true,
        minWidth: 200,
        renderCell: (params) => (
            <div className="queryBlock">
                <h6>
                    {params.row.firstName}{" "}
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
        renderCell: (params) => <span className="tag active">Active</span>,
    },
    {
        field: "Created At",
        headerName: "Created At",
        headerAlign: "center",
        width: 200,
        align: "center",
        disableColumnMenu: true,
        renderCell: (params) => <p className="mb-0">2 mins ago</p>,
    },
    {
        field: " ",
        headerName: "Update Class",
        width: 150,
        disableColumnMenu: true,
        align: "center",
        renderCell: (params) => (
            <IconButton size="small" className="icon-hover-red">
                <DeleteRounded fontSize="small" />
            </IconButton>
        ),
    },
];

const rows = [
    {
        id: 1,
        lastName: "Snow Snow Snow Snow Snow Snow Snow Snow Snow Snow",
        firstName: "Jon",
        age: 35,
    },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: "Rutuj", age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

enum TabType {
    ACTIVE = "ACTIVE",
    PENDING = "PENDING",
    FULL_FILLED = "FULL_FILLED",
}

const DemandLetters = () => {
    const [activeTab, setActiveTab] = useState(TabType.ACTIVE);
    const [selectedRow, setSelectedRow] = useState<GridRowSelectionModel>([]);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["GENERAL", "Queries"],
                link: "/queries",
            })
        );
    }, [dispatch]);

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
                    <FcAbout />
                    <FcDocument />
                </div>
            </header>

            <main className="classes__Wrapper">
                <div className="paper">
                    <div className="header">
                        <h4>My Letters</h4>
                    </div>
                    <div className="classes__Header">
                        <div className="left">
                            <Button
                                onClick={() => setActiveTab(TabType.ACTIVE)}
                                className={
                                    TabType.ACTIVE === activeTab ? "active" : ""
                                }
                            >
                                Active (27)
                            </Button>
                            <Button
                                onClick={() => setActiveTab(TabType.PENDING)}
                                className={
                                    TabType.PENDING === activeTab
                                        ? "active"
                                        : ""
                                }
                            >
                                Pending (6)
                            </Button>
                            <Button
                                onClick={() => setActiveTab(TabType.FULL_FILLED)}
                                className={
                                    TabType.FULL_FILLED === activeTab
                                        ? "active"
                                        : ""
                                }
                            >
                                Full Filled (6)
                            </Button>
                            {selectedRow.length > 0 ? (
                                <Button className="red">
                                    Delete ({selectedRow.length})
                                </Button>
                            ) : null}
                        </div>
                        <div className="right">
                            <Button endIcon={<AddRounded />}>Add</Button>
                        </div>
                    </div>
                    <div className="data-grid">
                        <DataGrid
                            rows={rows}
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
                            getRowId={(row) => row.id}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DemandLetters;
