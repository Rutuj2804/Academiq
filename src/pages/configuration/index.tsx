import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { ConfigSwitch } from "../../components/micro/configuration";

const Basic = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["CONFIGURATIONS", "Basic"],
                link: "/configurations/basic",
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <div className="section__Wrapper">
            <main>
                <div className="paper">
                    <div className="basicConfigurations__Wrapper">
                        <h4>Basic Configurations</h4>
                        <div className="basicConfigurations__Body">
                            <ConfigSwitch
                                name="Placement Control"
                                description="Gives you access to a additional module for Placement support."
                                value
                            />
                            <ConfigSwitch
                                name="Advance PDFs"
                                description="Use advance PDFs as a response to a demand letter."
                            />
                            <ConfigSwitch
                                name="Roles Control"
                                description="You will be able to add new roles to the university and assign them to various users."
                                value
                            />
                            <ConfigSwitch
                                name="Demand will be fulfilled at student section"
                                description="User has to visit student section after placing a demand of a letter."
                            />
                            <ConfigSwitch
                                name="Automatic attendence"
                                description="Calculate attendence based on lecture time."
                                value
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Basic;
