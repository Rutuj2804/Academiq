import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { Button } from "@mui/material"
import { FileDownloadRounded } from "@mui/icons-material";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { layoutTheme } from "../../store/settings/types";
import { getActivitySubmissions } from "../../store/activity/actions";
import { useCrypto } from "../../utils/hooks";
import { GetDidNotSubmitColumns, GetSubmissionsColumns } from "../../components/grid";

enum TabType {
    ACTIVE = "T",
    DELETED = "F",
}

const ActivitySubmission = () => {
    const [activeTab, setActiveTab] = useState(TabType.ACTIVE);
    const [selectedRow, setSelectedRow] = useState<GridRowSelectionModel>([]);
console.log(selectedRow)
    const dispatch = useDispatch<any>();

    const [page, setPage] = useState(0);

    const { id } = useParams()

    const { decrypt } = useCrypto()

    const universityID = useSelector((state: RootState) => state.university.university.value);

    const submissions = useSelector((state: RootState) => state.activity.submissions);

    const theme = useSelector((state: RootState) => state.settings.theme);

    const columns = GetSubmissionsColumns({ activeTab })
    const didNotSubmitColumns = GetDidNotSubmitColumns()

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ACADEMIC", "Activity", "Submission"],
                link: `/activities`,
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if(universityID)
        dispatch(getActivitySubmissions({ activityID: decrypt(id!)!, universityID, page, isActive: activeTab }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, universityID, activeTab, page, dispatch])

    const onTabClick = (tabType: TabType) => {
        setActiveTab(tabType);
        setPage(0);
    };

    return (
        <div className="section__Wrapper">
            <main className="classes__Wrapper">
                <div className="paper">
                    <div className="header">
                        <h4>Activity Submissions</h4>
                    </div>
                    <div className="classes__Header">
                        <div className="left">
                            <Button
                                onClick={() => onTabClick(TabType.ACTIVE)}
                                className={
                                    TabType.ACTIVE === activeTab ? "active" : ""
                                }
                            >
                                Active (0)
                            </Button>
                            <Button
                                onClick={() => onTabClick(TabType.DELETED)}
                                className={
                                    TabType.DELETED === activeTab
                                        ? "active"
                                        : ""
                                }
                            >
                                Deleted (0)
                            </Button>
                        </div>
                        <div className="right">
                            <Button endIcon={<FileDownloadRounded />}>
                                Download
                            </Button>
                        </div>
                    </div>
                    <div className="data-grid">
                        <DataGrid
                            rows={submissions}
                            columns={activeTab === TabType.ACTIVE ? columns : didNotSubmitColumns}
                            initialState={{}}
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
        </div>);
};

export default ActivitySubmission;
