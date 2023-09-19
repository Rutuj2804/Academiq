import React, { useEffect, useState } from "react";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import {
    getCoursesGlobal,
    getMyCoursesCountOnTabNumbers,
} from "../../store/course/actions";
import { Button, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { GoPrimitiveDot } from "react-icons/go";
import moment from "moment";
import { AddRounded, EditRounded, FileDownloadRounded } from "@mui/icons-material";
import { layoutTheme } from "../../store/settings/types";

enum TabType {
    ALL = "ALL",
    ACTIVE = "ACTIVE",
    DELETED = "DELETED",
}

const Courses = () => {
    const [activeTab, setActiveTab] = useState(TabType.ALL);
    const [selectedRow, setSelectedRow] = useState<GridRowSelectionModel>([]);

    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

    const universityID = useSelector(
        (state: RootState) => state.university.university.value
    );

    const theme = useSelector((state: RootState) => state.settings.theme);

    const courses = useSelector((state: RootState) => state.course.courses)
    const display = useSelector((state: RootState) => state.course.display)

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ACADEMIC", "Courses"],
                link: "/courses",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            getCoursesGlobal({ universityID: universityID, isActive: "A" })
        );
        dispatch(
            getMyCoursesCountOnTabNumbers({
                universityID: universityID,
                isActive: "A",
            })
        );
    }, [universityID]);

    const onTabClick = (tabType: TabType) => {
        setActiveTab(tabType)

        if(tabType === TabType.ACTIVE) {
            dispatch(getCoursesGlobal({ universityID: universityID, isActive: "T" }))
        } else if(tabType === TabType.DELETED){
            dispatch(getCoursesGlobal({ universityID: universityID, isActive: "F" }))
        } else if(tabType === TabType.ALL){
            dispatch(getCoursesGlobal({ universityID: universityID, isActive: "A" }))
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
            renderCell: (params) => <span className={params.row.isActive ? "tag active": "tag delete"}>{params.row.isActive ? "Active" : "Deleted"}</span>,
        },
        {
            field: "Total Faculties",
            headerName: "Total Faculties",
            headerAlign: "center",
            width: 300,
            align: "center",
            disableColumnMenu: true,
            renderCell: (params) => <p className="mb-0">{params.row.facultyID.length}</p>,
        },
        {
            field: "Created At",
            headerName: "Created At",
            headerAlign: "center",
            width: 200,
            align: "center",
            disableColumnMenu: true,
            renderCell: (params) => <p className="mb-0">{moment(params.row.createdAt).fromNow()}</p>,
        },
        {
            field: " ",
            headerName: "Update Class",
            width: 150,
            disableColumnMenu: true,
            align: "center",
            renderCell: (params) => (
                <IconButton size="small" className="icon-hover" onClick={() => navigate(`/class/${params.row._id}`)}>
                    <EditRounded fontSize="small" />
                </IconButton>
            ),
        },
    ];

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
                        <h4>My Courses</h4>
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
                                onClick={() => navigate("/courses/add")}
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
                            rows={courses}
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

export default Courses;
