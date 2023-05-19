import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { sidebarLayout } from "../../store/settings/types";
import Logo from "../logo";
import { sideBarData } from "../../assets/data/sidebar";
import { useNavigate } from "react-router-dom";

interface LinkCProps {
    name: string;
    icon: React.ReactNode;
    link: string;
    notifications: number;
}

interface SectionNavigationCProps {
    links: LinkCProps[];
    title: string;
}

const SectionNavigation = ({ links, title }: SectionNavigationCProps) => {

    const navigate = useNavigate()

    return (
        <div className="sectionNavigation__Wrapper">
            <div className="navigation__top">
                <div className="left">{title}</div>
                <div className="right"></div>
            </div>
            <div className="navigation__body">
                {links.map((r, i) => (
                    <div key={i} className="link" onClick={()=>navigate(r.link)}>
                        <div className="left">
                            <div className="icon">{r.icon}</div>
                            <p>{r.name}</p>
                        </div>
                        {r.notifications ? (
                            <div className="right">{r.notifications}</div>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );
};

const Sidebar = () => {
    const sidebar = useSelector((state: RootState) => state.layout.sidebar);
    const sidebarStyle = useSelector(
        (state: RootState) => state.settings.sidebar
    );

    return (
        <div
            className={`sidebar__Wrapper ${
                sidebarStyle === sidebarLayout[0] ? "left" : "right"
            } ${sidebar ? "" : "close"}`}
        >
            <div className="top">
                <div className="logo">
                    <Logo mode="LIGHT" />
                </div>
            </div>

            <div className="body">
                {sideBarData.map((l, i) => (
                    <SectionNavigation
                        key={i}
                        title={l.title}
                        links={l.links}
                    />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
