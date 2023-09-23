import {
    gridPageCountSelector,
    GridPagination,
    useGridApiContext,
    useGridSelector,
} from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";

import { TablePaginationProps } from "@mui/material/TablePagination";

const Pagination = ({
    page,
    onPageChange,
    className,
    pageCount
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className" | any>) => {

    return (
        <MuiPagination
            color="primary"
            className={className}
            count={pageCount}
            page={page + 1}
            onChange={(event, newPage) => {
                onPageChange(event as any, newPage - 1);
            }}
            
        />
    );
};

const CustomPagination = (props: any) => {

    const from = props.page * 10 + 1;
    const to = props.page * 10 + props.currentdocuments

    return (
        <GridPagination
            ActionsComponent={(paginationProps) => (
                <Pagination {...paginationProps} pageCount={props.pagecount} page={props.page} onPageChange={props.handlepagechange} />
            )}
            {...props}
            labelDisplayedRows={()=>`${from}–${to} of ${props.totaldocuments}`}
        />
    );
};

export default CustomPagination;
