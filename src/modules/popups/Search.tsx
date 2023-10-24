import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "../../store/layout/slice";
import { IconButton } from "@mui/material";
import { CloseRounded, RestoreRounded, SearchRounded } from "@mui/icons-material";
import { useOutsideClickHandler } from "../../utils/hooks";

const Search = () => {

    const [token, setToken] = useState("")

    const dispatch = useDispatch();

    const searchRef = useRef<HTMLDivElement>(null);

    useOutsideClickHandler(searchRef, () => dispatch(setSearch(false)))

    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        setToken(e.target.value)
    }

    return (
        <div ref={searchRef} className="search__Wrapper standard__Popup">
            <div className="top">
                <div className="title">
                    <SearchRounded />
                    <input type="text" placeholder="Search..." autoFocus onChange={handleSearch} value={token} />
                </div>
                <div className="close">
                    <IconButton onClick={()=> dispatch(setSearch(false))}>
                        <CloseRounded />
                    </IconButton>
                </div>
            </div>
            <hr />
            <div className="body">
                <h6>Results</h6>
                <div className="search__Result">
                    <div className="left">
                        <RestoreRounded />
                        <div className="content">
                            <h5>Result title</h5>
                            <p>Result description</p>
                        </div>
                    </div>
                    <div className="right">
                        <div className="module">
                            Academic
                        </div>
                    </div>
                </div>
                <div className="search__Result">
                    <div className="left">
                        <RestoreRounded />
                        <div className="content">
                            <h5>Result title</h5>
                            <p>Result description</p>
                        </div>
                    </div>
                    <div className="right">
                        <div className="module">
                            Academic
                        </div>
                    </div>
                </div>
                <div className="search__Result">
                    <div className="left">
                        <RestoreRounded />
                        <div className="content">
                            <h5>Result title</h5>
                            <p>Result description</p>
                        </div>
                    </div>
                    <div className="right">
                        <div className="module">
                            Academic
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
