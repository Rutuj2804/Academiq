import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { Button, IconButton, Slider } from "@mui/material";
import { CheckboxAndLabel } from "../../common/forms/checkbox";
import { BookmarkRounded, MoreVertRounded, ShareRounded } from "@mui/icons-material";
import { BsCurrencyRupee, BsFillBriefcaseFill } from "react-icons/bs";

const JobPosting = () => {
    return (
        <div className="jobPosting__Wrapper">
            <div className="top">
                <div className="left">
                    <h6>
                        ReactJS developer with experience in redux, state
                        management, typescript, etc.
                    </h6>
                    <p>Amazon India Inc.</p>
                </div>
                <div className="right">
                    <IconButton>
                        <MoreVertRounded />
                    </IconButton>
                </div>
            </div>
            <div className="body">
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-6">
                        <div className="jobPosting__DisplayUnit">
                            <BsFillBriefcaseFill />
                            <p>0-5 years</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                        <div className="jobPosting__DisplayUnit">
                            <BsCurrencyRupee />
                            <p>30 LPA</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                        <div className="jobPosting__DisplayUnit">
                            <BsFillBriefcaseFill />
                            <p>0-5 years</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                        <div className="jobPosting__DisplayUnit">
                            <BsFillBriefcaseFill />
                            <p>0-5 years</p>
                        </div>
                    </div>
                </div>
                <div className="jobPosting__Tags">
                    <p>Work from home</p>
                    <p>ReactJS</p>
                    <p>Redux</p>
                    <p>HTML</p>
                    <p>MERN</p>
                    <p>Express</p>
                    <p>NestJS</p>
                    <p>NextJS</p>
                </div>
            </div>
            <div className="bottom">
                <div className="left">
                    <IconButton>
                        <BookmarkRounded />
                    </IconButton>
                    <IconButton>
                        <ShareRounded />
                    </IconButton>
                </div>
                <div className="right">
                    <Button>Apply</Button>
                </div>
            </div>
        </div>
    );
};

const Placements = () => {
    const dispatch = useDispatch();

    const [value, setValue] = React.useState<number[]>([200000, 3000000]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["PLACEMENTS", "Apply Jobs"],
                link: "/placement",
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <div className="section__Wrapper">
            <main>
                <div className="placements__Wrapper">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-12">
                            <div className="placements__Filters">
                                <h4>Filters</h4>
                                <div className="placements__FilterGroup">
                                    <h6>Pay Range</h6>
                                    <div className="range">
                                        <Slider
                                            getAriaLabel={() =>
                                                "Temperature range"
                                            }
                                            value={value}
                                            onChange={handleChange}
                                            step={50000}
                                            min={0}
                                            max={10000000}
                                            valueLabelDisplay="auto"
                                        />
                                    </div>
                                </div>
                                <div className="placements__FilterGroup">
                                    <h6>Job Type</h6>
                                    <CheckboxAndLabel
                                        checked
                                        id="job"
                                        label="Job"
                                        onChange={(_: any, c: boolean) => {}}
                                    />
                                    <CheckboxAndLabel
                                        checked
                                        id="internship"
                                        label="Internship"
                                        onChange={(_: any, c: boolean) => {}}
                                    />
                                    <CheckboxAndLabel
                                        checked
                                        id="internship-cum-placement"
                                        label="Internship cum placement"
                                        onChange={(_: any, c: boolean) => {}}
                                    />
                                </div>
                                <div className="placements__FilterGroup">
                                    <h6>Work Type</h6>
                                    <CheckboxAndLabel
                                        checked
                                        id="full-time"
                                        label="Full time"
                                        onChange={(_: any, c: boolean) => {}}
                                    />
                                    <CheckboxAndLabel
                                        checked
                                        id="part-time"
                                        label="Part time"
                                        onChange={(_: any, c: boolean) => {}}
                                    />
                                </div>
                                <div className="placements__FilterGroup">
                                    <h6>Work Mode</h6>
                                    <CheckboxAndLabel
                                        checked
                                        id="work-from-office"
                                        label="Work from office"
                                        onChange={(_: any, c: boolean) => {}}
                                    />
                                    <CheckboxAndLabel
                                        checked
                                        id="work-from-home"
                                        label="Work from home"
                                        onChange={(_: any, c: boolean) => {}}
                                    />
                                    <CheckboxAndLabel
                                        checked
                                        id="remote"
                                        label="Remote"
                                        onChange={(_: any, c: boolean) => {}}
                                    />
                                    <CheckboxAndLabel
                                        checked
                                        id="hybrid"
                                        label="Hybrid"
                                        onChange={(_: any, c: boolean) => {}}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-8 col-12">
                            <div className="placements__Postings">
                                <JobPosting />
                                <JobPosting />
                                <JobPosting />
                                <JobPosting />
                                <JobPosting />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Placements;
