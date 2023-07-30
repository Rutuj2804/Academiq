import React, { Dispatch, SetStateAction, useState } from "react";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

interface Options {
    name: string;
    value: string | number;
}

interface DropdownCProps {
    width?: number;
    optionsArr: Options[];
    selected: Options;
    setSelected: Function;
    className?: string;
}

const Dropdown = ({
    width,
    optionsArr,
    selected,
    setSelected,
    className
}: DropdownCProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`dropdown__Wrapper ${className}`}
            onClick={() => setIsOpen((i) => !i)}
            style={{ width: width }}
        >
            {optionsArr.length === 0 ? (
                <div className="dropdown__Display">
                    <div className="dropdown__SelectedOption">--SELECT--</div>
                    <div className="dropdown__Right">
                        {isOpen ? (
                            <BsFillCaretUpFill />
                        ) : (
                            <BsFillCaretDownFill />
                        )}
                    </div>
                </div>
            ) : (
                <div className="dropdown__Display">
                    <div className="dropdown__SelectedOption">
                        {selected?.value === "" ? "--SELECT--" : selected?.name}
                    </div>
                    <div className="dropdown__Right">
                        {isOpen ? (
                            <BsFillCaretUpFill />
                        ) : (
                            <BsFillCaretDownFill />
                        )}
                    </div>
                </div>
            )}

            <div className={`dropdown__OptionSpace ${isOpen && "active"}`}>
                {optionsArr.map((o, i) => (
                    <div
                        key={i}
                        onClick={() => setSelected(o)}
                        className={`dropdown__Option ${
                            selected?.value === o?.value ? "selected" : null
                        }`}
                    >
                        {o.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;
