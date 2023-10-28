import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { useParams } from "react-router-dom";
import { useCrypto } from "../../utils/hooks";
import { RootState } from "../../store";
import { getSubmissionsDetails } from "../../store/activity/actions";

const DetailActivitySubmission = () => {

    const dispatch = useDispatch<any>()

    const { id } = useParams()

    const { decrypt, encrypt } = useCrypto()

    const decryptedId = decrypt(id!)

    const universityID = useSelector((state: RootState) => state.university.university.value)

    const submission = useSelector((state: RootState) => state.activity.submission)

    useEffect(() => {
        if(submission.title && decryptedId)
        dispatch(
            setBreadcrumps({
                name: ["ACADEMIC", "Activities", submission.title],
                link: `/activity/sub/${encrypt(decryptedId)}`,
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, submission, decryptedId]);

    useEffect(() => {
        if(universityID && decryptedId) {
            dispatch(getSubmissionsDetails({ universityID, submissionID: decryptedId }))
        }
    }, [universityID, decryptedId, dispatch])

    return (
        <div className="section__Wrapper">
            <main className="detailActivitySubmission__Wrapper">
                <div className="paper">
                    <div className="detailActivitySubmission__Container">
                        <h4>{submission.title}</h4>
                        <p>{submission.description}</p>
                        <p>{submission.files?.length} files attached</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DetailActivitySubmission;
