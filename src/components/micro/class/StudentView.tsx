import { StudentCard } from "../../card/class";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getUserName } from "../../../utils/helpers";

const StudentView = () => {

    const students = useSelector((state: RootState) => state.class.class.studentID!)

    return (
        <div>
            {students?.map(s=><StudentCard key={s._id} name={getUserName(s)} />)}
        </div>
    );
};

export default StudentView;
