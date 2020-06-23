import { createElement, ReactElement } from "react";
import { DatagridPreviewProps } from "../typings/DatagridProps";

import "./ui/Datagrid.scss";
import { Table } from "./components/Table";
import { parseStyle } from "@widgets-resources/piw-utils";

export function preview(props: DatagridPreviewProps): ReactElement {
    const data = Array.from({ length: props.pageSize ?? 5 }).map(() => ({
        id: "" as any
    }));

    return (
        <Table
            className={props.class}
            columns={props.columns}
            columnsDraggable={props.columnsDraggable}
            columnsFilterable={props.columnsFilterable}
            columnsHidable={props.columnsHidable}
            columnsResizable={props.columnsResizable}
            columnsSortable={props.columnsSortable}
            data={data}
            footerWidgets={
                <props.footerWidgets.renderer>
                    <div className="header" />
                </props.footerWidgets.renderer>
            }
            hasMoreItems={false}
            headerWidgets={
                <props.headerWidgets.renderer>
                    <div className="footer" />
                </props.headerWidgets.renderer>
            }
            page={0}
            pageSize={props.pageSize ?? 5}
            paging={props.pagingEnabled}
            pagingPosition={props.pagingPosition}
            styles={parseStyle(props.style)}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/Datagrid.scss");
}
