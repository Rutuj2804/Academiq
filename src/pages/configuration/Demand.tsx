import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { Button } from "@mui/material";
import { AddRounded, FileDownloadRounded } from "@mui/icons-material";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { RootState } from "../../store";
import { layoutTheme } from "../../store/settings/types";
import { GetDemandTypeColumns } from "../../components/grid/demandTypes";
import { useNavigate } from "react-router-dom";
import { getDemandTypes } from "../../store/configuration/actions";

enum TabType {
    ALL = "A",
    ACTIVE = "T",
    DELETED = "F",
}

const Demand = () => {
    const [activeTab, setActiveTab] = useState(TabType.ALL);
    const [selectedRow, setSelectedRow] = useState<GridRowSelectionModel>([]);

    const [page, setPage] = useState(0);

    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    const universityID = useSelector(
        (state: RootState) => state.university.university.value
    );

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["CONFIGURATIONS", "Demand types"],
                link: "/configurations/demand-type",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if (universityID) {
            dispatch(getDemandTypes({ universityID }));
        }
    }, [universityID, dispatch]);

    const demandTypes = useSelector(
        (state: RootState) => state.configuration.demandTypes
    );

    const display = useSelector(
        (state: RootState) => state.configuration.display
    );

    const theme = useSelector((state: RootState) => state.settings.theme);

    const columns = GetDemandTypeColumns();

    const onTabClick = (tabType: TabType) => {
        setActiveTab(tabType);
        setPage(0);
    };

    return (
        <div className="section__Wrapper">
            <main>
                <div className="paper">
                    <div className="classes__Wrapper">
                        <div className="header">
                            <h4>Demand Types</h4>
                        </div>
                        <div className="classes__Header">
                            <div className="left">
                                <Button
                                    onClick={() => onTabClick(TabType.ALL)}
                                    className={
                                        TabType.ALL === activeTab
                                            ? "active"
                                            : ""
                                    }
                                >
                                    All ({display.all})
                                </Button>
                                <Button
                                    onClick={() => onTabClick(TabType.ACTIVE)}
                                    className={
                                        TabType.ACTIVE === activeTab
                                            ? "active"
                                            : ""
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
                                    <Button className="red">
                                        Delete ({selectedRow.length})
                                    </Button>
                                ) : null}
                            </div>
                            <div className="right">
                                <Button
                                    endIcon={<AddRounded />}
                                    onClick={() =>
                                        navigate(
                                            "/configurations/demand-type/create"
                                        )
                                    }
                                >
                                    Add
                                </Button>
                                <Button endIcon={<FileDownloadRounded />}>
                                    Download
                                </Button>
                            </div>
                        </div>
                        <div className="demandTypeConfig__Body">
                            <DataGrid
                                rows={demandTypes}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 10,
                                        },
                                    },
                                }}
                                pageSizeOptions={[10]}
                                checkboxSelection
                                onRowSelectionModelChange={(t) =>
                                    setSelectedRow(t)
                                }
                                disableRowSelectionOnClick
                                getRowId={(row) => row._id!}
                                sx={
                                    theme === layoutTheme[0]
                                        ? null
                                        : { color: "white" }
                                }
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Demand;
