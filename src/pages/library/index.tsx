import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { BsFilter, BsSearch } from "react-icons/bs";
import { Button, IconButton } from "@mui/material";
import { Dropdown } from "../../common/forms/dropdown";
import { BookCard } from "../../components/card/library";

const optionsArr = [
    { name: "ASC To DESC", value: "Something" },
    { name: "DESC To ASC", value: "Something" },
    { name: "Relevance", value: "Something" },
    { name: "Most Recent", value: "Something" },
    { name: "Most Liked", value: "Something" },
];

const Library = () => {
    const [searchText, setSearchText] = useState("");

    const [selected, setSelected] = useState(optionsArr[0]);

    const dispatch = useDispatch();

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
