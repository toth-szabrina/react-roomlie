import { TABLE_TYPES } from "./typeHelper/tableTypes";
import type { Table } from "./RoomManager";
import { TABLE_CATEGORIES } from "./typeHelper/tableCategories";

type TableViewProps = {
  table: Table;
  onClick: () => void;
  onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
};

function TableView({ table, onClick, onMouseDown }: TableViewProps) {
  const data = TABLE_TYPES[table.type];
  const category = TABLE_CATEGORIES[table.category];

  const borderWidth = table.isInvalid ? 3 : category.border;
  const borderColor = table.isInvalid ? "red" : "black";

  const background =
    category.pattern === "dots"
      ? `radial-gradient(circle, black 1px, transparent 1px), ${table.color}`
      : table.color;

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
        border: `${borderWidth}px solid ${borderColor}`,
        background,
        backgroundSize: category.pattern === "dots" ? "10px 10px" : undefined,
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