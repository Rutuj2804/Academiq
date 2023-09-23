import React, { useEffect, useState } from "react";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridCallbackDetails, GridColDef, GridColumnHeaderParams, GridRowSelectionModel, MuiEvent, } from "@mui/x-data-grid";
import { GoPrimitiveDot } from "react-icons/go";
import { Button, IconButton, Tooltip } from "@mui/material";
import { AddRounded, CheckCircleRounded, DeleteRounded, EditRounded, FileDownloadRounded } from "@mui/icons-material";
import { layoutTheme } from "../../store/settings/types";
import { deleteClass, deleteClassPermanent, getMyClassesCountOnTabNumbers, getUniversityClass, reactivateClass } from "../../store/class/actions";
import moment from "moment";
import { Pagination } from "../../common/pagination";
import { useCrypto } from "../../utils/hooks";
import { setDelete } from "../../store/layout/slice";

enum TabType {
    ALL = "A",
    ACTIVE = "T",
    DELETED = "F",
}

const Classes = () => {
    const [activeTab, setActiveTab] = useState(TabType.ALL);
    const [selectedRow, setSelectedRow] = useState<GridRowSelectionModel>([]);

    const [page, setPage] = useState(0);

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
        dispatch(
            getUniversityClass({
                universityID: universityID,
                isActive: activeTab,
                page: value,
            })
        );
    };

    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    const { encrypt } = useCrypto();

    const theme = useSelector((state: RootState) => state.settings.theme);

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

    const universityID = useSelector(
        (state: RootState) => state.university.university.value
    );

    const classesOfUniversity = useSelector(
        (state: RootState) => state.class.classes
    );
    const display = useSelector((state: RootState) => state.class.display);
    const pagination = useSelector(
        (state: RootState) => state.class.pagination
    );

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ACADEMIC", "Classes"],
                link: "/classes",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if (universityID) {
            dispatch(
                getUniversityClass({
                    universityID: universityID,
                    isActive: activeTab,
                    page: page,
                })
            );
            dispatch(
                getMyClassesCountOnTabNumbers({ universityID, isActive: "T" })
            );
        }
    }, [universityID, dispatch]);

    const onTabClick = (tabType: TabType) => {
        setActiveTab(tabType);
        setPage(0);
        dispatch(
            getUniversityClass({
                universityID: universityID,
                isActive: tabType,
                page: 0,
            })
        );
    };

    const onRowDelete = (params: any) => {
        if (activeTab === TabType.DELETED) {
            dispatch(
                setDelete({
                    isOpen: true,
                    callback: () =>
                        dispatch(
                            deleteClassPermanent({
                                universityID: universityID,
                                classID: [params.row._id],
                            })
                        ),
                    text: `Are you sure you want to delete class: ${params.row.name} ?`,
                })
            );
        } else {
            dispatch(
                deleteClass({
                    universityID: universityID,
                    classID: [params.row._id],
                })
            );
        }
    };

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
            renderCell: (params) => (
                <span
                    className={
                        params.row.isActive ? "tag active" : "tag delete"
                    }
                >
                    {params.row.isActive ? "Active" : "Deleted"}
                </span>
            ),
        },
        {
            field: "Created By",
            headerName: "Created By",
            headerAlign: "center",
            width: 300,
            align: "center",
            disableColumnMenu: true,
            renderCell: (params) => (
                <p className="mb-0">
                    {params.row.createdBy.firstname +
                        " " +
                        params.row.createdBy.lastname}
                </p>
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
            headerAlign: "center",
            headerName: "Actions",
            width: 150,
            disableColumnMenu: true,
            align: "center",
            renderCell: (params) => (
                <div className="data-grid-actions">
                    {!params.row.isActive ? (
                        <Tooltip title="Reactivate">
                            <IconButton
                                size="small"
                                className="icon-hover"
                                onClick={() =>
                                    dispatch(
                                        reactivateClass({
                                            universityID: universityID,
                                            classID: [params.row._id],
                                        })
                                    )
                                }
                                disabled={
                                    !params.row.isActive &&
                                    !(activeTab === TabType.DELETED)
                                }
                            >
                                <CheckCircleRounded fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Edit">
                            <IconButton
                                size="small"
                                className="icon-hover"
                                onClick={() =>
                                    navigate(
                                        `/class/update/${encrypt(
                                            params.row._id
                                        )}`
                                    )
                                }
                                disabled={!params.row.isActive}
                            >
                                <EditRounded fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}

                    <Tooltip title="Delete">
                        <IconButton
                            size="small"
                            className="icon-hover-red"
                            onClick={() => onRowDelete(params)}
                            disabled={
                                !params.row.isActive &&
                                !(activeTab === TabType.DELETED)
                            }
                        >
                            <DeleteRounded fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        },
    ];

    const onDeleteMultipleClick = () => {
        var selected: any[] = selectedRow
        if(activeTab === TabType.DELETED) {
            dispatch(
                setDelete({
                    isOpen: true,
                    callback: () =>
                        dispatch(
                            deleteClassPermanent({
                                universityID: universityID,
                                classID: selected,
                            })
                        ),
                    text: `Are you sure you want to permanentely delete ${selected.length} classes?`,
                })
            );
        } else {
            dispatch(
                deleteClass({
                    universityID: universityID,
                    classID: selected,
                })
            );
        }
    }

    const onDeleteCompleteClick = () => {
        var selected: any[] = selectedRow
        if(activeTab === TabType.DELETED) {
            dispatch(
                setDelete({
                    isOpen: true,
                    callback: () =>
                        dispatch(
                            deleteClassPermanent({
                                universityID: universityID,
                                classID: selected,
                            })
                        ),
                    text: `Are you sure you want to permanentely delete all classes?`,
                })
            );
        } else {
            dispatch(
                deleteClass({
                    universityID: universityID,
                    classID: selected,
                })
            );
        }
    }

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
                        <h4>My Classes</h4>
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
                                <Button className="red" onClick={onDeleteCompleteClick}>
                                    Delete All ({display.all})
                                </Button>
                            ) : null}
                        </div>
                        <div className="right">
                            <Button
                                endIcon={<AddRounded />}
                                onClick={() => navigate("/classes/add")}
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
                            rows={classesOfUniversity}
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
                            onRowSelectionModelChange={(t, v) =>
                                setSelectedRow(t)
                            }
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

export default Classes;
