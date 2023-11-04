import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCrypto } from "../../utils/hooks";
import { IconButton, Tooltip } from "@mui/material";
import { RootState } from "../../store";
import {
    DeleteRounded, EditRounded,
} from "@mui/icons-material";
import { deleteDemandLetter } from "../../store/demand/actions";

export const GetDemandColumns = () => {
    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    const { encrypt } = useCrypto();

    const universityID = useSelector(
        (state: RootState) => state.university.university.value
    );

    const columns: GridColDef[] = [
        {
            field: "firstName",
            headerName: "Type",
            flex: 1,
            disableColumnMenu: true,
            minWidth: 200,
            renderCell: (params) => (
                <div className="queryBlock" onClick={()=>navigate(`/course/${encrypt(params.row._id)}`)}>
                    <h6>
                        {params.row.type.name}
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
            renderCell: (params) => <span className={params.row.status === 'PENDING' ? "tag pending": "tag active"}>{params.row.status}</span>,
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
                    <Tooltip title="Edit">
                        <IconButton
                            size="small"
                            className="icon-hover"
                            onClick={() => navigate(`/demand-letters/response/${encrypt(params.row._id)}`)}
                        >
                            <EditRounded fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                            size="small"
                            className="icon-hover-red"
                            onClick={() => dispatch(deleteDemandLetter({ universityID, demandID: [params.row._id] }))}
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
