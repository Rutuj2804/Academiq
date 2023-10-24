import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import {
    deleteAllCourse,
    deleteAllCoursePermanent,
    deleteCourse,
    deleteCoursePermanent,
    getCoursesGlobal,
    getMyCoursesCountOnTabNumbers,
} from "../../store/course/actions";
import { Button } from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { AddRounded, FileDownloadRounded } from "@mui/icons-material";
import { layoutTheme } from "../../store/settings/types";
import { Pagination } from "../../common/pagination";
import { GetCourseColumns } from "../../components/grid";
import { setDelete } from "../../store/layout/slice";

enum TabType {
    ALL = "A",
    ACTIVE = "T",
    DELETED = "F",
}

const Courses = () => {
    const [activeTab, setActiveTab] = useState(TabType.ALL);
    const [selectedRow, setSelectedRow] = useState<GridRowSelectionModel>([]);

    const [page, setPage] = useState(0);

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    const universityID = useSelector(
        (state: RootState) => state.university.university.value
    );

    const theme = useSelector((state: RootState) => state.settings.theme);

    const courses = useSelector((state: RootState) => state.course.courses)
    const display = useSelector((state: RootState) => state.course.display)
    const pagination = useSelector((state: RootState) => state.course.pagination)

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ACADEMIC", "Courses"],
                link: "/courses",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if(universityID)
            dispatch(getMyCoursesCountOnTabNumbers({ universityID: universityID, isActive: "A" }));
    }, [universityID, dispatch]);

    useEffect(() => {
        if(universityID)
            dispatch(getCoursesGlobal({ universityID: universityID, isActive: activeTab, page: page }));
    }, [universityID, dispatch, activeTab, page])

    const onTabClick = (tabType: TabType) => {
        setActiveTab(tabType)
        setPage(0)
    }

    const columns: GridColDef[] = GetCourseColumns({ activeTab })

    const onDeleteMultipleClick = () => {
        var selected: any[] = selectedRow;
        if (activeTab === TabType.DELETED) {
            dispatch(
                setDelete({
                    isOpen: true,
                    callback: () =>
                        dispatch(
                            deleteCoursePermanent({
                                universityID: universityID,
                                courseID: selected,
                            })
                        ),
                    text: `Are you sure you want to permanentely delete ${selected.length} courses?`,
                })
            );
        } else {
            dispatch(
                deleteCourse({
                    universityID: universityID,
                    courseID: selected,
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
                            deleteAllCoursePermanent({
                                universityID: universityID,
                            })
                        ),
                    text: `Are you sure you want to permanentely delete all courses?`,
                })
            );
        } else {
            dispatch(
                deleteAllCourse({
                    universityID: universityID,
                })
            );
        }
    };

    return (
        <div className="section__Wrapper">
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
                                <Button 
                                    className="red"
                                    onClick={onDeleteMultipleClick}
                                >
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

export default Courses;
