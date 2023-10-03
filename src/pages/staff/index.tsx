import React, { useEffect, useState } from "react";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import {
    AddRounded,
    FileDownloadRounded,
} from "@mui/icons-material";
import { layoutTheme } from "../../store/settings/types";
import { deleteAllStaff, deleteAllStaffPermanent, deleteStaff, deleteStaffPermanent, getStaffCountOnTabNumbers, getUniversityStaff } from "../../store/staff/actions";
import { Pagination } from "../../common/pagination";
import { GetStaffColumns } from "../../components/grid";
import { setDelete } from "../../store/layout/slice";

enum TabType {
    ALL = "A",
    ACTIVE = "T",
    DELETED = "F",
}

const Staff = () => {
    const [activeTab, setActiveTab] = useState(TabType.ALL);
    const [selectedRow, setSelectedRow] = useState<GridRowSelectionModel>([]);

    const [page, setPage] = useState(0);

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        dispatch(
            getUniversityStaff({
                universityID: universityID,
                isActive: activeTab,
                page: value,
            })
        );
    };

    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    const theme = useSelector((state: RootState) => state.settings.theme);

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

    const universityID = useSelector((state: RootState) => state.university.university.value)

    const staffsGlobal = useSelector((state: RootState) => state.staff.staffs)
    const display = useSelector((state: RootState) => state.staff.display)

    const pagination = useSelector((state: RootState) => state.staff.pagination)

    const columns = GetStaffColumns({ activeTab })

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ADMINISTRATION", "Staff"],
                link: "/staffs",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if(universityID) {
            dispatch(getUniversityStaff({
                universityID: universityID,
                isActive: activeTab,
                page: page
            }))
            dispatch(getStaffCountOnTabNumbers(universityID))
        }
    }, [universityID])

    const onTabClick = (tabType: TabType) => {
        setActiveTab(tabType);
        dispatch(
            getUniversityStaff({
                universityID: universityID,
                isActive: tabType,
                page: 0
            })
        );
    };

    const onDeleteMultipleClick = () => {
        var selected: any[] = selectedRow;
        if (activeTab === TabType.DELETED) {
            dispatch(
                setDelete({
                    isOpen: true,
                    callback: () =>
                        dispatch(
                            deleteStaffPermanent({
                                universityID: universityID,
                                staffID: selected,
                            })
                        ),
                    text: `Are you sure you want to permanentely delete ${selected.length} classes?`,
                })
            );
        } else {
            dispatch(
                deleteStaff({
                    universityID: universityID,
                    staffID: selected,
                })
            );
        }
    };

    const onDeleteCompleteClick = () => {
        if (activeTab === TabType.DELETED) {
            dispatch(
                setDelete({
                    isOpen: true,
                    callback: () =>
                        dispatch(
                            deleteAllStaffPermanent({
                                universityID: universityID,
                                staffID: []
                            })
                        ),
                    text: `Are you sure you want to permanentely delete all students?`,
                })
            );
        } else {
            dispatch(
                deleteAllStaff({
                    universityID: universityID,
                    staffID: []
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
                        <h4>My Staff</h4>
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
                                <Button className="red" onClick={onDeleteMultipleClick}>
                                    Delete ({selectedRow.length})
                                </Button>
                            ) : null}
                            {selectedRow.length === 10 ? (
                                <Button
                                    className="red"
                                    onClick={onDeleteCompleteClick}
                                >
                                    Delete All ({display.all})
                                </Button>
                            ) : null}
                        </div>
                        <div className="right">
                            <Button
                                endIcon={<AddRounded />}
                                onClick={() => navigate("/staff/create")}
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
                            rows={staffsGlobal}
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

export default Staff;
