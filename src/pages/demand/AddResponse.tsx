import React, { useEffect, useState } from "react";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useCrypto } from "../../utils/hooks";
import { getDemandDetails, setResponseOnDemand } from "../../store/demand/actions";
import { RootState } from "../../store";
import { Avatar, Button } from "@mui/material";
import { getUserName } from "../../utils/helpers";
import moment from "moment";
import { Dropdown } from "../../common/forms/dropdown";
import { Input } from "../../common/forms/input";

const statusArray = [
    { name: "Pending", value: "PENDING" },
    { name: "Fulfilled", value: "FULFILLED" },
]

const AddResponse = () => {

    const [status, setStatus] = useState(statusArray[0])
    const [file, setFile] = useState<File | null>()
    
    const dispatch = useDispatch<any>();

    const { id } = useParams();

    const { encrypt, decrypt } = useCrypto();

    const decryptedId = decrypt(id!);

    const demand = useSelector((state: RootState) => state.demand.demand)

    const universityID = useSelector((state: RootState) => state.university.university.value)

    useEffect(() => {
        if (decryptedId)
            dispatch(
                setBreadcrumps({
                    name: ["GENERAL", "Demand Letters", "Response"],
                    link: `/demand-letters/response/${encrypt(decryptedId)}`,
                })
            );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, decryptedId]);

    useEffect(() => {
        if(Object.keys(demand).length) {
            if(demand.status === "PENDING") {
                setStatus({ name: "Pending", value: "PENDING" })
            } else if(demand.status === "FULFILLED") {
                setStatus({ name: "Fulfilled", value: "FULFILLED" })
            }
        }
    }, [demand, setStatus])

    useEffect(() => {
        if(decryptedId) {
            dispatch(getDemandDetails(decryptedId))
        }
    }, [decryptedId, dispatch])

    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(setResponseOnDemand({ universityID, status: status.value as any, demandID: decryptedId! }))
    }

    return (
        <div className="section__Wrapper">
            <main>
                <div className="paper">
                    <div className="addResponse__Wrapper">
                        <div className="header">
                            <h4>{demand.type?.name}</h4>
                        </div>
                        <div className="addResponse__Body">
                            <div className="addResponse__User">
                                <Avatar />
                                <div className="details">
                                    <h6>{demand.demandedBy ? getUserName(demand.demandedBy!) : ""}</h6>
                                    <p>{moment(demand?.createdAt).format("DD MMM, YYYY, HH:MM A")}</p>
                                </div>
                            </div>
                            <span>
                                <h6>Reason: </h6>
                                <p>{demand.reason}</p>
                            </span>
                        </div>
                        <div className="addResponse__Form">
                            <form onSubmit={onSubmit}>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <Dropdown
                                            optionsArr={statusArray}
                                            selected={status}
                                            setSelected={(e: typeof status)=>setStatus(e)}
                                            placeholder="Change Demand Status"
                                        />
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <Input
                                            type="file"
                                            placeholder="Attach file"
                                            onChange={e=>setFile(e.target.files?.length ? e.target.files [0] : null)}
                                        />
                                    </div>
                                </div>
                                <div className="addResponse__Buttons">
                                    <Button type="submit" >Submit</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddResponse;
