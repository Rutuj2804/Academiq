import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { RootState } from "../../store";
import { BsFilter, BsSearch } from "react-icons/bs";
import { Button, IconButton } from "@mui/material";
import Dropdown from "../../components/commons/dropdown";
import BookCard from "./BookCard";

const optionsArr = [
    "ASC To DESC",
    "DESC To ASC",
    "Relevance",
    "Most Recent",
    "Most Liked",
];

const Library = () => {
    const [searchText, setSearchText] = useState("");

    const [selected, setSelected] = useState<string | null>(optionsArr[0]);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["SOCIALS", "Library"],
                link: "/library",
            })
        );
    }, [dispatch]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className="section__Wrapper">
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

            <main className="library__Wrapper">
                <div className="library__Filter">
                    <form onSubmit={handleSubmit}>
                        <div className="library__Search">
                            <BsSearch />
                            <input
                                type="text"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                autoFocus
                                autoComplete="off"
                                placeholder="Search..."
                                required
                            />
                        </div>
                        <Button type="submit">
                            <BsSearch />
                        </Button>
                    </form>
                    <div className="library__RightFilters">
                        <div className="library__Dropdown">
                            <Dropdown
                                width={200}
                                optionsArr={optionsArr}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        </div>
                        <IconButton>
                            <BsFilter />
                        </IconButton>
                    </div>
                </div>

                <div className="library__BooksAvailable">
                    <BookCard />
                    <BookCard />
                    <BookCard />
                    <BookCard />
                    <BookCard />
                    <BookCard />
                    <BookCard />
                </div>
            </main>
        </div>
    );
};

export default Library;
