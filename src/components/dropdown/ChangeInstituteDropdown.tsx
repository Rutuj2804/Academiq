import React, { Dispatch, SetStateAction, useState } from "react";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

interface ChangeInstituteDropdownCProps {
    width?: number;
    optionsArr: string[];
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
}

const ChangeInstituteDropdown = ({
    width,
    optionsArr,
    selected,
    setSelected,
}: ChangeInstituteDropdownCProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="dropdown__Wrapper"
            onClick={() => setIsOpen((i) => !i)}
            style={{ width: width }}
        >
            <div className="dropdown__Display">
                <div className="dropdown__SelectedOption">
                    {selected}
                </div>
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
                            selected === o ? "selected" : null
                        }`}
                    >
                        {o}
                    </div>
                ))}
                <div className="dropdown__Option">
                    --CREATE NEW INSTITUTE--
                </div>
            </div>
        </div>
    );
};

export default ChangeInstituteDropdown;
