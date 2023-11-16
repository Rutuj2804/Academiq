import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { Textarea } from "../../common/forms/textarea";
import { Button } from "@mui/material";
import { createEventPost } from "../../store/event/actions";
import { RootState } from "../../store";

const AddEventPost = () => {
    const [caption, setCaption] = useState("");

    const dispatch = useDispatch<any>();

    const universityID = useSelector((state: RootState) => state.university.university.value)

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["SOCIALS", "Events", "Create"],
                link: "/event/create",
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(createEventPost({ universityID, description: caption }))
    }

    return (
        <div className="section__Wrapper">
            <div className="paper">
                <div className="addEvent__Wrapper">
                    <div className="header">
                        <h4>Post new Event</h4>
                    </div>
                    <div className="addEvent__Body">
                        <form onSubmit={onSubmit}>
                            <div className="row">
                                <div className="col-12">
                                    <Textarea
                                        placeholder="Caption"
                                        value={caption}
                                        onChange={(e) =>
                                            setCaption(e.target.value)
                                        }
                                        rows={6}
                                    />
                                </div>
                            </div>
                            <div className="addEvent__Buttons">
                                <Button type="submit">Create Post</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEventPost;
