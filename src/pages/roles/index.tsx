import React, { useEffect } from "react";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";

const RolesDefinition = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const breadcrumps = useSelector(
        (state: RootState) => state.breadcrumps
    );

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["RESPONSIBILITIES", "Roles Definition"],
                link: "/roles",
            })
        );
    }, [dispatch]);

    return (
        <div className="section__Wrapper">
            <header>
                <div className="left">
                    <h4>{breadcrumps.name[1]}</h4>
                    <div className="breadcrumps" onClick={()=>navigate(breadcrumps.link)}>{breadcrumps.name.join(" > ")}</div>
                </div>
                <div className="right">
                    <FcPieChart />
                    <FcBarChart />
                </div>
            </header>
        </div>
    );
};

export default RolesDefinition;
