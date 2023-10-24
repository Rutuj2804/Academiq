import { Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Logo } from "../../common/logo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setMessage } from "../../store/messages/slice";
import { errorType } from "../../store/messages/types";
import { getCountries, getStates } from "../../store/location/actions";
import { getHolidayList } from "../../store/holiday/actions";
import { UniversityForm } from "../../components/micro/university";
import { addUniversity } from "../../store/university/actions";
import { useNavigate } from "react-router-dom";

const moveType = {
    NEXT: "NEXT",
    BACK: "BACK",
};

const avgStudentsType = [
    { name: "0-200", value: 100 },
    { name: "200-1,000", value: 500 },
    { name: "1,000-5,000", value: 3000 },
    { name: "5,000-15,000", value: 10000 },
    { name: ">15,000", value: 15000 },
];

enum dropdownTypes {
    "AVG_STUDENTS" = "AVG_STUDENTS",
    "STATE" = "STATE",
    "COUNTRY" = "COUNTRY",
    "COUNTRY_HOLIDAY" = "COUNTRY_HOLIDAY",
}

const CreateUniversity = () => {
    const location = useSelector((state: RootState) => state.location);

    const [activeStep, setActiveStep] = useState(0);
    const [activePlan, setActivePlan] = useState(1);
    const [holidaysSelected, setHolidaysSelected] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        doEst: "",
        search: "",
        avgStudents: avgStudentsType[0],
        state: location.state[0],
        country: location.country[0],
        country_holiday: location.country[0],
        isSundayHoliday: true,
        isSaturdayHoliday: true,
    });

    const dispatch = useDispatch<any>();

    const navigate = useNavigate()

    const {
        name,
        description,
        doEst,
        search,
        avgStudents,
        state,
        country,
        country_holiday,
        isSaturdayHoliday,
        isSundayHoliday,
    } = formData;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDropdowns = (t: dropdownTypes, v: any) => {
        if (t === dropdownTypes.AVG_STUDENTS) {
            setFormData({ ...formData, avgStudents: v });
        } else if (t === dropdownTypes.COUNTRY) {
            setFormData({ ...formData, country: v });
        } else if (t === dropdownTypes.COUNTRY_HOLIDAY) {
            setFormData({ ...formData, country_holiday: v });
        } else if (t === dropdownTypes.STATE) {
            setFormData({ ...formData, state: v });
        }
    };

    const handleCheckboxes = (
        e: React.ChangeEvent<HTMLInputElement>,
        c: boolean
    ) => {
        setFormData({ ...formData, [e.target.name]: c });
    };

    const handleMovements = (type: string) => {
        if (type === moveType.NEXT) {
            if (activeStep === 0) {
                if (name && description && doEst) setActiveStep((v) => v + 1);
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

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

    useEffect(() => {
        if (country_holiday) dispatch(getHolidayList(country_holiday.iso2));
    }, [country_holiday, dispatch]);

    useEffect(() => {
        setFormData(v=>({ ...v, country: location.country[0] }));
    }, [location.country, setFormData]);

    useEffect(() => {
        setFormData(v=>({ ...v, state: location.state[0] }));
    }, [location.state, setFormData]);

    useEffect(() => {
        if (country) dispatch(getStates(country.value));
    }, [country, dispatch]);


    const onSubmit = () => {
        dispatch(addUniversity({
            name: name,    
            description: description,    
            doEst: doEst,    
            state: state.value,    
            country: country.value,    
            avgStudents: avgStudents.value,    
            isSundayHoliday: isSundayHoliday,    
            isSaturdayHoliday: isSaturdayHoliday,
            navigate: navigate
        }))
    }

    return (
        <div className="createUniversity__Wrapper">
            <div className="createUniversity__Box">
                <div className="createUniversity__Header">
                    <div className="createUniversity__logo">
                        <Logo />
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

                    <UniversityForm
                        activeStep={activeStep}
                        handleChange={handleChange}
                        handleDropdowns={handleDropdowns}
                        handleCheckboxes={handleCheckboxes}
                        setHolidaysSelected={setHolidaysSelected}
                        setActivePlan={setActivePlan}
                        name={name}
                        description={description}
                        doEst={doEst}
                        avgStudents={avgStudents}
                        country={country}
                        country_holiday={country_holiday}
                        state={state}
                        isSaturdayHoliday={isSaturdayHoliday}
                        isSundayHoliday={isSundayHoliday}
                        search={search}
                        holidaysSelected={holidaysSelected}
                        activePlan={activePlan}
                    />
                </div>

                <div className="createUniversity__ControlButtons">
                    <div className="left">
                        {activeStep === 1 && (
                            <div className="activeHolidays">
                                {holidaysSelected.length} holidays selected
                            </div>
                        )}
                    </div>
                    <div className="right">
                        {activeStep > 0 && (
                            <Button
                                onClick={() => handleMovements(moveType.BACK)}
                            >
                                Back
                            </Button>
                        )}
                        {activeStep < 2 && (
                            <Button
                                onClick={() => handleMovements(moveType.NEXT)}
                            >
                                Next
                            </Button>
                        )}
                        {activeStep === 2 && (
                            <Button onClick={onSubmit}>
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
