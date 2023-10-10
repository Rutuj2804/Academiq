import { CloseRounded } from "@mui/icons-material";
import { IconButton, Button } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useOutsideClickHandler } from "../../utils/hooks";
import { setAssignment } from "../../store/layout/slice";
import { Dropdown } from "../../common/forms/dropdown";
import { getUniversityFaculty } from "../../store/faculty/actions";
import { getUserName } from "../../utils/helpers";
import { getUniversityClass } from "../../store/class/actions";
import { addFacultyToClass } from "../../store/assignment/actions";

interface DropdownProps {
    name: string;
    value: string;
}

const AddAssignment = () => {
    const [faculty, setFaculty] = useState<DropdownProps[]>([]);
    const [selectedFaculty, setSelectedFaculty] = useState<DropdownProps>({
        name: "",
        value: "",
    });
    const [classes, setClasses] = useState<DropdownProps[]>([]);
    const [selectedClass, setSelectedClass] = useState<DropdownProps>({
        name: "",
        value: "",
    });

    const dispatch = useDispatch<any>();

    const assignmentRef = useRef<HTMLDivElement>(null);

    const closeModal = () => dispatch(setAssignment({ isOpen: false, type: null, }));

    useOutsideClickHandler(assignmentRef, () => closeModal());

    const university = useSelector(
        (state: RootState) => state.university.university.value
    );
    const faculties = useSelector(
        (state: RootState) => state.faculty.faculties
    );
    const classesGlobal = useSelector(
        (state: RootState) => state.class.classes
    );
    const layout = useSelector(
        (state: RootState) => state.layout.assignment
    );

    useEffect(() => {
        if (university) {
            dispatch(
                getUniversityFaculty({
                    universityID: university,
                    isActive: "T",
                })
            );
            dispatch(
                getUniversityClass({
                    universityID: university,
                    isActive: "T",
                })
            );
        }
    }, [university, dispatch]);

    useEffect(() => {
        if (faculties.length) {
            const data = [];
            for (let i = 0; i < faculties.length; i++) {
                data.push({
                    name: getUserName(faculties[i].userID!),
                    value: faculties[i].userID?._id!,
                });
            }
            setFaculty(data);
        }
    }, [faculties]);

    useEffect(() => {
        if (classesGlobal.length) {
            const data = [];
            for (let i = 0; i < classesGlobal.length; i++) {
                data.push({
                    name: classesGlobal[i].name!,
                    value: classesGlobal[i]._id!,
                });
            }
            setClasses(data);
        }
    }, [classesGlobal]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(layout.type === "FACULTY")
            dispatch(
                addFacultyToClass({
                    universityID: university,
                    classID: selectedClass.value,
                    facultyID: selectedFaculty.value,
                })
            );
        else if(layout.type === "COURSES") {}
        closeModal()
    };

    return (
        <div ref={assignmentRef} className="addAssignment__Wrapper">
            <div className="addAssignment__Header">
                <h4>Add New Assignment</h4>
                <IconButton onClick={closeModal}>
                    <CloseRounded />
                </IconButton>
            </div>
            <div className="addAssignment__Form">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <Dropdown
                                optionsArr={faculty}
                                selected={selectedFaculty}
                                setSelected={(e: DropdownProps) =>
                                    setSelectedFaculty(e)
                                }
                                placeholder="Select Faculty"
                            />
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <Dropdown
                                optionsArr={classes}
                                selected={selectedClass}
                                setSelected={(e: DropdownProps) =>
                                    setSelectedClass(e)
                                }
                                placeholder="Select Class"
                            />
                        </div>
                    </div>
                    <div className="addAssignment__FormButtons">
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAssignment;
