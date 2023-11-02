import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { Input } from "../../common/forms/input";
import { RootState } from "../../store";
import { createDemandLetter, getDemandTypes } from "../../store/demand/actions";
import { Dropdown } from "../../common/forms/dropdown";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddDemand = () => {

    const [reason, setReason] = useState("")

    const [letterType, setLetterType] = useState({ name: "", value: "" })

    const dispatch = useDispatch<any>();

    const navigate = useNavigate()

    const universityID = useSelector((state: RootState) => state.university.university.value)

    const demandTypes = useSelector((state: RootState) => state.demand.demandTypes)

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["GENERAL", "Demand Letters", "Add"],
                link: "/demand-letters/add",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if(universityID) {
            dispatch(getDemandTypes(universityID))
        }
    }, [dispatch, universityID])

    const handleDropdowns = (t: typeof demandTypes[0], v: any) => {
        setLetterType(t)
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(createDemandLetter({ universityID, type: letterType.value, reason, navigate }))
    }

    return (
        <div className="section__Wrapper">
            <main className="addDemand__Wrapper">
                <div className="paper">
                    <div className="addDemand__Container">
                        <h4>Add Demand</h4>
                        <form onSubmit={onSubmit}>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Input 
                                        type="text"
                                        value={reason}
                                        onChange={e=>setReason(e.target.value)}
                                        required
                                        placeholder="Reason for demand"
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Dropdown 
                                        optionsArr={demandTypes}
                                        selected={letterType}
                                        placeholder="Select Letter Type"
                                        setSelected={handleDropdowns}
                                    />
                                </div>
                            </div>
                            <div className="addDemand__Buttons">
                                <Button type="submit">Request Letter</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddDemand;
