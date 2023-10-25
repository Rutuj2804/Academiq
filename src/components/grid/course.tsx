import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCrypto } from "../../utils/hooks";
import { IconButton, Tooltip } from "@mui/material";
import { RootState } from "../../store";
import {
    CheckCircleRounded,
    DeleteRounded,
    EditRounded,
} from "@mui/icons-material";
import { setDelete } from "../../store/layout/slice";
import { deleteCourse, deleteCoursePermanent, reactivateCourse } from "../../store/course/actions";

enum TabType {
    ALL = "A",
    ACTIVE = "T",
    DELETED = "F",
}

interface Props {
    activeTab: TabType;
}

export const GetCourseColumns = ({ activeTab }: Props) => {
    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    const { encrypt } = useCrypto();

    const universityID = useSelector(
        (state: RootState) => state.university.university.value
    );

    const onRowDelete = (params: any) => {
        if (activeTab === TabType.DELETED) {
            dispatch(
                setDelete({
                    isOpen: true,
                    callback: () =>
                        dispatch(
                            deleteCoursePermanent({
                                universityID: universityID,
                                courseID: [params.row._id],
                            })
                        ),
                    text: `Are you sure you want to delete course: ${params.row.name} ?`,
                })
            );
        } else {
            dispatch(
                deleteCourse({
                    universityID: universityID,
                    courseID: [params.row._id],
                })
            );
        }
    };

    const columns: GridColDef[] = [
        {
            field: "firstName",
            headerName: "Course Name",
            flex: 1,
            disableColumnMenu: true,
            minWidth: 200,
            renderCell: (params) => (
                <div className="queryBlock" onClick={()=>navigate(`/course/${encrypt(params.row._id)}`)}>
                    <h6>
                        {params.row.name}
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
                                        reactivateCourse({
                                            universityID: universityID,
                                            courseID: [params.row._id],
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
                                        `/course/update/${encrypt(
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

    return columns;
};
