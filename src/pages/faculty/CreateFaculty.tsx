import React, { useEffect, useState } from "react";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { Input } from "../../common/forms/input";
import { Dropdown } from "../../common/forms/dropdown";
import { Button } from "@mui/material"
import { CheckboxAndLabel } from "../../common/forms/checkbox";
import { getUniversityClass } from "../../store/class/actions";
import { Textarea } from "../../common/forms/textarea";
import { createFacultyDetails } from "../../store/faculty/actions";

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

const CreateFaculty = () => {
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

    const [classes, setClasses] = useState<any[]>([])
    const [classSelected, setClassSelected] = useState<any>({ name: "", value: ""})

    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

    const universityID = useSelector((state: RootState) => state.university.university.value)
    const classesGlobal = useSelector((state: RootState) => state.class.classes)

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
        }else if (t === dropdownTypes.CLASS) {
            setClassSelected(v)
        }
    };

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ACADEMIC", "Courses"],
                link: "/courses",
            })
        );
    }, [dispatch]);

    useEffect(() => {

        if(classesGlobal.length) {
            const data = []
            for (let i = 0; i < classesGlobal.length; i++) {
                data.push({
                    name: classesGlobal[i].name,
                    value: classesGlobal[i]._id
                })
            }
            setClassSelected(data[0])
            setClasses(data)
        }
        
    }, [classesGlobal])

    useEffect(()=>{
        dispatch(getUniversityClass({ universityID: universityID, isActive: "T" }))
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(createFacultyDetails({
            universityID: universityID,
            classID: classSelected.value,
            email: email,
            enrollnmentNo: enrollnmentNo,
            joiningYear: joiningYear,
            isActive: true,
            address: address,
            phone: phone,
            alternatePhone: alternatePhone,
            fathersName: fathersName,
            mothersName: mothersName,
            gender: gender.value,
            bloodGroup: bloodGroup.value,
            extraField1: extraField1,
            extraField2: extraField2,
        }))
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
                            <h4>Add Faculty</h4>
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
                                    <Dropdown
                                        optionsArr={classes}
                                        selected={classSelected}
                                        setSelected={(v: number | string) =>
                                            handleDropdowns(dropdownTypes.CLASS, v)
                                        }
                                        className="mb-3"
                                        placeholder="Class"
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <CheckboxAndLabel
                                        id="sunday"
                                        label="Send Email Notification"
                                        className="mb-3"
                                        description="Enabling this field sends email invite to faculty for joining the university on Academiq."
                                        checked={sendEmailNotification}
                                        name="sendEmailNotification"
                                        onChange={handleCheckboxes}
                                    />
                                </div>
                                <div className="createStudent__FormButton">
                                    <Button type="submit">Create Student</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateFaculty;
