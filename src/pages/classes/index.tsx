import React, { useEffect } from "react";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GoPrimitiveDot } from "react-icons/go";
import { IconButton } from "@mui/material";
import { DeleteRounded, NorthWest } from "@mui/icons-material";

const columns: GridColDef[] = [
    {
        field: "firstName",
        headerName: "Query",
        flex: 1,
        disableColumnMenu: true,
        renderCell: (params) => (
            <div className="queryBlock">
                <h6>
                    {params.row.firstName}{" "}
                    <span>
                        <GoPrimitiveDot />
                    </span>
                </h6>
                <p>
                    {params.row.lastName.length < 30
                        ? params.row.lastName
                        : params.row.lastName.slice(0, 30) + "..."}
                </p>
            </div>
        ),
    },
    {
        field: "Assignments",
        headerName: "Assignments",
        headerAlign: "center",
        width: 200,
        align: "center",
        disableColumnMenu: true,
        renderCell: (params) => (
            <IconButton size="small">
                <NorthWest />
            </IconButton>
        ),
    },
    {
        field: "Utilities",
        headerName: "Utilities",
        headerAlign: "center",
        width: 200,
        align: "center",
        disableColumnMenu: true,
        renderCell: (params) => (
            <IconButton size="small">
                <NorthWest />
            </IconButton>
        ),
    },
    {
        field: " ",
        width: 20,
        disableColumnMenu: true,
        renderCell: (params) => (
            <IconButton size="small">
                <DeleteRounded />
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

const Classes = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ACADEMIC", "Classes"],
                link: "/classes",
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

            <main className="classes__Wrapper">
                <div className="paper">
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
                        disableRowSelectionOnClick
                        getRowId={(row) => row.id}
                    />
                </div>
            </main>
        </div>
    );
};

export default Classes;
