import { Checkbox } from "@mui/material";

interface CheckboxAndLabelCP {
    id: string;
    label: string;
    description?: string;
    className?: string;
    name?:string,
    checked: boolean,
    onChange: any
}

const CheckboxAndLabel = ({ id, label, description, className, checked, name, onChange }: CheckboxAndLabelCP) => {
    return (
        <div className={`checkboxAndLabel__Wrapper ${className}`}>
            <div className="top">
                <Checkbox id={id} name={name} checked={checked} onChange={onChange} />
                <label htmlFor={id}>{label}</label>
            </div>
            <span>{description}</span>
        </div>
    );
};

export default CheckboxAndLabel;
