import { BsActivity, BsFillPersonFill, BsKeyFill, BsPersonFillGear } from "react-icons/bs";

export const data = [
    { icon: <BsFillPersonFill />, name: "My Profile", path: "/:username" },
    { icon: <BsPersonFillGear />, name: "Edit Profile", path: "/edit/:username" },
    { icon: <BsActivity />, name: "My Activity", path: "/" },
    { icon: <BsKeyFill />, name: "Change Password", path: "/change-password" },
]