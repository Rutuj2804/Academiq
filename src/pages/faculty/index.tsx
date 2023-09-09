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
import { getFacultyCountOnTabNumbers, getUniversityFaculty } from "../../store/faculty/actions";
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
        headerName: "Name",
        flex: 1,
        disableColumnMenu: true,
        minWidth: 200,
        renderCell: (params) => (
            <div className="queryBlock">
                <h6>
                    {getName(params.row.userID)}{" "}
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
        renderCell: (params) => (
            <span className={params.row.isActive ? "tag active" : "tag delete"}>
                {params.row.isActive ? "Active" : "Deleted"}
            </span>
        ),
    },
    {
        field: "Enrollment No",
        headerName: "Enrollment No",
        headerAlign: "center",
        width: 300,
        align: "center",
        disableColumnMenu: true,
        renderCell: (params) => (
            <p className="mb-0">{`${params.row.enrollnmentNo}`}</p>
        ),
    },
    {
        field: "Created At",
        headerName: "Created At",
        headerAlign: "center",
        width: 200,
        align: "center",
        disableColumnMenu: true,
        renderCell: (params) => (
            <p className="mb-0">{moment(params.row.createdAt).fromNow()}</p>
        ),
    },
    {
        field: " ",
        headerName: "Update Faculty",
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
    { id: 10, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 16, lastName: "Melisandre", firstName: "Rutuj", age: 150 },
    { id: 17, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 18, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 19, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

enum TabType {
    ALL = "ALL",
    ACTIVE = "ACTIVE",
    DELETED = "DELETED",
}

const Faculty = () => {
    const [activeTab, setActiveTab] = useState(TabType.ALL);
    const [selectedRow, setSelectedRow] = useState<GridRowSelectionModel>([]);

    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    const theme = useSelector((state: RootState) => state.settings.theme);

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

    const universityID = useSelector(
        (state: RootState) => state.university.university.value
    );

    const faculties = useSelector(
        (state: RootState) => state.faculty.faculties
    );
    const display = useSelector((state: RootState) => state.faculty.display)

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ADMINISTRATION", "Faculty"],
                link: "/faculties",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            getUniversityFaculty({
                universityID: universityID,
                isActive: "A",
            })
        );
        dispatch(getFacultyCountOnTabNumbers(universityID))
    }, [universityID]);

    const onTabClick = (tabType: TabType) => {
        setActiveTab(tabType);

        if (tabType === TabType.ALL) {
            dispatch(
                getUniversityFaculty({
                    universityID: universityID,
                    isActive: "A",
                })
            );
        } else if (tabType === TabType.ACTIVE) {
            dispatch(
                getUniversityFaculty({
                    universityID: universityID,
                    isActive: "T",
                })
            );
        } else if (tabType === TabType.DELETED) {
            dispatch(
                getUniversityFaculty({
                    universityID: universityID,
                    isActive: "F",
                })
            );
        }
    };

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
                        <h4>My Faculty</h4>
                    </div>
                    <div className="classes__Header">
                        <div className="left">
                            <Button
                                onClick={() => onTabClick(TabType.ALL)}
                                className={
                                    TabType.ALL === activeTab ? "active" : ""
                                }
                            >
                                All ({display.all})
                            </Button>
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
                                onClick={() => navigate("/faculty/create")}
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
                            rows={faculties}
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

export default Faculty;
