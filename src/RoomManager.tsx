import { useState } from "react";
import Room from "./Room";
import DetailedView from "./DetailedView";
import NewTable from "./NewTable";
import { TABLE_TYPES } from "./typeHelper/tableTypes";

export type TableType = "snooker" | "airhockey" | "foosball";

export type Categories = "race" | "normal" | "kids";

export type Table = {
  id: number;
  type: TableType;
  x: number;
  y: number;
  color: string;
  status: number;
  isLocked: boolean;
  isInvalid: boolean;
  category: Categories;
};

type Rectangle = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

function RoomManager() {
  const [roomWidth, setRoomWidth] = useState(800);
  const [roomHeight, setRoomHeight] = useState(500);
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  function getTableArea(table: Table): Rectangle {
    const data = TABLE_TYPES[table.type];

    return {
      left: table.x,
      top: table.y,
      right: table.x + data.width,
      bottom: table.y + data.height,
    };
  }

  function getRequiredArea(table: Table): Rectangle {
    const data = TABLE_TYPES[table.type];

    return {
      left: table.x - data.margin,
      top: table.y - data.margin,
      right: table.x + data.width + data.margin,
      bottom: table.y + data.height + data.margin,
    };
  }

  function rectanglesOverlap(a: Rectangle, b: Rectangle): boolean {
    return !(
      a.right <= b.left ||
      a.left >= b.right ||
      a.bottom <= b.top ||
      a.top >= b.bottom
    );
  }

  function canPlaceTable(newTable: Table, otherTables: Table[]): boolean {
    const requiredArea = getRequiredArea(newTable);

    const fitsInRoom =
      requiredArea.left >= 0 &&
      requiredArea.top >= 0 &&
      requiredArea.right <= roomWidth &&
      requiredArea.bottom <= roomHeight;

    if (!fitsInRoom) {
      return false;
    }

    return !otherTables.some((table) =>
      rectanglesOverlap(requiredArea, getTableArea(table))
    );
  }

  function markInvalidTables(updatedTables: Table[]): Table[] {
    return updatedTables.map((table) => {
      const requiredArea = getRequiredArea(table);

      const isInvalid = updatedTables.some((otherTable) => {
        if (otherTable.id === table.id) {
          return false;
        }

        return rectanglesOverlap(requiredArea, getTableArea(otherTable));
      });

      return {
        ...table,
        isInvalid,
      };
    });
  }

  function handleAddTable(newTable: Table) {
    if (!canPlaceTable(newTable, tables)) {
      alert("Az asztal ide nem helyezhető le!");
      return;
    }

    setTables(markInvalidTables([...tables, newTable]));
  }

  function handleDeleteTable(id: number) {
    const updatedTables = tables.filter((table) => table.id !== id);
    setTables(markInvalidTables(updatedTables));

    if (selectedTable?.id === id) {
      setSelectedTable(null);
    }
  }

  function handleMoveTable(id: number, newX: number, newY: number) {
    const tableToMove = tables.find((table) => table.id === id);

    if (!tableToMove || tableToMove.isLocked) {
      return;
    }

    const movedTable: Table = {
      ...tableToMove,
      x: newX,
      y: newY,
    };

    const otherTables = tables.filter((table) => table.id !== id);

    if (!canPlaceTable(movedTable, otherTables)) {
      alert("Az asztal ide nem mozgatható!");
      return;
    }

    const updatedTables = tables.map((table) =>
      table.id === id ? movedTable : table
    );

    const checkedTables = markInvalidTables(updatedTables);
    setTables(checkedTables);

    const updatedSelected = checkedTables.find((table) => table.id === id);
    setSelectedTable(updatedSelected ?? null);
  }

  function handleRoomWidthChange(newWidth: number) {
    setRoomWidth(newWidth);
    setTables([]);
    setSelectedTable(null);
  }

  function handleRoomHeightChange(newHeight: number) {
    setRoomHeight(newHeight);
    setTables([]);
    setSelectedTable(null);
  }

  function handleUpdate(tableToUpdate: Table){
    const updatedTables = tables.map((t) => t.id === tableToUpdate.id ? tableToUpdate : t);

    setTables(markInvalidTables(updatedTables));
    setSelectedTable(tableToUpdate);

  }

  return (
    <div>
      <h1>Teremkezelő</h1>

      <section>
        <h2>Terem mérete</h2>

        <label>
          Szélesség:
          <input
            type="number"
            value={roomWidth}
            onChange={(e) => handleRoomWidthChange(Number(e.target.value))}
          />
        </label>

        <label>
          Magasság:
          <input
            type="number"
            value={roomHeight}
            onChange={(e) => handleRoomHeightChange(Number(e.target.value))}
          />
        </label>
      </section>

      <NewTable onAdd={handleAddTable} />
<Room
  width={roomWidth}
  height={roomHeight}
  tables={tables}
  onSelect={setSelectedTable}
  onMove={handleMoveTable}
/>

      <DetailedView
        table={selectedTable}
        onDelete={handleDeleteTable}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default RoomManager;