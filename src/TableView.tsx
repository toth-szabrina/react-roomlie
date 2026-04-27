import { TABLE_TYPES } from "./typeHelper/tableTypes";
import type { Table } from "./RoomManager";

type TableViewProps = {
  table: Table;
  onClick: () => void;
  onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
};

function TableView({ table, onClick, onMouseDown }: TableViewProps) {
  const data = TABLE_TYPES[table.type];

  return (
    <div
      onClick={onClick}
      onMouseDown={onMouseDown}
      style={{
        position: "absolute",
        left: table.x,
        top: table.y,
        width: data.width,
        height: data.height,
        border: table.isInvalid ? "3px solid red" : "2px solid black",
        backgroundColor: table.color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: table.isLocked ? "not-allowed" : "grab",
        userSelect: "none",
      }}
    >
      {table.type}
    </div>
  );
}

export default TableView;