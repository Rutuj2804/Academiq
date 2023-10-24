import React, { useEffect, useState } from "react";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { AddRounded } from "@mui/icons-material";
import { layoutTheme } from "../../store/settings/types";
import { getActivitiesGlobal, getActivityCountOnTabNumbers } from "../../store/activity/actions";
import { Pagination } from "../../common/pagination";
import { GetActivityColumns } from "../../components/grid";

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

    const columns = GetActivityColumns({ activeTab })

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
