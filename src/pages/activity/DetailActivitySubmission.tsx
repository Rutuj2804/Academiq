import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { useParams } from "react-router-dom";
import { useCrypto } from "../../utils/hooks";

const DetailActivitySubmission = () => {

    const dispatch = useDispatch<any>()

    const { id } = useParams()

    const { decrypt } = useCrypto()

    const decryptedId = decrypt(id!)

    useEffect(() => {
        if(true)
        dispatch(
            setBreadcrumps({
                name: ["ACADEMIC", "Activities"],
                link: `/activity/`,
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <div className="section__Wrapper">
            <main className="detailActivitySubmission__Wrapper">
                <div className="paper">
                    <div className="detailActivitySubmission__Container">detailActivitySubmission</div>
                </div>
            </main>
        </div>
    );
};

export default DetailActivitySubmission;
