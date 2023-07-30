import React, { useState } from "react";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

interface Options {
    name: string;
    value: string | number;
}

interface ChangeInstituteDropdownCProps {
    width?: number;
    optionsArr: Options[];
    selected: Options;
    setSelected: Function;
    className?: string
}

const ChangeInstituteDropdown = ({
    width,
    optionsArr,
    selected,
    setSelected,
    className
}: ChangeInstituteDropdownCProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    return (
        <div
            className={`dropdown__Wrapper ${className}`}
            onClick={() => setIsOpen((i) => !i)}
            style={{ width: width }}
        >
            <div className="dropdown__Display">
                <div className="dropdown__SelectedOption">{selected?.name}</div>
                <div className="dropdown__Right">
                    {isOpen ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
                </div>
            </div>
            <div className={`dropdown__OptionSpace ${isOpen && "active"}`}>
                {optionsArr.map((o, i) => (
                    <div
                        key={i}
                        onClick={() => setSelected(o)}
                        className={`dropdown__Option ${
                            selected?.value === o.value ? "selected" : null
                        }`}
                    >
                        {o.name}
                    </div>
                ))}
                <div
                    className="dropdown__Option"
                    onClick={() => navigate("/university/create")}
                >
                    --CREATE NEW INSTITUTE--
                </div>
            </div>
        </div>
    );
};

export default ChangeInstituteDropdown;
