import React, { useRef, useState, useEffect } from "react";
import { BsCheckCircleFill, BsExclamationCircleFill } from "react-icons/bs";
import { data } from "../../assets/data/validation";

interface CustomInputCP extends React.InputHTMLAttributes<HTMLInputElement> {
    regex?: string;
}

const Input = ({
    value,
    onChange,
    required,
    placeholder,
    name,
    type,
}: CustomInputCP) => {
    const ref = useRef<HTMLInputElement>(null);

    const [valid, setValid] = useState<boolean | undefined>(undefined);
    const [isFocused, setIsFocused] = useState(false);

    // useEffect(() => setValid(ref.current?.checkValidity()), [value]);

    useEffect(() => {
        if (value !== "" || type === "date" || type === "datetime-local")
            setIsFocused(true);

        if (value === "") setValid(undefined);
        else if (type === "email") {
            const res = String(value)
                .toLowerCase()
                .match(data.email);
            if(res) setValid(true)
        } else if (type === "date" && required) {
            if(ref.current?.checkValidity()) setValid(true)
        } else if ((type === "text" || type === undefined) && required) {
            const res = value !== ""
            if(res) setValid(true)
        } 
    }, [value]);

    useEffect(() => {
        ref.current?.addEventListener("focus", () => setIsFocused(true));
        return () =>
            ref.current?.addEventListener("focus", () => setIsFocused(true));
    }, []);

    useEffect(() => {
        ref.current?.addEventListener("focusout", () => {
            if (type === "date" || type === "datetime-local" || value !== "") {
                setIsFocused(true);
            } else setIsFocused(false);
        });
        return () =>
            ref.current?.addEventListener("focusout", () => {
                if (type === "date" || type === "datetime-local" || value !== "") {
                    setIsFocused(true);
                } else setIsFocused(false);
            });
    }, [value]);

    return (
        <div
            className={`input__Wrapper ${valid && "valid"} ${
                isFocused && "focus"
            }`}
        >
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
                {!valid ? <BsExclamationCircleFill /> : <BsCheckCircleFill />}
            </span>
        </div>
    );
};

export default Input;
