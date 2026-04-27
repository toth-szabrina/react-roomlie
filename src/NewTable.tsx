import { useState } from "react";
import type { Table } from "./RoomManager";

type TableType = "snooker" | "airhockey" | "foosball";

type NewTableProps = {
  onAdd: (table: Table) => void;
};

function NewTable({ onAdd }: NewTableProps) {
  const [type, setType] = useState<TableType>("snooker");

  return (
    <div>
      <select
        value={type}
        onChange={(e) => setType(e.target.value as TableType)}
      >
        <option value="snooker">Snooker</option>
        <option value="foosball">Csocsó</option>
        <option value="airhockey">Léghoki</option>
      </select>

      <button
        onClick={() =>
          onAdd({
            id: Date.now(),
            type,
            x: 60,
            y: 60,
            status: 5,
            color: "white",
            isLocked: false,
            isInvalid: false,
          })
        }
      >
        Hozzáadás
      </button>
    </div>
  );
}

export default NewTable;