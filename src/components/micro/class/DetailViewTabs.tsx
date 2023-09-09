import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

interface TabInterface {
    number: string;
    view: React.ReactNode;
    name: string;
}

interface DetailViewTabsCP {
    currentTab: TabInterface;
    tabs: TabInterface[];
    handleChange: (event: React.SyntheticEvent, newValue: string) => void;
}

const DetailViewTabs = ({
    currentTab,
    tabs,
    handleChange,
}: DetailViewTabsCP) => {
    return (
        <div>
            <TabContext value={currentTab.number}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                    >
                        {tabs.map((n) => (
                            <Tab
                                key={n.number}
                                label={n.name}
                                value={n.number}
                            />
                        ))}
                    </TabList>
                </Box>
                {tabs.map((n) => (
                    <TabPanel value={n.number}>{n.view}</TabPanel>
                ))}
            </TabContext>
        </div>
    );
};

export default DetailViewTabs;
