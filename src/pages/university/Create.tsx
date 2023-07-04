import { Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import Logo from "../../components/logo";
import Input from "../../components/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import PricingCards from "./PricingCards";
import { data } from "../../assets/data/pricing";
import HolidayCard from "./HolidayCard";
import { setMessage } from "../../store/messages/slice";
import { errorType } from "../../store/messages/types";

interface Holiday {
    startDate: string;
    isRange: boolean;
    endDate: string;
    name: string;
    onlyStudents: boolean;
}

const moveType = {
    NEXT: "NEXT",
    BACK: "BACK",
};

const CreateUniversity = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [isHolidayRange, setIsHolidayRange] = useState(false);
    const [onlyStudentsHoliday, setOnlyStudentsHoliday] = useState(false);
    const [activePlan, setActivePlan] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        dateOfEst: "",
        avgStudents: "0-50",

        startDate: "",
        endDate: "",
        holidayName: "",
    });
    const [holidayList, setHolidayList] = useState<Holiday[]>([]);

    const dispatch = useDispatch();

    const {
        name,
        description,
        dateOfEst,
        avgStudents,
        startDate,
        endDate,
        holidayName,
    } = formData;

    const theme = useSelector((state: RootState) => state.settings.theme);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addHolidayToList = () => {
        if (!startDate || !holidayName || (isHolidayRange && !endDate)) {
        } else {
            setHolidayList((v) => [
                ...v,
                {
                    startDate: startDate,
                    endDate: endDate,
                    isRange: isHolidayRange,
                    name: holidayName,
                    onlyStudents: onlyStudentsHoliday,
                },
            ]);
        }
    };

    const handleMovements = (type: string) => {
        if (type === moveType.NEXT) {
            if (activeStep === 0) {
                if (name && description && dateOfEst && avgStudents)
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
                            <StepLabel>Funtional Details</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Desired Pricing</StepLabel>
                        </Step>
                    </Stepper>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="createUniversity__Forms">
                            <form>
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
                                        <Input
                                            value={description}
                                            onChange={handleChange}
                                            name="description"
                                            required
                                            autoComplete="off"
                                            placeholder="Description"
                                        />
                                        <Input
                                            type="date"
                                            value={dateOfEst}
                                            onChange={handleChange}
                                            name="dateOfEst"
                                            required
                                            autoComplete="off"
                                            placeholder="Date of Establishment"
                                        />
                                        <Input
                                            value={avgStudents}
                                            onChange={handleChange}
                                            name="avgStudents"
                                            required
                                            autoComplete="off"
                                            placeholder="Average Students"
                                        />
                                    </>
                                )}
                                {activeStep === 1 && (
                                    <>
                                        <Input
                                            type="date"
                                            value={startDate}
                                            onChange={handleChange}
                                            required
                                            name="startDate"
                                            autoComplete="off"
                                            placeholder="Start Date"
                                        />
                                        {isHolidayRange && (
                                            <Input
                                                type="date"
                                                value={endDate}
                                                onChange={handleChange}
                                                required={isHolidayRange}
                                                name="endDate"
                                                autoComplete="off"
                                                placeholder="End Date"
                                            />
                                        )}
                                        <div className="createUniversity__CheckBoxInputDiv">
                                            <input
                                                type="checkbox"
                                                defaultChecked={isHolidayRange}
                                                onChange={(e) =>
                                                    setIsHolidayRange(
                                                        e.target.checked
                                                    )
                                                }
                                                id="checkbox"
                                            />
                                            <label htmlFor="checkbox">
                                                Is Vacation
                                            </label>
                                        </div>
                                        <Input
                                            value={holidayName}
                                            onChange={handleChange}
                                            name="holidayName"
                                            required
                                            autoComplete="off"
                                            placeholder="Holiday Name"
                                        />
                                        <div className="createUniversity__CheckBoxInputDiv">
                                            <input
                                                type="checkbox"
                                                defaultChecked={
                                                    onlyStudentsHoliday
                                                }
                                                onChange={(e) =>
                                                    setOnlyStudentsHoliday(
                                                        e.target.checked
                                                    )
                                                }
                                                id="students"
                                            />
                                            <label htmlFor="students">
                                                Only students holiday
                                            </label>
                                        </div>
                                        <Button
                                            onClick={() => addHolidayToList()}
                                        >
                                            Add holiday to list
                                        </Button>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
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
                    <div className="col-lg-6 col-md-6 col-12">
                        {activeStep === 1
                            ? holidayList.map((c, i) => (
                                  <HolidayCard key={i} {...c} />
                              ))
                            : null}
                    </div>
                </div>

                <div className="createUniversity__ControlButtons">
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
    );
};

export default CreateUniversity;
