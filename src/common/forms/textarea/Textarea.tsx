import React from "react";

interface CustomInputCP
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = ({
    value,
    onChange,
    placeholder,
    name,
    rows,
}: CustomInputCP) => {

    return (
        <div className={`input__Wrapper valid`}>
            <textarea
                value={value}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete="off"
                rows={rows}
            />
            <span></span>
        </div>
    );
};

export default Textarea;
