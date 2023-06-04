import React, { useEffect, useState } from "react";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { GoPrimitiveDot } from "react-icons/go";
import { AddRounded, ArrowUpwardRounded } from "@mui/icons-material";
import Card from "../lectures/Card";

const columns: GridColDef[] = [
    {
        field: "firstName",
        headerName: "Assignment",
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
        field: "Dead Line",
        headerName: "Dead Line",
        headerAlign: "center",
        width: 200,
        align: "center",
        disableColumnMenu: true,
        renderCell: (params) => <p className="mb-0">25 Feb, 2023</p>,
    },
    {
        field: " ",
        headerName: "Upload Solution",
        width: 150,
        disableColumnMenu: true,
        align: "center",
        renderCell: (params) => (
            <IconButton size="small" className="icon-hover">
                <ArrowUpwardRounded fontSize="small" />
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
    ALL = "ALL",
    ACTIVE = "ACTIVE",
    DELETED = "DELETED",
}

const Activities = () => {
    const [activeTab, setActiveTab] = useState(TabType.ALL);
    const [selectedRow, setSelectedRow] = useState<GridRowSelectionModel>([]);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ACADEMIC", "Activities"],
                link: "/activities",
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
                    <FcPieChart />
                    <FcBarChart />
                </div>
            </header>

            <main className="activities__Wrapper">
                <div className="row">
                    <div className="col-lg-8 col-md-12 col-12">
                        <div className="paper">
                            <div className="title">
                                <h4>My Assignments</h4>
                            </div>
                            <div className="activities__Header">
                                <div className="left">
                                    <Button
                                        onClick={() =>
                                            setActiveTab(TabType.ALL)
                                        }
                                        className={
                                            TabType.ALL === activeTab
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        All (33)
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            setActiveTab(TabType.ACTIVE)
                                        }
                                        className={
                                            TabType.ACTIVE === activeTab
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        Active (27)
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            setActiveTab(TabType.DELETED)
                                        }
                                        className={
                                            TabType.DELETED === activeTab
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        Completed (6)
                                    </Button>
                                    {selectedRow.length > 0 ? (
                                        <Button className="red">
                                            Delete ({selectedRow.length})
                                        </Button>
                                    ) : null}
                                </div>
                                <div className="right">
                                    <Button endIcon={<AddRounded />}>
                                        Add
                                    </Button>
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
                                    onRowSelectionModelChange={(t) =>
                                        setSelectedRow(t)
                                    }
                                    disableRowSelectionOnClick
                                    getRowId={(row) => row.id}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-12">
                        <div className="paper">
                            <div className="lectures">
                                <div className="top">
                                    <h4>Upcoming Lectures</h4>
                                </div>
                                <div className="upcoming">
                                    <Card title="Cloud and its types" timestamp="24 May, 2023" />
                                    <Card title="Cloud and its types" timestamp="24 May, 2023" />
                                    <Card title="Cloud and its types" timestamp="24 May, 2023" />
                                    <Card title="Cloud and its types" timestamp="24 May, 2023" />
                                    <Card title="Cloud and its types" timestamp="24 May, 2023" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Activities;
