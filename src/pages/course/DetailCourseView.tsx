import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { DetailViewTabs } from "../../components/micro/class";
import { useNavigate, useParams } from "react-router-dom";
import { useCrypto } from "../../utils/hooks";
import { getCourse } from "../../store/course/actions";
import { RootState } from "../../store";
import moment from "moment";
import { FacultyView } from "../../components/micro/course";

const Tabs = [{ number: "1", name: "Faculties", view: <FacultyView /> }];

const DetailCourseView = () => {
    const [currentTab, setCurrentTab] = useState(Tabs[0]);

    const { decrypt, encrypt } = useCrypto()

    const dispatch = useDispatch<any>();

    const { id } = useParams()

    const decryptedId = decrypt(id!)

    const navigate = useNavigate()

    const universityID = useSelector((state: RootState) => state.university.university.value)

    const course = useSelector((state: RootState) => state.course.course)

    useEffect(() => {
        if(decryptedId && course.name)
        dispatch(
            setBreadcrumps({
                name: ["ACADEMIC", "Courses", course.name],
                link: `/course/${encrypt(decryptedId)}`,
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, decryptedId, course]);
    
    useEffect(() => {
        if(decryptedId && universityID) {
            dispatch(getCourse({ universityID, courseID: decryptedId }))
        }
    }, [decryptedId, universityID, dispatch])

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab((v) => Tabs.filter((t) => t.number === newValue)[0]);
    };

    return (
        <div className="section__Wrapper">
            <main className="detailCourseView__Wrapper">
                <div className="paper">
                    <div className="detailCourseView__Container">
                        <h4>{course.name}</h4>
                        <p>
                            {course.description}
                        </p>
                        <div className="detailCourseView__ActionBar">
                            <div className="left">
                                <div className="detailCourseView__Minitab">
                                    <p>Posted On</p>
                                    <h6>{moment(course.createdAt).format("DD MMM, YYYY")}</h6>
                                </div>
                                <div className="detailCourseView__Minitab">
                                    <p>Posted By</p>
                                    <h6>Rutuj Jeevan Bokade</h6>
                                </div>
                            </div>
                            <div className="right">
                                <div className="detailCourseView__Buttons">
                                    <Button startIcon={<EditRounded />} onClick={()=>navigate(`/course/update/${encrypt(decryptedId!)}`)}>
                                        Edit
                                    </Button>
                                    <Button
                                        startIcon={<DeleteRounded />}
                                        className="red"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="detailCourseView__Tabs">
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

export default DetailCourseView;
