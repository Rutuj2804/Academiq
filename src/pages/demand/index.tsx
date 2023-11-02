import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { AddRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { layoutTheme } from "../../store/settings/types";
import { deleteDemandLetter, getDemandsCount, getDemandsGlobal } from "../../store/demand/actions";
import { Pagination } from "../../common/pagination";
import { GetDemandColumns } from "../../components/grid";

enum TabType {
    ALL = "A",
    PENDING = "T",
    FULL_FILLED = "F",
}

const DemandLetters = () => {
    const [activeTab, setActiveTab] = useState(TabType.ALL);
    const [selectedRow, setSelectedRow] = useState<GridRowSelectionModel>([]);

    const [page, setPage] = useState(0);

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    const theme = useSelector((state: RootState) => state.settings.theme);

    const universityID = useSelector((state: RootState) => state.university.university.value)
    const pagination = useSelector((state: RootState) => state.demand.pagination)
    const demands = useSelector((state: RootState) => state.demand.demands)
    const display = useSelector((state: RootState) => state.demand.display)

    const columns = GetDemandColumns()

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["GENERAL", "Demand Letters"],
                link: "/demand-letters",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if(universityID) {
            dispatch(getDemandsGlobal({ universityID, isActive: activeTab, page }))
        }
    }, [universityID, dispatch, activeTab, page])

    useEffect(() => {
        if(universityID) {
            dispatch(getDemandsCount({ universityID, isActive: "" }))
        }
    }, [dispatch, universityID])

    return (
        <div className="section__Wrapper">
            <main className="classes__Wrapper">
                <div className="paper">
                    <div className="header">
                        <h4>My Letters</h4>
                    </div>
                    <div className="classes__Header">
                        <div className="left">
                            <Button
                                onClick={() => setActiveTab(TabType.ALL)}
                                className={
                                    TabType.ALL === activeTab ? "active" : ""
                                }
                            >
                                All ({display.all})
                            </Button>
                            <Button
                                onClick={() => setActiveTab(TabType.PENDING)}
                                className={
                                    TabType.PENDING === activeTab
                                        ? "active"
                                        : ""
                                }
                            >
                                Pending ({display.active})
                            </Button>
                            <Button
                                onClick={() =>
                                    setActiveTab(TabType.FULL_FILLED)
                                }
                                className={
                                    TabType.FULL_FILLED === activeTab
                                        ? "active"
                                        : ""
                                }
                            >
                                Full Filled ({display.deleted})
                            </Button>
                            {selectedRow.length > 0 ? (
                                <Button className="red" onClick={()=>dispatch(deleteDemandLetter({ universityID, demandID: selectedRow as any }))}>
                                    Delete ({selectedRow.length})
                                </Button>
                            ) : null}
                        </div>
                        <div className="right">
                            <Button
                                endIcon={<AddRounded />}
                                onClick={() => navigate("/demand-letters/add")}
                            >
                                Add
                            </Button>
                        </div>
                    </div>
                    <div className="data-grid">
                        <DataGrid
                            rows={demands}
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

export default DemandLetters;
