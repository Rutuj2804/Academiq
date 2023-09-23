import React, {
    useEffect,
    useRef,
    useState,
} from "react";
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
    placeholder?: string;
}

const Dropdown = ({
    width,
    optionsArr,
    selected,
    setSelected,
    className,
    placeholder,
}: DropdownCProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const triggerFunction = (e: any) => {
            const { current: wrap } = dropdownRef;
            if (wrap && !wrap.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", triggerFunction);

        return () => {
            document.removeEventListener("mousedown", triggerFunction);
        };
    }, []);

    return (
        <div className="dropdown__Container">
            {placeholder !== "" ? <label>{placeholder}</label> : null}
            <div
                className={`dropdown__Wrapper ${className}`}
                onClick={() => setIsOpen((i) => !i)}
                style={{ width: width }}
                ref={dropdownRef}
            >
                {optionsArr.length === 0 ? (
                    <div className="dropdown__Display">
                        <div className="dropdown__SelectedOption">
                            --SELECT--
                        </div>
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
                            {selected?.value === ""
                                ? "--SELECT--"
                                : selected?.name}
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
        </div>
    );
};

export default Dropdown;
