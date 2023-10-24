import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";

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
