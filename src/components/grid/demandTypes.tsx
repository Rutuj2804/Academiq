import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCrypto } from "../../utils/hooks";
import { RootState } from "../../store";
import { GridColDef } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import { DeleteRounded, EditRounded } from "@mui/icons-material";
import moment from "moment";
import { getUserName } from "../../utils/helpers";
import { deleteDemandType } from "../../store/configuration/actions";

export const GetDemandTypeColumns = () => {
    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    const { encrypt } = useCrypto();

    const universityID = useSelector(
        (state: RootState) => state.university.university.value
    );

    const columns: GridColDef[] = [
        {
            field: "firstName",
            headerName: "Course Name",
            flex: 1,
            disableColumnMenu: true,
            minWidth: 200,
            renderCell: (params) => (
                <div className="queryBlock">
                    <h6>
                        {params.row.name}
                    </h6>
                </div>
            ),
        },
        {
            field: "Description",
            headerName: "Description",
            headerAlign: "center",
            width: 300,
            align: "center",
            disableColumnMenu: true,
            renderCell: (params) => <p className="mb-0">{params.row.description}</p>,
        },
        {
            field: "Created By",
            headerName: "Created By",
            headerAlign: "center",
            width: 200,
            align: "center",
            disableColumnMenu: true,
            renderCell: (params) => <p className="mb-0">{getUserName(params.row.createdBy)}</p>,
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
                    <Tooltip title="Update">
                        <IconButton
                            size="small"
                            className="icon-hover-red"
                            onClick={() =>navigate(`/configurations/demand-type/update/${encrypt(params.row._id)}`)}
                        >
                            <EditRounded fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                            size="small"
                            className="icon-hover-red"
                            onClick={() =>dispatch(deleteDemandType({ universityID, demandTypeID: [params.row._id] }))}
                        >
                            <DeleteRounded fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return columns
}