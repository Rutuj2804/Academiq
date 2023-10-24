import React from "react";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

    const navigate = useNavigate()

    return (
        <div className="section__Wrapper" style={{ paddingBottom: 0, paddingTop: 10 }}>
            <header>
                <div className="left">
                    <h4>{breadcrumps.name[1]}</h4>
                    <div
                        className="breadcrumps"
                        onClick={() => navigate(breadcrumps.link)}
                    >
                        {breadcrumps.name.join(" > ")}
                    </div>
                </div>
                <div className="right">
                    <FcPieChart />
                    <FcBarChart />
                </div>
            </header>
        </div>
    );
};

export default Header;
