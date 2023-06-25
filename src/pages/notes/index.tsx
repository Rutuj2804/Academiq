import React, { useEffect } from "react";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";

const notesData = [
    "This example demonstrates the use of the ImageListItemBar to add an overlay to each item. The overlay can accommodate a title, subtitle and secondary action - in this example an IconButton.",
    "This example demonstrates the use of the ImageListItemBar to add an overlay to each item. The overlay can accommodate a title, subtitle and secondary action - in this example an IconButton. This example demonstrates the use of the ImageListItemBar to add an overlay to each item. The overlay can accommodate a title, subtitle and secondary action - in this example an IconButton.",
    "This example demonstrates the use of the ImageListItemBar to add an overlay to each item. The overlay can accommodate a title, subtitle and secondary action - in this example an IconButton.",
    "This example demonstrates the use of the ImageListItemBar to add an overlay to each item. The overlay can accommoecondary action - in this example an IconButton.",
    "This example demonstrates the use of the ImageListItemBar to add an overlay to each item. The oven.",
    "This eImageListItemBar to add an overlay to each item. The overlay can accommodate a title, subtitle and secondary action - in this example an IconButton.",
    "This example demonstrates the use of the em. The overlay can accommodate a title, subtitle and secondary action - in this example an IconButton.",
    "This example demonstrates the use of the ImageListItemBar to add an overlay to each item. The overlay can accommodate a title, subtitle and secondary action - in this example an IconButton.",
];

const Notes = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ASSETS", "Notes"],
                link: "/notes",
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

            <main className="notes__Wrapper">
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-12">
                        {notesData}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Notes;
