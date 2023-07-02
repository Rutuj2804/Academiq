import { Tooltip } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { BsCheckCircleFill, BsExclamationCircleFill } from "react-icons/bs";

const Input = ({
    value,
    onChange,
    required,
    placeholder,
    name,
    type,
}: React.InputHTMLAttributes<HTMLInputElement>) => {
    const ref = useRef<HTMLInputElement>(null);

    const [valid, setValid] = useState<boolean | undefined>(
        ref.current?.checkValidity()
    );

    useEffect(() => setValid(ref.current?.checkValidity()), [value]);

    return (
        <div className={`input__Wrapper ${valid && "valid"}`}>
            <input
                type={type}
                value={value}
                name={name}
                onChange={onChange}
                ref={ref}
                required={required}
                autoComplete="off"
            />
            <label>{placeholder}</label>
            <span className={valid ? "valid" : "invalid"}>
                {!valid ? (
                    <Tooltip title="Invalid Input">
                        <BsExclamationCircleFill />
                    </Tooltip>
                ) : (
                    <Tooltip title="Valid Input">
                        <BsCheckCircleFill />
                    </Tooltip>
                )}
            </span>
        </div>
    );
};

export default Input;
