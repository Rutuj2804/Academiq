import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDelete } from "../../store/layout/slice";
import { IconButton, Button } from "@mui/material";
import { CloseRounded, DeleteRounded } from "@mui/icons-material";
import { useOutsideClickHandler } from "../../utils/hooks";
import { RootState } from "../../store";

const Delete = () => {
    const dispatch = useDispatch();

    const deleteRef = useRef<HTMLDivElement>(null);

    const deleteModal = useSelector((state: RootState) => state.layout.delete);

    useOutsideClickHandler(deleteRef, () =>
        dispatch(
            setDelete({
                isOpen: false,
                callback: () => {},
                text: "",
            })
        )
    );

    const performAction = () => {
        deleteModal.callback();
        dispatch(
            setDelete({
                isOpen: false,
                callback: () => {},
                text: "",
            })
        );
    };

    return (
        <div ref={deleteRef} className="delete__Wrapper standard__Popup">
            <div className="top">
                <div className="title">
                    <h4>Delete</h4>
                </div>
                <div className="close">
                    <IconButton
                        onClick={() =>
                            dispatch(
                                setDelete({
                                    isOpen: false,
                                    callback: () => {},
                                    text: "",
                                })
                            )
                        }
                    >
                        <CloseRounded />
                    </IconButton>
                </div>
            </div>
            <div className="body">
                <p>{deleteModal.text}</p>
            </div>
            <div className="actions">
                <Button onClick={performAction} startIcon={<DeleteRounded />}>Delete</Button>
            </div>
        </div>
    );
};

export default Delete;
