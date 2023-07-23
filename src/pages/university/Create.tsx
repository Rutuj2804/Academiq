import { Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import Logo from "../../components/logo";
import Input from "../../components/commons/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import PricingCards from "./PricingCards";
import { data } from "../../assets/data/pricing";
import { data as validation } from "../../assets/data/validation";
import HolidayCard from "./HolidayCard";
import { setMessage } from "../../store/messages/slice";
import { errorType } from "../../store/messages/types";
import Dropdown from "../../components/commons/dropdown";
import Textarea from "../../components/commons/textarea";

const moveType = {
    NEXT: "NEXT",
    BACK: "BACK",
};

const CreateUniversity = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [activePlan, setActivePlan] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        phone: "",
        search: ""
    });

    const dispatch = useDispatch();

    const {
        name,
        description,
        phone,
        search
    } = formData;

    const theme = useSelector((state: RootState) => state.settings.theme);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleMovements = (type: string) => {
        if (type === moveType.NEXT) {
            if (activeStep === 0) {
                if (name && description && phone)
                    setActiveStep((v) => v + 1);
                else
                    dispatch(
                        setMessage({
                            _id: `${Math.random() * 10000}`,
                            text: "All fields are necessary",
                            type: errorType[0],
                        })
                    );
            } else if (activeStep === 1) setActiveStep((v) => v + 1);
        }
        if (type === moveType.BACK) setActiveStep((v) => v - 1);
    };

    return (
        <div className="createUniversity__Wrapper">
            <div className="createUniversity__Box">
                <div className="createUniversity__Header">
                    <div className="createUniversity__logo">
                        <Logo mode={theme} />
                        <div className="vr"></div>
                        <h3>Create New Institution</h3>
                    </div>
                    <div className="createUniversity__Stepper">
                        <Stepper activeStep={activeStep} alternativeLabel>
                            <Step>
                                <StepLabel>Basics Details</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Holidays</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Desired Pricing</StepLabel>
                            </Step>
                        </Stepper>
                    </div>

                    <div className="createUniversity__Forms">
                        <form>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    {activeStep === 0 && (
                                        <>
                                            <Input
                                                value={name}
                                                onChange={handleChange}
                                                name="name"
                                                required
                                                autoComplete="off"
                                                placeholder="Name of institution"
                                                autoFocus
                                            />
                                            <Textarea
                                                value={description}
                                                onChange={handleChange}
                                                name="description"
                                                required
                                                autoComplete="off"
                                                placeholder="Description"
                                                rows={6}
                                            />
                                            <Input
                                                value={phone}
                                                onChange={handleChange}
                                                name="phone"
                                                required
                                                autoComplete="off"
                                                placeholder="University Phone number"
                                                regex={validation.phone}
                                            />
                                        </>
                                    )}
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    {activeStep === 0 && (
                                        <>
                                        </>
                                    )}
                                </div>

                                {activeStep ===1 &&<div className="createUniversity__Holiday">
                                    <div className="createUniversity__HolidayFilter">
                                        <form>
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-12">
                                                    <Dropdown optionsArr={["India","Akhand Bharat"]} selected={null} setSelected={()=>{}} />
                                                </div>
                                                <div className="col-lg-8 col-md-8 col-12">
                                                    <Input
                                                        value={search}
                                                        onChange={handleChange}
                                                        name="search"
                                                        autoComplete="off"
                                                        placeholder="Search holidays"
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="row createUniversity__HolidayLists">
                                        <div className="col-lg-4 col-md-6 col-12">
                                            <HolidayCard />
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-12">
                                            <HolidayCard />
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-12">
                                            <HolidayCard />
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-12">
                                            <HolidayCard />
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-12">
                                            <HolidayCard />
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-12">
                                            <HolidayCard />
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-12">
                                            <HolidayCard />
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-12">
                                            <HolidayCard />
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-12">
                                            <HolidayCard />
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-12">
                                            <HolidayCard />
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-12">
                                            <HolidayCard />
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-12">
                                            <HolidayCard />
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-12">
                                            <HolidayCard />
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-12">
                                            <HolidayCard />
                                        </div>
                                    </div>
                                </div>}

                                {activeStep === 2 && (
                                    <div className="row mb-4">
                                        {data.map((d) => (
                                            <div
                                                key={d.id}
                                                className="col-lg-4 col-md-4 col-12"
                                                onClick={() => setActivePlan(d.id)}
                                            >
                                                <PricingCards
                                                    title={d.title}
                                                    description={d.description}
                                                    isSelected={activePlan === d.id}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="createUniversity__ControlButtons">
                    <div className="left">
                        {activeStep === 1 && <div className="activeHolidays">0 holidays selected</div>}
                    </div>
                    <div className="right">
                        {activeStep > 0 && (
                            <Button onClick={() => handleMovements(moveType.BACK)}>
                                Back
                            </Button>
                        )}
                        {activeStep < 2 && (
                            <Button onClick={() => handleMovements(moveType.NEXT)}>
                                Next
                            </Button>
                        )}
                        {activeStep === 2 && (
                            <Button onClick={() => setActiveStep((r) => r + 1)}>
                                Submit
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUniversity;
