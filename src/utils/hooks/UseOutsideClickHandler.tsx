import React, { useEffect, useCallback } from "react";

const useOutsideClickHandler = (ref: React.RefObject<any>, callback: () => void) => {
    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            callback();
        }
    }, [ref, callback])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);

    return ref;
}

export default useOutsideClickHandler;
