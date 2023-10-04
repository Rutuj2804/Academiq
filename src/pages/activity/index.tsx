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
import { layoutTheme } from "../../store/settings/types";
import { getActivitiesGlobal, getActivityCountOnTabNumbers } from "../../store/activity/actions";
import moment from "moment";
import { Pagination } from "../../common/pagination";

const columns: GridColDef[] = [
    {
        field: "firstName",
        headerName: "Activity",
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
        renderCell: (params) => <span className={params.row.isActive ? "tag pending" : "tag active"}>{params.row.isActive ? "Pendind" : "Completed"}</span>,
    },
    {
        field: "Class",
        headerName: "Class",
        headerAlign: "center",
        width: 200,
        align: "center",
        disableColumnMenu: true,
        renderCell: (params) => <p className="mb-0">{params.row.classID?.name}</p>,
    },
    {
        field: "Dead Line",
        headerName: "Dead Line",
        headerAlign: "center",
        width: 200,
        align: "center",
        disableColumnMenu: true,
        renderCell: (params) => <p className="mb-0">{moment(params.row.deadline).format("DD MMM, YYYY")}</p>,
    },
    {
        field: "Priority",
        headerName: "Priority",
        headerAlign: "center",
        width: 200,
        align: "center",
        disableColumnMenu: true,
        renderCell: (params) => <p className="mb-0">{params.row.priority}</p>,
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

enum TabType {
    PENDING = "T",
    COMPLETED = "F",
}

const Activities = () => {
    const [activeTab, setActiveTab] = useState(TabType.PENDING);
    const [selectedRow, setSelectedRow] = useState<GridRowSelectionModel>([]);

    const dispatch = useDispatch<any>();

    const [page, setPage] = useState(0);

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        dispatch(
            getActivitiesGlobal({
                universityID: universityID,
                isActive: activeTab,
                page: value,
            })
        );
    };

    const navigate = useNavigate();

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

    const theme = useSelector((state: RootState) => state.settings.theme);

    const universityID = useSelector((state: RootState) => state.university.university.value);

    const display = useSelector((state: RootState) => state.activity.display)

    const activities = useSelector((state: RootState) => state.activity.activities)

    const pagination = useSelector((state: RootState) => state.activity.pagination)

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ACADEMIC", "Activities"],
                link: "/activities",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if(universityID) {
            dispatch(getActivitiesGlobal({ universityID: universityID, isActive: "T", page: page }))
            dispatch(getActivityCountOnTabNumbers(universityID))
        }
    }, [universityID, dispatch])

    const onTabClick = (tabType: TabType) => {
        setActiveTab(tabType);
        dispatch(
            getActivitiesGlobal({
                universityID: universityID,
                isActive: tabType,
            })
        );
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

            <main className="activities__Wrapper">
                <div className="paper">
                    <div className="title">
                        <h4>My Activities</h4>
                    </div>
                    <div className="activities__Header">
                        <div className="left">
                            <Button
                                onClick={() => onTabClick(TabType.PENDING)}
                                className={
                                    TabType.PENDING === activeTab
                                        ? "active"
                                        : ""
                                }
                            >
                                Pending ({display.active})
                            </Button>
                            <Button
                                onClick={() => onTabClick(TabType.COMPLETED)}
                                className={
                                    TabType.COMPLETED === activeTab
                                        ? "active"
                                        : ""
                                }
                            >
                                Completed ({display.deleted})
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
                                onClick={() => navigate("/activities/add")}
                            >
                                Add
                            </Button>
                        </div>
                    </div>
                    <div className="data-grid">
                        <DataGrid
                            rows={activities}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                            slots={{
                                pagination: (paginationProps) => (
                                    <Pagination
                                        page={pagination.currentPage}
                                        pagecount={pagination.totalPages}
                                        totaldocuments={
                                            pagination.totalDocuments
                                        }
                                        currentdocuments={
                                            pagination.currentDocuments
                                        }
                                        handlepagechange={handlePageChange}
                                        {...paginationProps}
                                    />
                                ),
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

export default Activities;
