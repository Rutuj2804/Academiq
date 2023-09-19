import { Avatar } from "@mui/material";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "../../store/layout/slice";
import { RootState } from "../../store";
import { useOutsideClickHandler } from "../../utils/hooks";

const data = [ 
    { avatar: <Avatar />, text: "A lecture scheduled at 4:30pm on 12 Jun, 2023", time: "a while ago" },
    { avatar: <Avatar />, text: "A lecture scheduled at 4:30pm on 12 Jun, 2023", time: "a while ago" },
    { avatar: <Avatar />, text: "A lecture scheduled at 4:30pm on 12 Jun, 2023", time: "a while ago" },
    { avatar: <Avatar />, text: "A lecture scheduled at 4:30pm on 12 Jun, 2023", time: "a while ago" },
    { avatar: <Avatar />, text: "A lecture scheduled at 4:30pm on 12 Jun, 2023", time: "a while ago" },
    { avatar: <Avatar />, text: "A lecture scheduled at 4:30pm on 12 Jun, 2023", time: "a while ago" },
    { avatar: <Avatar />, text: "A lecture scheduled at 4:30pm on 12 Jun, 2023", time: "a while ago" },
    { avatar: <Avatar />, text: "A lecture scheduled at 4:30pm on 12 Jun, 2023", time: "a while ago" },
    { avatar: <Avatar />, text: "A lecture scheduled at 4:30pm on 12 Jun, 2023", time: "a while ago" },
    { avatar: <Avatar />, text: "A lecture scheduled at 4:30pm on 12 Jun, 2023", time: "a while ago" },
    { avatar: <Avatar />, text: "A lecture scheduled at 4:30pm on 12 Jun, 2023", time: "a while ago" },
    { avatar: <Avatar />, text: "A lecture scheduled at 4:30pm on 12 Jun, 2023", time: "a while ago" },
]

const NotificationMenu = () => {
    const notification = useSelector((state: RootState) => state.layout.notifications);

    const dispatch = useDispatch();

    const notificationRef = useRef<HTMLDivElement>(null);

    const closeNotifications = () => {
        dispatch(setNotifications(false));
    }

    useOutsideClickHandler(notificationRef, closeNotifications)

    return (
        <div
            className={`profileMenu__Wrapper ${notification && "active"}`}
            ref={notificationRef}
        >
            <div className="profileMenu__Options">
                {data.map((d, i) => (
                    <div key={i} className="notificationMenu__NavLink">
                        {d.avatar}
                        <div className="details">
                            <h6>{d.text}</h6>
                            <p>{d.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationMenu;
