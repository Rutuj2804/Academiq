import React, { useEffect, useState } from "react";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { RootState } from "../../store";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { Input } from "../../common/forms/input";
import { Dropdown } from "../../common/forms/dropdown";
import { Button } from "@mui/material"
import { CheckboxAndLabel } from "../../common/forms/checkbox";
import { Textarea } from "../../common/forms/textarea";
import { createStaffDetails, getStaffDetails, updateStaffDetails } from "../../store/staff/actions";
import { useCrypto } from "../../utils/hooks";

const genderArray = [
    { name: "Male", value: "G" },
    { name: "Female", value: "F" },
    { name: "Transgender", value: "T" },
    { name: "Others", value: "O" },
]

const bloodGroupArray = [
    { name: "A+", value: "AP" },
    { name: "A-", value: "AN" },
    { name: "AB+", value: "ABP" },
    { name: "AB-", value: "ABN" },
    { name: "B+", value: "BP" },
    { name: "B-", value: "BN" },
    { name: "O+", value: "OP" },
    { name: "O-", value: "ON" },
    { name: "Others", value: "O" },
]

enum dropdownTypes {
    "GENDER" = "GENDER",
    "BLOOD_GROUP" = "BLOOD_GROUP",
    "CLASS" = "CLASS",
}

enum ComponentMode {
    ADD = "ADD",
    UPDATE = "UPDATE",
}

