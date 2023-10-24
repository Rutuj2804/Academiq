import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { RootState } from "../../store";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { Input } from "../../common/forms/input";
import { Dropdown } from "../../common/forms/dropdown";
import { Button } from "@mui/material"
import { CheckboxAndLabel } from "../../common/forms/checkbox";
import { createStudentDetails, getStudentDetails, updateStudentDetails } from "../../store/student/actions";
import { getUniversityClass } from "../../store/class/actions";
import { Textarea } from "../../common/forms/textarea";
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

const CreateStudent = () => {
    const [formData, setFormData] = useState({
        email: "",
        enrollnmentNo: "",
        rollNumber: "",
        admissionYear: "",
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
        rollNumber,
        admissionYear,
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

    const { decrypt } = useCrypto();

    const isUpdate = useMatch("/student/update/:id");

    const [currentRouteState] = useState(
        isUpdate ? ComponentMode.UPDATE : ComponentMode.ADD
    );

    const navigate = useNavigate();

    const { id }: any = useParams();

    const universityID = useSelector((state: RootState) => state.university.university.value)
    const classesGlobal = useSelector((state: RootState) => state.class.classes)

    const student = useSelector((state: RootState) => state.student.student);

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
        if(currentRouteState === ComponentMode.UPDATE && Object.keys(student).length > 0) {
            const s :any = student
            setFormData({
                email: s.userID.email,
                enrollnmentNo: s.enrollnmentNo,
                rollNumber: s.rollNumber,
                admissionYear: s.admissionYear,
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
    }, [student, currentRouteState, setFormData])

    useEffect(() => {
        if (currentRouteState === ComponentMode.UPDATE) {
            const decode: any = decrypt(id);
            dispatch(getStudentDetails(decode));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentRouteState, universityID, id, dispatch, getStudentDetails]);

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ADMINISTRATION", "Student", isUpdate? "Update" :"Add"],
                link: "/students",
            })
        );
    }, [dispatch, isUpdate]);

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
        
    }, [classesGlobal, setClassSelected, setClasses])

    useEffect(()=>{
        if(universityID)
            dispatch(getUniversityClass({ universityID: universityID, isActive: "T" }))
    }, [universityID, dispatch])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (currentRouteState === ComponentMode.ADD)
        dispatch(createStudentDetails({
            universityID: universityID,
            classID: classSelected.value,
            email: email,
            enrollnmentNo: enrollnmentNo,
            admissionYear: admissionYear,
            isActive: true,
            address: address,
            phone: phone,
            alternatePhone: alternatePhone,
            fathersName: fathersName,
            mothersName: mothersName,
            gender: gender.value,
            bloodGroup: bloodGroup.value,
            rollNumber: rollNumber,
            extraField1: extraField1,
            extraField2: extraField2,
            navigate: navigate
        }))
        else
        dispatch(updateStudentDetails({
            studentID: student._id!,
            universityID: universityID,
            classID: classSelected.value,
            email: email,
            enrollnmentNo: enrollnmentNo,
            admissionYear: admissionYear,
            isActive: true,
            address: address,
            phone: phone,
            alternatePhone: alternatePhone,
            fathersName: fathersName,
            mothersName: mothersName,
            gender: gender.value,
            bloodGroup: bloodGroup.value,
            rollNumber: rollNumber,
            extraField1: extraField1,
            extraField2: extraField2,
            navigate: navigate
        }))
    }

    const handleCheckboxes = (_: React.ChangeEvent<HTMLInputElement>, c: boolean) => {
        setFormData({ ...formData, sendEmailNotification: c });
    }

    return (
        <div className="section__Wrapper">
            <main className="createStudent__Wrapper">
                <div className="paper">
                    <div className="createStudent__Form">
                        <div className="header">
                            <h4>{currentRouteState === ComponentMode.ADD ? "Add" : "Update"} Student</h4>
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
                                        disabled={currentRouteState === ComponentMode.UPDATE}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Input
                                        type="date"
                                        value={admissionYear}
                                        onChange={handleChange}
                                        name="admissionYear"
                                        autoComplete="off"
                                        placeholder="Admission Year"
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
                                        disabled={currentRouteState === ComponentMode.UPDATE}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Input
                                        value={rollNumber}
                                        onChange={handleChange}
                                        name="rollNumber"
                                        autoComplete="off"
                                        placeholder="Roll Number"
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
                                        description="Enabling this field sends email invite to student for joining the university on Academiq."
                                        checked={sendEmailNotification}
                                        name="sendEmailNotification"
                                        onChange={handleCheckboxes}
                                    />
                                </div>
                                <div className="createStudent__FormButton">
                                    <Button type="submit">{currentRouteState === ComponentMode.ADD ? "Create" : "Update"} Student</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateStudent;
