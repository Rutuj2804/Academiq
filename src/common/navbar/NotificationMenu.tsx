import { Avatar } from "@mui/material";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "../../store/layout/slice";
import { RootState } from "../../store";

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

    useEffect(() => {
        const triggerFunction = (e: any) => {
            const { current: wrap } = notificationRef;
            if (wrap && !wrap.contains(e.target as Node)) {
                dispatch(setNotifications(false));
            }
        };

        document.addEventListener("mousedown", triggerFunction);

        return () => {
            document.removeEventListener("mousedown", triggerFunction);
        };
    }, []);

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
