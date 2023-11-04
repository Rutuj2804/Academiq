import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { IconButton, Tooltip } from "@mui/material";
import {
    ArrowUpwardRounded,
    VisibilityRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCrypto } from "../../utils/hooks";

enum TabType {
    PENDING = "T",
    COMPLETED = "F",
}

interface CProps {
    activeTab: TabType;
}

export const GetActivityColumns = ({ activeTab }: CProps) => {
    const navigate = useNavigate();

    const { encrypt } = useCrypto();

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
            renderCell: (params) => (
                <span
                    className={
                        activeTab === TabType.PENDING ? "tag pending" : "tag active"
                    }
                >
                    {activeTab === TabType.PENDING ? "Pending" : "Completed"}
                </span>
            ),
        },
        {
            field: "Class",
            headerName: "Class",
            headerAlign: "center",
            width: 200,
            align: "center",
            disableColumnMenu: true,
            renderCell: (params) => (
                <p className="mb-0">{params.row.classID?.name}</p>
            ),
        },
        {
            field: "Dead Line",
            headerName: "Dead Line",
            headerAlign: "center",
            width: 200,
            align: "center",
            disableColumnMenu: true,
            renderCell: (params) => (
                <p className="mb-0">
                    {moment(params.row.deadline).format("DD MMM, YYYY")}
                </p>
            ),
        },
        {
            field: "Priority",
            headerName: "Priority",
            headerAlign: "center",
            width: 200,
            align: "center",
            disableColumnMenu: true,
            renderCell: (params) => (
                <p className="mb-0">{params.row.priority}</p>
            ),
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
                    {/* {activeTab === TabType.PENDING ? ( */}
                        <Tooltip title="Upload Solution">
                            <IconButton
                                size="small"
                                className="icon-hover"
                                onClick={() =>
                                    navigate(
                                        `/activities/submission/${encrypt(
                                            params.row._id
                                        )}`
                                    )
                                }
                            >
                                <ArrowUpwardRounded fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    {/* ) : ( */}
                        <Tooltip title="View Activity">
                            <IconButton
                                size="small"
                                className="icon-hover"
                                onClick={() =>
                                    navigate(
                                        `/activity/${encrypt(params.row._id)}`
                                    )
                                }
                            >
                                <VisibilityRounded fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    {/* )} */}
                </div>
            ),
        },
    ];

    return columns;
};
