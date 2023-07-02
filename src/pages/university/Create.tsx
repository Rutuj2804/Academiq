import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import Logo from "../../components/logo";
import Input from "../../components/input";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const steps = [
    "Select master blaster campaign settings",
    "Create an ad group",
    "Create an ad",
];

const CreateUniversity = () => {

    const theme = useSelector((state: RootState) => state.settings.theme)

    return (
        <div className="createUniversity__Wrapper">
            <div className="createUniversity__Box">
                <div className="createUniversity__logo">
                    <Logo mode={theme} />
                </div>
                <Stepper activeStep={0} alternativeLabel>
                    <Step>
                        <StepLabel>Basics Details</StepLabel>
                        <form>
                            <Input placeholder="Name" />
                            <Input placeholder="Description" />
                            <Input placeholder="Date of Creation" />
                            <Input />
                        </form>
                    </Step>
                    <Step>
                        <StepLabel>Funtional Details</StepLabel>
                        <form>
                            <Input placeholder="no of students" />
                            <Input placeholder="no of other staff" />
                            <Input placeholder="Date of Creation" />
                            <Input />
                        </form>
                    </Step>
                    <Step>
                        <StepLabel>Desired Pricing</StepLabel>
                        <form>
                            <Input placeholder="Basic" />
                            <Input placeholder="Advance" />
                            <Input placeholder="Premium" />
                            <Input />
                        </form>
                    </Step>
                </Stepper>
            </div>
        </div>
    );
};

export default CreateUniversity;
