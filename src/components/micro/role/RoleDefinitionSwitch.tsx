import React from "react";
import { Dropdown } from "../../../common/forms/dropdown";

interface Options {
    name: string;
    value: number
}

interface RoleDefinitionSwitchCP {
    name: string;

    optionsArr: Options[],
    selected : Options,
    setSelected: Function
}

const RoleDefinitionSwitch = ({ name, optionsArr, selected, setSelected }: RoleDefinitionSwitchCP) => {
    return (
        <div className="col-12">
            <div className="createRole__SwitchBox">
                <div className="createRole__Details">
                    <h5>{name}</h5>
                    <p>Gives user access to create and update new lectures</p>
                </div>
                <Dropdown
                    optionsArr={optionsArr}
                    selected={selected}
                    setSelected={setSelected}
                    placeholder="Select Access"
                    width={300}
                />
            </div>
        </div>
    );
};

export default RoleDefinitionSwitch;
