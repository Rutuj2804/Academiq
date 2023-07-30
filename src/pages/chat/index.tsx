import React, { useEffect } from "react";
import { Contacts, ChatArea } from "../../components/micro/chat";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { FcBarChart, FcPieChart } from "react-icons/fc";

const Chat = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["SOCIALS", "Chat"],
                link: "/chat",
            })
        );
    }, [dispatch]);

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

            <main>
                <div className="chat__Wrapper">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-12">
                            <Contacts />
                        </div>
                        <div className="col-lg-9 col-md-8 col-12">
                            <ChatArea />
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default Chat;
