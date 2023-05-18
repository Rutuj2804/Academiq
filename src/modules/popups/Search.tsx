import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "../../store/layout/slice";
import { IconButton } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

const Search = () => {
    const dispatch = useDispatch();

    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const triggerFunction = (e: any) => {
            const { current: wrap } = searchRef;
            if (wrap && !wrap.contains(e.target as Node)) {
                dispatch(setSearch(false));
            }
        };

        document.addEventListener("mousedown", triggerFunction);

        return () => {
            document.removeEventListener("mousedown", triggerFunction);
        };
    }, [dispatch]);

    return (
        <div ref={searchRef} className="search__Wrapper standard__Popup">
            <div className="top">
                <div className="title">
                    <h4>Search</h4>
                </div>
                <div className="close">
                    <IconButton onClick={()=> dispatch(setSearch(false))}>
                        <CloseRounded />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default Search;
