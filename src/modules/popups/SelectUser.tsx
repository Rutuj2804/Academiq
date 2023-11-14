import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useOutsideClickHandler } from "../../utils/hooks";
import { setSelectUsers } from "../../store/layout/slice";
import { IconButton } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import { CheckboxAndLabel } from "../../common/forms/checkbox";

const SelectUser = () => {

    const [selectClass, setSelectClass] = useState(false)

    const dispatch = useDispatch();

    const selectUserRef = useRef<HTMLDivElement>(null);

    useOutsideClickHandler(selectUserRef, () =>
        dispatch(setSelectUsers({ isOpen: false }))
    );

    return (
        <div ref={selectUserRef} className="standard__Popup">
            <div className="selectUserModal__Wrapper">
                <div className="selectUserModal__Header">
                    <h4>Select Users</h4>
                    <IconButton onClick={()=>dispatch(setSelectUsers({ isOpen: false }))}>
                        <CloseRounded />
                    </IconButton>
                </div>
                <div className="selectUserModal__Body">
                    <form >
                        <CheckboxAndLabel
                            checked={selectClass}
                            id="select-classes"
                            label="Select classes"
                            onChange={(_: any, c: boolean)=>setSelectClass(c)}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SelectUser;
