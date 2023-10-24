import React, { useEffect } from "react";
import { Contacts, ChatArea } from "../../components/micro/chat";
import { useDispatch } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";

const Chat = () => {
    const dispatch = useDispatch();

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
