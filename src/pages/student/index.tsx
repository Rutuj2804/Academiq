import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import {
    AddRounded,
    FileDownloadRounded,
} from "@mui/icons-material";
import { layoutTheme } from "../../store/settings/types";
import {
    deleteAllStudents,
    deleteAllStudentsPermanent,
    deleteStudents,
    deleteStudentsPermanent,
    getStudentsCountOnTabNumbers,
    getUniversityStudents,
} from "../../store/student/actions";
import { GetStudentColumns } from "../../components/grid";
import { Pagination } from "../../common/pagination";
import { setDelete } from "../../store/layout/slice";

enum TabType {
    ALL = "A",
    ACTIVE = "T",
    DELETED = "F",
}

const Student = () => {
    const [activeTab, setActiveTab] = useState(TabType.ALL);
    const [selectedRow, setSelectedRow] = useState<GridRowSelectionModel>([]);

    const [page, setPage] = useState(0);

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    const theme = useSelector((state: RootState) => state.settings.theme);

    const pagination = useSelector((state: RootState) => state.student.pagination)

    const universityID = useSelector(
        (state: RootState) => state.university.university.value
    );

    const studentsGlobal = useSelector(
        (state: RootState) => state.student.students
    );
    const display = useSelector((state: RootState) => state.student.display);

    const columns: GridColDef[] = GetStudentColumns({ activeTab });

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ADMINISTRATION", "Student"],
                link: "/students",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if(universityID){
            dispatch(
                getUniversityStudents({
                    universityID: universityID,
                    isActive: activeTab,
                    page: page
                })
            );
        }
    }, [universityID, dispatch, page, activeTab]);

    useEffect(() => {
        if(universityID)
            dispatch(getStudentsCountOnTabNumbers(universityID));
    }, [universityID, dispatch])

    const onTabClick = (tabType: TabType) => {
        setActiveTab(tabType);
        setPage(0)
    };

    const onDeleteMultipleClick = () => {
        var selected: any[] = selectedRow;
        if (activeTab === TabType.DELETED) {
            dispatch(
                setDelete({
                    isOpen: true,
                    callback: () =>
                        dispatch(
                            deleteStudentsPermanent({
                                universityID: universityID,
                                studentID: selected,
                            })
                        ),
                    text: `Are you sure you want to permanentely delete ${selected.length} classes?`,
                })
            );
        } else {
            dispatch(
                deleteStudents({
                    universityID: universityID,
                    studentID: selected,
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
                            deleteAllStudentsPermanent({
                                universityID: universityID,
                                studentID: []
                            })
                        ),
                    text: `Are you sure you want to permanentely delete all students?`,
                })
            );
        } else {
            dispatch(
                deleteAllStudents({
                    universityID: universityID,
                    studentID: []
                })
            );
        }
    };

    return (
        <div className="section__Wrapper">
            <main className="classes__Wrapper">
                <div className="paper">
                    <div className="header">
                        <h4>My Student</h4>
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
                                onClick={() => navigate("/student/create")}
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
                            rows={studentsGlobal}
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

export default Student;
