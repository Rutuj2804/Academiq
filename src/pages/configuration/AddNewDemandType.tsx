import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { Input } from "../../common/forms/input";
import { Textarea } from "../../common/forms/textarea";
import { Button } from "@mui/material";
import { addNewDemandType, getDemandType, updateDemandType } from "../../store/configuration/actions";
import { RootState } from "../../store";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { useCrypto } from "../../utils/hooks";

const AddNewDemandType = () => {

    const [formData, setFormData] = useState({
        name: "",
        description : ""
    })

    const { decrypt } = useCrypto();

    const isUpdate = useMatch("/configurations/demand-type/update/:id");

    const { id } = useParams()

    const { name, description } = formData

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData(f=>({...f, [e.target.name] : e.target.value}))

    const dispatch = useDispatch<any>();

    const universityID = useSelector((state: RootState) => state.university.university.value)

    const demandType = useSelector((state: RootState) => state.configuration.demandType)

    const navigate = useNavigate()

    useEffect(() => {
        if(isUpdate && id) {
            dispatch(
                setBreadcrumps({
                    name: ["CONFIGURATIONS", "Demand types", isUpdate ? "Update" :"Add"],
                    link: `/configurations/demand-type/update/${decrypt(id)}`,
                })
            );
        } else
        dispatch(
            setBreadcrumps({
                name: ["CONFIGURATIONS", "Demand types", "Add"],
                link: "/configurations/demand-type/create",
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, isUpdate, id]);

    useEffect(() => {
        if(isUpdate && universityID) {
            dispatch(getDemandType({ universityID, demandTypeID: decrypt(id!)! }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUpdate, id, dispatch, universityID])

    useEffect(()=> {
        if(Object.keys(demandType).length) {
            setFormData({ name: demandType.name!, description: demandType.description! })
        } else setFormData({ name: "", description: "" })
    }, [setFormData, demandType])

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(isUpdate) {
            dispatch(updateDemandType({ universityID, name, description, navigate, demandTypeID: decrypt(id!)! }))
        } else {
            dispatch(addNewDemandType({ universityID, name, description, navigate }))
        }
    }

    return (
        <div className="section__Wrapper">
            <main>
                <div className="paper">
                    <div className="addNewDemandType__Wrapper">
                        <h4>{isUpdate ? "Update" :"Add"} Demand Type</h4>
                        <div className="addNewDemandType__Body">
                            <form onSubmit={onSubmit}>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <Input
                                            type="text"
                                            name="name"
                                            value={name}
                                            onChange={onChange}
                                            placeholder="Name"
                                            required
                                        />
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <Textarea
                                            placeholder="Description"
                                            name="description"
                                            value={description}
                                            onChange={onChange}
                                            rows={5}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="addNewDemandType__Buttons">
                                    <Button type="submit">Submit</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddNewDemandType;
