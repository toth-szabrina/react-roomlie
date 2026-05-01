import { useRef, useState } from "react";
import TableView from "./TableView";
import type { Table } from "./RoomManager";

type RoomProps = {
  width: number;
  height: number;
  tables: Table[];
  onSelect: (table: Table) => void;
  onMove: (id: number, newX: number, newY: number) => void;
  selectedTable: Table | null;
};

type DragState = {
  tableId: number;
  offsetX: number;
  offsetY: number;
  newX: number;
  newY: number;
};

function Room({ width, height, tables, onSelect, onMove, selectedTable }: RoomProps) {
  const roomRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState<DragState | null>(null);

  const previewTables = tables.map((table) => {
    if (dragging && table.id === dragging.tableId) {
      return {
        ...table,
        x: dragging.newX,
        y: dragging.newY,
      };
    }

    return table;
  });

  function handleMouseDown(
    event: React.MouseEvent<HTMLDivElement>,
    table: Table
  ) {
    if (table.isLocked) return;

    const roomRect = roomRef.current?.getBoundingClientRect();
    if (!roomRect) return;

    setDragging({
      tableId: table.id,
      offsetX: event.clientX - roomRect.left - table.x,
      offsetY: event.clientY - roomRect.top - table.y,
      newX: table.x,
      newY: table.y,
    });

    onSelect(table);
  }

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!dragging) return;

    const roomRect = roomRef.current?.getBoundingClientRect();
    if (!roomRect) return;

    const newX = event.clientX - roomRect.left - dragging.offsetX;
    const newY = event.clientY - roomRect.top - dragging.offsetY;

    setDragging({
      ...dragging,
      newX: Math.round(newX),
      newY: Math.round(newY),
    });
  }

  function handleMouseUp() {
    if (!dragging) return;

    onMove(dragging.tableId, dragging.newX, dragging.newY);
    setDragging(null);
  }

  return (
    <div
      ref={roomRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        width,
        height,
        border: "2px solid black",
        position: "relative",
        backgroundColor: "#f3f3f3",
        overflow: "hidden",
      }}
    >
      {previewTables.map((table) => (
        <TableView
          key={table.id}
          table={table}
          isSelected={selectedTable?.id === table.id}
          onClick={() => onSelect(table)}
          onMouseDown={(event) => handleMouseDown(event, table)}
        />
      ))}
    </div>
  );
}

export default Room;