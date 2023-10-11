import FacultyCard from "../../card/class/FacultyCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getUserName } from "../../../utils/helpers";

const FacultyView = () => {
    const faculties = useSelector(
        (state: RootState) => state.class.class.facultyID!
    );

    return (
        <div>
            {faculties?.map((f) => (
                <FacultyCard key={f._id} name={getUserName(f)} />
            ))}
        </div>
    );
};

export default FacultyView;
