import React, { ChangeEventHandler } from "react";
import { Input } from "../../../common/forms/input";
import { Textarea } from "../../../common/forms/textarea";
import { Dropdown } from "../../../common/forms/dropdown";
import { data as validation } from "../../../assets/data/validation";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { CheckboxAndLabel } from "../../../common/forms/checkbox";
import { HolidayCard, PricingCards } from "../../card/university";
import { data } from "../../../assets/data/pricing";

interface FormC {
    activeStep: number;
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleDropdowns: (t: dropdownTypes, v: any) => void;
    handleCheckboxes: (e: React.ChangeEvent<HTMLInputElement>, c: boolean) => void;
    setHolidaysSelected: React.Dispatch<React.SetStateAction<string[]>>,
    setActivePlan: React.Dispatch<React.SetStateAction<number>>,
    name: string;
    description: string;
    phone: string;
    avgStudents: { name: string; value: string | number };
    country: { name: string; value: string | number, iso2: string };
    country_holiday: { name: string; value: string | number, iso2: string };
    state: { name: string; value: string | number };
    isSundayHoliday: boolean;
    isSaturdayHoliday: boolean;
    search: string;
    holidaysSelected: string[]
    activePlan: number
}

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

const Form = ({
    activeStep,
    handleChange,
    handleDropdowns,
    handleCheckboxes,
    setHolidaysSelected,
    setActivePlan,
    name,
    description,
    phone,
    avgStudents,
    country,
    country_holiday,
    state,
    isSaturdayHoliday,
    isSundayHoliday,
    search,
    holidaysSelected,
    activePlan
}: FormC) => {
    const location = useSelector((state: RootState) => state.location);
    const holidays = useSelector((state: RootState) => state.holiday.holidays);

    return (
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
                                <Dropdown
                                    optionsArr={avgStudentsType}
                                    selected={avgStudents}
                                    setSelected={(v: number | string) =>
                                        handleDropdowns(
                                            dropdownTypes.AVG_STUDENTS,
                                            v
                                        )
                                    }
                                    placeholder="Average Students"
                                />
                            </>
                        )}
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                        {activeStep === 0 && (
                            <>
                                <Dropdown
                                    optionsArr={location.country}
                                    selected={country}
                                    setSelected={(v: number | string) =>
                                        handleDropdowns(
                                            dropdownTypes.COUNTRY,
                                            v
                                        )
                                    }
                                    className="mb-3"
                                    placeholder="Country"
                                />
                                <Dropdown
                                    optionsArr={location.state}
                                    selected={state}
                                    setSelected={(v: number | string) =>
                                        handleDropdowns(dropdownTypes.STATE, v)
                                    }
                                    className="mb-3"
                                    placeholder="State"
                                />
                                <CheckboxAndLabel
                                    id="sunday"
                                    label="Is Sunday Holiday"
                                    className="mb-3"
                                    description="Enabling this field declares weekly holiday on Sunday to all staff and students of the university."
                                    checked={isSundayHoliday}
                                    name="isSundayHoliday"
                                    onChange={handleCheckboxes}
                                />
                                <CheckboxAndLabel
                                    id="saturday"
                                    label="Is Saturday Holiday"
                                    className="mb-3"
                                    description="Enabling this field declares weekly holiday on Saturday to all staff and students of the university."
                                    checked={isSaturdayHoliday}
                                    name="isSaturdayHoliday"
                                    onChange={handleCheckboxes}
                                />
                            </>
                        )}
                    </div>

                    {activeStep === 1 && (
                        <div className="createUniversity__Holiday">
                            <div className="createUniversity__HolidayFilter">
                                <form>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 col-12">
                                            <Dropdown
                                                optionsArr={location.country}
                                                selected={country_holiday}
                                                setSelected={(
                                                    v: number | string
                                                ) =>
                                                    handleDropdowns(
                                                        dropdownTypes.COUNTRY_HOLIDAY,
                                                        v
                                                    )
                                                }
                                            />
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
                                {holidays.map((h) => (
                                    <div
                                        className="col-lg-4 col-md-6 col-12"
                                        onClick={() =>
                                            setHolidaysSelected([
                                                ...holidaysSelected,
                                                h._id,
                                            ])
                                        }
                                    >
                                        <HolidayCard
                                            key={h._id}
                                            startDate={h.date}
                                            description={h.description}
                                            name={h.name}
                                            selected={holidaysSelected.includes(
                                                h._id
                                            )}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
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
    );
};

export default Form;
