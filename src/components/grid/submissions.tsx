import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { IconButton, Tooltip } from "@mui/material";
import {
    ArrowUpwardRounded,
    EditRounded,
    VisibilityRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCrypto } from "../../utils/hooks";
import { getUserName } from "../../utils/helpers";

enum TabType {
    ACTIVE = "T",
    DELETED = "F",
}

interface CProps {
    activeTab: TabType;
}

export const GetSubmissionsColumns = ({ activeTab }: CProps) => {
    const navigate = useNavigate();

    const { encrypt } = useCrypto();

    const columns: GridColDef[] = [
        {
            field: "firstName",
            headerName: "Title",
            flex: 1,
            disableColumnMenu: true,
            minWidth: 200,
            renderCell: (params) => (
                <div className="queryBlock">
                    <h6>{params.row.title} </h6>
                </div>
            ),
        },
        {
            field: "Description",
            headerName: "Description",
            headerAlign: "center",
            width: 200,
            align: "center",
            disableColumnMenu: true,
            renderCell: (params) => <span>{params.row.description}</span>,
        },
        {
            field: "Submitted by",
            headerName: "Submitted By",
            headerAlign: "center",
            width: 200,
            align: "center",
            disableColumnMenu: true,
            renderCell: (params) => (
                <h6 className="mb-0">{getUserName(params.row.studentID)}</h6>
            ),
        },
        {
            field: "Submitted on",
            headerName: "Submitted on",
            headerAlign: "center",
            width: 200,
            align: "center",
            disableColumnMenu: true,
            renderCell: (params) => (
                <p className="mb-0">
                    {moment(params.row.createdAt).format("DD MMM, YYYY")}
                </p>
            ),
        },
        {
            field: "Status",
            headerName: "Status",
            headerAlign: "center",
            width: 200,
            align: "center",
            disableColumnMenu: true,
            renderCell: (params) => <p className="mb-0">{params.row.status}</p>,
        },
        {
            field: " ",
            headerName: "Actions",
            headerAlign: "center",
            width: 150,
            disableColumnMenu: true,
            align: "center",
            renderCell: (params) => (
                <div className="data-grid-actions">
                    <Tooltip title="View Submission">
                        <IconButton
                            size="small"
                            className="icon-hover"
                            onClick={() =>
                                navigate(
                                    `/activity/sub/${encrypt(params.row._id)}`
                                )
                            }
                        >
                            <VisibilityRounded fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Submission">
                        <IconButton
                            size="small"
                            className="icon-hover"
                            onClick={() =>
                                navigate(
                                    `/activity/sub/edit/${encrypt(
                                        params.row._id
                                    )}`
                                )
                            }
                        >
                            <EditRounded fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return columns;
};

export const GetDidNotSubmitColumns = () => {
    const columns: GridColDef[] = [
        {
            field: "Submitted by",
            headerName: "Submitted By",
            headerAlign: "center",
            width: 200,
            align: "center",
            disableColumnMenu: true,
            renderCell: (params) => (
                <h6 className="mb-0">{getUserName(params.row)}</h6>
            ),
        },
        {
            field: "Status",
            headerName: "Status",
            headerAlign: "center",
            width: 200,
            align: "center",
            disableColumnMenu: true,
            renderCell: (params) => <p className="mb-0">Pending Submission</p>,
        },
        {
            field: " ",
            headerName: "Actions",
            headerAlign: "center",
            width: 150,
            disableColumnMenu: true,
            align: "center",
            renderCell: (params) => <></>,
        },
    ];

    return columns;
};
