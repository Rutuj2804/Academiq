import React from "react";
import { BsCheckCircleFill, BsExclamationCircleFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setSelectUsers } from "../../../store/layout/slice";

interface CProps {
    count: number;
    placeholder: string;
}

const SelectUser = ({ count, placeholder }: CProps) => {

    const dispatch = useDispatch()

    return (
        <div className="selectUser__Wrapper">
            <div className="selectUser__Container" onClick={()=>dispatch(setSelectUsers({ isOpen: true }))}>
                <label>Select {placeholder}</label>
                <div>
                    <p>
                        {count} {placeholder.toLowerCase()} selected
                    </p>
                    {true ? (
                        <span className={!count ? "valid" : "invalid"}>
                            {count ? (
                                <BsExclamationCircleFill />
                            ) : (
                                <BsCheckCircleFill />
                            )}
                        </span>
                    ) : (
                        <span></span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SelectUser;
