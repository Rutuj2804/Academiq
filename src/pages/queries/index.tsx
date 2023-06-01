import React, { useEffect } from "react";
import { FcAbout, FcBarChart, FcDocument, FcPieChart } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
    DeleteRounded,
    DoneRounded,
    MoreVertRounded,
    ReplyRounded,
} from "@mui/icons-material";
import { Avatar, Button, IconButton } from "@mui/material";
import { GoPrimitiveDot } from "react-icons/go";

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
        field: " ",
        type: "number",
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

interface QueryThreadCProps {
    isSender?: boolean;
    message: string;
    timestamp: string;
}

const QueryThread = ({ isSender, message, timestamp }: QueryThreadCProps) => {
    return (
        <div className={`queryThread__Wrapper ${isSender ? "sender" : null}`}>
            <div className="message">
                <p>{message}</p>
                <span>{timestamp}</span>
            </div>
        </div>
    );
};

const Queries = () => {
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

            <main className="queries__Wrapper">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-12">
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
                    </div>
                    <div className="col-lg-8 col-md-8 col-12">
                        <div className="paper">
                            <div className="query__Thread">
                                <div className="header">
                                    <div className="user">
                                        <Avatar />
                                        <div className="details">
                                            <h6>Rutuj Jeevan Bokade</h6>
                                            <p>Mon, 24 Feb, 2023</p>
                                        </div>
                                    </div>
                                    <IconButton>
                                        <MoreVertRounded />
                                    </IconButton>
                                </div>
                                <hr />
                                <div className="body">
                                    <QueryThread
                                        message="I wanted to inquire about the 3rd semester results and its marksheet."
                                        timestamp="24 May, 2023 6:00PM"
                                    />
                                    <QueryThread
                                        isSender
                                        message="I wanted to inquire about the 3rd semester results and its marksheet."
                                        timestamp="24 May, 2023 6:00PM"
                                    />
                                </div>
                                <hr />
                                <div className="footer">
                                    <Button
                                        className="purple"
                                        endIcon={<ReplyRounded />}
                                    >
                                        Reply
                                    </Button>
                                    <Button
                                        className="red"
                                        endIcon={<DeleteRounded />}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        className="green"
                                        endIcon={<DoneRounded />}
                                    >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Queries;
