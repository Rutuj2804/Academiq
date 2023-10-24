import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { FcBarChart, FcPieChart } from "react-icons/fc";
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

    const dispatch = useDispatch<any>();

    const [page, setPage] = useState(0);

    const { id } = useParams()

    const { decrypt } = useCrypto()

    const navigate = useNavigate();

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

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
    }, [id, universityID, activeTab])

    const onTabClick = (tabType: TabType) => {
        setActiveTab(tabType);
        setPage(0);
    };

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
