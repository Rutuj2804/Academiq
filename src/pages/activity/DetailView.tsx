import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { Button } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import { PendingSubmissions, Submissions } from "../../components/micro/activity";
import { DetailViewTabs } from "../../components/micro/class";
import { useParams } from "react-router-dom";
import { useCrypto } from "../../utils/hooks";
import { deleteActivity, getActivity, getActivityPendingSubmissions, getActivitySubmissions } from "../../store/activity/actions";
import { RootState } from "../../store";
import moment from "moment";

const Tabs = [
    { number: "1", name: "Submissions", view: <Submissions /> },
    { number: "2", name: "Pending Submission", view: <PendingSubmissions /> },
];

const ActivityDetailView = () => {
    const [currentTab, setCurrentTab] = useState(Tabs[0]);

    const dispatch = useDispatch<any>();

    const { id } = useParams()

    const { encrypt, decrypt } = useCrypto()

    const decryptedId = decrypt(id!)

    const universityID = useSelector((state: RootState) => state.university.university.value)

    const activity = useSelector((state: RootState) => state.activity.activity)

    useEffect(() => {
        if(decryptedId && activity.name)
        dispatch(
            setBreadcrumps({
                name: ["ACADEMIC", "Activities", activity.name],
                link: `/activity/${encrypt(decryptedId)}`,
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, decryptedId, activity]);

    useEffect(() => {
        if(decryptedId) {
            dispatch(getActivity({ activityID: decryptedId, universityID }))
        }
    }, [decryptedId, dispatch, universityID])

    useEffect(()=>{
        if(decryptedId) {
            dispatch(getActivitySubmissions({ universityID, activityID: decryptedId, isActive: "T" }))
            dispatch(getActivityPendingSubmissions({ universityID, activityID: decryptedId, isActive: "F" }))
        }
    }, [dispatch, decryptedId, universityID])

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab((v) => Tabs.filter((t) => t.number === newValue)[0]);
    };

    return (
        <div className="section__Wrapper">
            <main className="activityDetail__Wrapper">
                <div className="paper">
                    <div className="activityDetail__Container">
                        <h4>{activity.name}</h4>
                        <p>
                            {activity.description}
                        </p>
                        <div className="activityDetail__ActionBar">
                            <div className="left">
                                <div className="activityDetail__Minitab">
                                    <p>Posted On</p>
                                    <h6>{moment(activity.createdAt).format("DD MMM, YYYY")}</h6>
                                </div>
                                <div className="activityDetail__Minitab">
                                    <p>Deadline</p>
                                    <h6>{moment(activity.deadline).format("DD MMM, YYYY")}</h6>
                                </div>
                            </div>
                            <div className="right">
                                <div className="activityDetail__Buttons">
                                    <Button
                                        startIcon={<DeleteRounded />}
                                        className="red"
                                        onClick={()=>dispatch(deleteActivity({ universityID, activityID: [decryptedId!] }))}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="activityDetail__Tabs">
                            <DetailViewTabs
                                currentTab={currentTab}
                                tabs={Tabs}
                                handleChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ActivityDetailView;
