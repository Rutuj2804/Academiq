import React, { useRef, useState } from "react";
import { BsCheckCircleFill, BsExclamationCircleFill } from "react-icons/bs";

interface CustomInputCP extends React.InputHTMLAttributes<HTMLInputElement> {
    regex?: RegExp;
}

const Input = ({
    value,
    onChange,
    required,
    placeholder,
    name,
    type,
    regex,
}: CustomInputCP) => {
    const ref = useRef<HTMLInputElement>(null);

    const [valid, setValid] = useState<boolean>(true);

    const handleValidationOnChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (onChange) onChange(e);
        if (regex) {
            var t = value?.toString() === undefined ? "" : value?.toString();
            if (regex.test(t)) setValid(true);
            else setValid(false);
        } else {
            setValid(true);
        }
    };

    const onBlur = () => {
        if (value === "" && required === true) setValid(false);
        else if (regex) {
            var t = value?.toString() === undefined ? "" : value?.toString();
            if (regex.test(t)) setValid(true);
            else setValid(false);
        } else {
            setValid(true);
        }
    };

    return (
        <div className="input__Container">
            <label>{placeholder}</label>
            <div className={`input__Wrapper ${valid ? "valid" : "invalid"}`}>
                <input
                    type={type}
                    value={value}
                    name={name}
                    onChange={handleValidationOnChange}
                    ref={ref}
                    onBlur={onBlur}
                    required={required}
                    placeholder={placeholder}
                    autoComplete="off"
                />
                {required ? (
                    <span className={valid ? "valid" : "invalid"}>
                        {!valid ? (
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
    );
};

export default Input;
