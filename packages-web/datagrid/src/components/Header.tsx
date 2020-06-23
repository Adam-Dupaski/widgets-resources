import {
    createElement,
    Dispatch,
    ReactElement,
    SetStateAction,
    useState,
    DragEvent,
    DragEventHandler,
    useCallback
} from "react";
import { ColumnInstance, HeaderGroup, IdType, TableHeaderProps } from "react-table";
import classNames from "classnames";

export interface HeaderProps<D extends object> {
    column: HeaderGroup<D>;
    sortable: boolean;
    resizable: boolean;
    filterable: boolean;
    draggable: boolean;
    visibleColumns: Array<ColumnInstance<D>>;
    setColumnOrder: (updater: ((columnOrder: Array<IdType<D>>) => Array<IdType<D>>) | Array<IdType<D>>) => void;
}

export function Header<D extends object>({
    column,
    sortable,
    resizable,
    filterable,
    draggable,
    visibleColumns,
    setColumnOrder
}: HeaderProps<D>): ReactElement {
    const canSort = sortable && column.canSort;
    const canDrag = draggable && (column.canDrag ?? false);
    const [dragOver, setDragOver] = useState("");
    const draggableProps = useDraggable(canDrag, visibleColumns, setColumnOrder, setDragOver);

    const { onClick, style, ...rest } = column.getHeaderProps(
        canSort ? column.getSortByToggleProps() : undefined
    ) as TableHeaderProps & { onClick: () => void };

    const sortClass = canSort ? (column.isSorted ? (column.isSortedDesc ? "desc" : "asc") : "sortable") : "";
    return (
        <div
            className="th"
            {...rest}
            style={{
                ...style,
                ...(!resizable ? { flex: "1 1 0px" } : {}),
                ...(!sortable || !column.canSort ? { cursor: "unset" } : {})
            }}
        >
            <div
                id={column.id}
                className={classNames("column-container", canDrag && column.id === dragOver ? "dragging" : "")}
                {...draggableProps}
            >
                <div
                    id={column.id}
                    className={classNames("column-header", canSort ? "clickable" : "")}
                    onClick={canSort ? onClick : undefined}
                >
                    {column.render("Header")}
                </div>
                {filterable && column.canFilter && <div className="filter">{column.render("Filter")}</div>}
            </div>
            {sortClass && <div className={sortClass} />}
            {resizable && column.canResize && (
                <div
                    {...column.getResizerProps()}
                    className={`column-resizer ${column.isResizing ? "isResizing" : ""}`}
                />
            )}
        </div>
    );
}

function useDraggable<D extends object>(
    columnsDraggable: boolean,
    visibleColumns: Array<ColumnInstance<D>>,
    setColumnOrder: (updater: ((columnOrder: Array<IdType<D>>) => Array<IdType<D>>) | Array<IdType<D>>) => void,
    setDragOver: Dispatch<SetStateAction<string>>
): {
    draggable?: boolean;
    onDragStart?: DragEventHandler;
    onDragOver?: DragEventHandler;
    onDrop?: DragEventHandler;
    onDragEnter?: DragEventHandler;
} {
    const handleDragStart = useCallback((e: DragEvent<HTMLDivElement>): void => {
        const { id } = e.target as HTMLDivElement;
        e.dataTransfer.setData("colDestination", id);
    }, []);

    const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
    }, []);

    const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>): void => {
        const { id } = e.target as HTMLDivElement;
        const colDestination = e.dataTransfer.getData("colDestination");
        if (id !== colDestination) {
            setDragOver(id);
        }
    }, []);

    const handleOnDrop = useCallback(
        (e: DragEvent<HTMLDivElement>): void => {
            setDragOver("");
            const { id: colOrigin } = e.target as HTMLDivElement;
            const colDestination = e.dataTransfer.getData("colDestination");

            const colOriginIndex = visibleColumns.findIndex((col: ColumnInstance<D>) => col.id === colOrigin);
            const colDestinationIndex = visibleColumns.findIndex((col: ColumnInstance<D>) => col.id === colDestination);

            if (colOriginIndex !== colDestinationIndex) {
                const newOrder = [...visibleColumns.map(column => column.id)];
                newOrder[colOriginIndex] = colDestination;
                newOrder[colDestinationIndex] = colOrigin;
                setColumnOrder(newOrder);
            }
        },
        [visibleColumns]
    );

    return columnsDraggable
        ? {
              draggable: true,
              onDragStart: handleDragStart,
              onDragOver: handleDragOver,
              onDrop: handleOnDrop,
              onDragEnter: handleDragEnter
          }
        : {};
}
