import React, { Dispatch, SetStateAction, useState } from "react";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

interface DropdownCProps {
    width?: number;
    optionsArr: string[];
    selected: string | null;
    setSelected: Dispatch<SetStateAction<string | null>>;
}

const Dropdown = ({
    width,
    optionsArr,
    selected,
    setSelected,
}: DropdownCProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="dropdown__Wrapper"
            onClick={() => setIsOpen((i) => !i)}
            style={{ width: width }}
        >
            <div className="dropdown__Display">
                <div className="dropdown__SelectedOption">
                    {selected === null ? "--SELECT--" : selected}
                </div>
                <div className="dropdown__Right">
                    {isOpen ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
                </div>
            </div>
            <div className={`dropdown__OptionSpace ${isOpen && "active"}`}>
                <div
                    className="dropdown__Option"
                    onClick={() => setSelected(null)}
                >
                    --SELECT--
                </div>
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
            </div>
        </div>
    );
};

export default Dropdown;
