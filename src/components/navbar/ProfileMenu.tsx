import { Avatar } from "@mui/material";
import { useRef, useEffect } from "react";
import { data } from "../../assets/data/profileDropdown";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../../store/layout/slice";
import { RootState } from "../../store";

const ProfileMenu = () => {
    const profile = useSelector((state: RootState) => state.layout.profile);

    const dispatch = useDispatch();

    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const triggerFunction = (e: any) => {
            const { current: wrap } = profileRef;
            if (wrap && !wrap.contains(e.target as Node)) {
                dispatch(setProfile(false));
            }
        };

        document.addEventListener("mousedown", triggerFunction);

        return () => {
            document.removeEventListener("mousedown", triggerFunction);
        };
    }, []);

    return (
        <div
            className={`profileMenu__Wrapper ${profile && "active"}`}
            ref={profileRef}
        >
            <div className="profileMenu__Avatar">
                <Avatar sx={{ height: 50, width: 50 }} />
                <h6>Rutuj Jeevan Bokade</h6>
                <p>Pune, Maharashtra</p>
            </div>
            <div className="profileMenu__Options">
                {data.map((d, i) => (
                    <div key={i} className="profileMenu__NavLink">
                        {d.icon}
                        <h6>{d.name}</h6>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileMenu;
