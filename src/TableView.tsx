import { TABLE_TYPES } from "./typeHelper/tableTypes";
import type { Table } from "./RoomManager";
import { TABLE_CATEGORIES } from "./typeHelper/tableCategories";

type TableViewProps = {
  table: Table;
  onClick: () => void;
  onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
  isSelected: boolean;
};

function TableView({ table, onClick, onMouseDown, isSelected }: TableViewProps) {
  const data = TABLE_TYPES[table.type];
  const category = TABLE_CATEGORIES[table.category];

  const borderWidth = table.isInvalid ? 3 : isSelected ? 4 : category.border;
  const borderColor = table.isInvalid ? "red" : isSelected ? "purple" : "black";

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
        opacity: 0.4 + table.status * 0.06,
      }}
    >
      {table.name}
    </div>
  );
}

export default TableView;