const CreateStaff = () => {
    const [formData, setFormData] = useState({
        email: "",
        enrollnmentNo: "",
        joiningYear: "",
        phone: "",
        address: "",
        alternatePhone: "",
        mothersName: "",
        fathersName: "",
        gender: genderArray[0],
        bloodGroup: bloodGroupArray[0],
        extraField1: "",
        extraField2: "",
        sendEmailNotification: true
    });

    const {
        email,
        enrollnmentNo,
        joiningYear,
        phone,
        address,
        alternatePhone,
        mothersName,
        fathersName,
        gender,
        bloodGroup,
        extraField1,
        extraField2,
        sendEmailNotification
    } = formData;

    const dispatch = useDispatch<any>();

    const { decrypt } = useCrypto();

    const isUpdate = useMatch("/staff/update/:id");

    const [currentRouteState] = useState(
        isUpdate ? ComponentMode.UPDATE : ComponentMode.ADD
    );

    const navigate = useNavigate();

    const { id }: any = useParams();

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

    const universityID = useSelector((state: RootState) => state.university.university.value)

    const staff = useSelector((state: RootState) => state.staff.staff);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDropdowns = (t: dropdownTypes, v: any) => {
        if (t === dropdownTypes.GENDER) {
            setFormData({ ...formData, gender: v });
        } else if (t === dropdownTypes.BLOOD_GROUP) {
            setFormData({ ...formData, bloodGroup: v });
        }
    };

    useEffect(() => {
        if(currentRouteState === ComponentMode.UPDATE && Object.keys(staff).length > 0) {
            const s :any = staff
            setFormData({
                email: s.userID.email,
                enrollnmentNo: s.enrollnmentNo,
                joiningYear: s.joiningYear,
                phone: s.phone,
                address: s.address,
                alternatePhone: s.alternatePhone,
                mothersName: s.mothersName,
                fathersName: s.fathersName,
                gender: genderArray.filter(t=>t.value === s.gender)[0],
                bloodGroup: bloodGroupArray.filter(t=>t.value === s.bloodGroup)[0],
                extraField1: s.extraField1,
                extraField2: s.extraField2,
                sendEmailNotification: true
            })
        }
    }, [staff, currentRouteState])

    useEffect(() => {
        if (currentRouteState === ComponentMode.UPDATE) {
            const decode: any = decrypt(id);
            dispatch(getStaffDetails(decode));
        }
    }, [currentRouteState, universityID, id, dispatch]);

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ADMINISTRATION", "Staff", isUpdate? "Update" :"Add"],
                link: "/staffs",
            })
        );
    }, [dispatch]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(currentRouteState === ComponentMode.ADD)
        dispatch(createStaffDetails({
            universityID: universityID,
            email: email,
            enrollnmentNo: enrollnmentNo,
            isActive: true,
            joiningYear: joiningYear,
            address: address,
            phone: phone,
            alternatePhone: alternatePhone,
            fathersName: fathersName,
            mothersName: mothersName,
            gender: gender.value,
            bloodGroup: bloodGroup.value,
            extraField1: extraField1,
            extraField2: extraField2,
            navigate: navigate
        }))
        else{
            dispatch(updateStaffDetails({
                staffID: staff._id!,
                universityID: universityID,
                email: email,
                enrollnmentNo: enrollnmentNo,
                isActive: true,
                joiningYear: joiningYear,
                address: address,
                phone: phone,
                alternatePhone: alternatePhone,
                fathersName: fathersName,
                mothersName: mothersName,
                gender: gender.value,
                bloodGroup: bloodGroup.value,
                extraField1: extraField1,
                extraField2: extraField2,
                navigate: navigate
            }))
        }
        setFormData({
            email: "",
            enrollnmentNo: "",
            joiningYear: "",
            phone: "",
            address: "",
            alternatePhone: "",
            mothersName: "",
            fathersName: "",
            gender: genderArray[0],
            bloodGroup: bloodGroupArray[0],
            extraField1: "",
            extraField2: "",
            sendEmailNotification: true
        })
    }

    const handleCheckboxes = (_: React.ChangeEvent<HTMLInputElement>, c: boolean) => {
        setFormData({ ...formData, sendEmailNotification: c });
    }

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

            <main className="createStudent__Wrapper">
                <div className="paper">
                    <div className="createStudent__Form">
                        <div className="header">
                            <h4>{currentRouteState === ComponentMode.ADD ? "Add" : "Update"} Staff</h4>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={handleChange}
                                        name="email"
                                        required
                                        autoComplete="off"
                                        placeholder="Email"
                                        autoFocus
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Input
                                        type="date"
                                        value={joiningYear}
                                        onChange={handleChange}
                                        name="joiningYear"
                                        autoComplete="off"
                                        placeholder="Joining Year"
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Input
                                        value={enrollnmentNo}
                                        onChange={handleChange}
                                        name="enrollnmentNo"
                                        required
                                        autoComplete="off"
                                        placeholder="Enrollnment Number"
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Input
                                        value={mothersName}
                                        onChange={handleChange}
                                        name="mothersName"
                                        autoComplete="off"
                                        placeholder="Mothers Name"
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Input
                                        value={fathersName}
                                        onChange={handleChange}
                                        name="fathersName"
                                        autoComplete="off"
                                        placeholder="Fathers Name"
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Input
                                        value={phone}
                                        onChange={handleChange}
                                        name="phone"
                                        autoComplete="off"
                                        placeholder="Phone"
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Input
                                        value={alternatePhone}
                                        onChange={handleChange}
                                        name="alternatePhone"
                                        autoComplete="off"
                                        placeholder="Alternate Phone"
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12 mb-4">
                                    <Dropdown
                                        optionsArr={genderArray}
                                        selected={gender}
                                        setSelected={(v: number | string) =>
                                            handleDropdowns(
                                                dropdownTypes.GENDER,
                                                v
                                            )
                                        }
                                        placeholder="Gender"
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12 mb-4">
                                    <Dropdown
                                        optionsArr={bloodGroupArray}
                                        selected={bloodGroup}
                                        setSelected={(v: number | string) =>
                                            handleDropdowns(
                                                dropdownTypes.BLOOD_GROUP,
                                                v
                                            )
                                        }
                                        placeholder="Blood Group"
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Input
                                        value={extraField1}
                                        onChange={handleChange}
                                        name="extraField1"
                                        autoComplete="off"
                                        placeholder="Extra Field 1"
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Input
                                        value={extraField2}
                                        onChange={handleChange}
                                        name="extraField2"
                                        autoComplete="off"
                                        placeholder="Extra Field 2"
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Textarea
                                        value={address}
                                        onChange={handleChange}
                                        name="address"
                                        autoComplete="off"
                                        placeholder="Address"
                                        rows={6}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <CheckboxAndLabel
                                        id="sunday"
                                        label="Send Email Notification"
                                        className="mb-3"
                                        description="Enabling this field sends email invite to staff for joining the university on Academiq."
                                        checked={sendEmailNotification}
                                        name="sendEmailNotification"
                                        onChange={handleCheckboxes}
                                    />
                                </div>
                                <div className="createStudent__FormButton">
                                    <Button type="submit">{currentRouteState === ComponentMode.ADD ? "Create" : "Update"} Staff</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateStaff;
