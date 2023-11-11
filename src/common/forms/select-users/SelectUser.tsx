import React, { useState } from "react";
import { BsCheckCircleFill, BsExclamationCircleFill } from "react-icons/bs";

interface CProps {
    count: number;
    placeholder: string;
}

const SelectUser = ({ count, placeholder }: CProps) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="selectUser__Wrapper">
            <div className="selectUser__Container" onClick={()=>setModalOpen(t=>!t)}>
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
            {modalOpen && (
                <div className="selectUser__Modal">
                    <div className="selectUser__Box">Input box</div>
                </div>
            )}
        </div>
    );
};

export default SelectUser;
