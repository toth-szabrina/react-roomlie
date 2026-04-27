import { useState } from "react";
import type {Table} from "./RoomManager";

type Props={
  table: Table | null;
  onDelete: (id:number) => void;
  onUpdate: (table:Table) => void;
};

function DetailedView({table, onDelete, onUpdate}: Props){
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(0);
  const [isLocked, setLocked] = useState(false);

    if (!table) return <p>Nincs kiválasztva</p>;

    const selectedTable = table;

    function startEdit(){
      setEditMode(true);
      setStatus(selectedTable.status);
      setLocked(selectedTable.isLocked);
    }

    function saveEdit(){
      onUpdate({
        ...selectedTable,
        status,
        isLocked,
      });
      setEditMode(false);
    }

     return (
    <div>
      <h2>Részletek</h2>

      {!editMode ? (
        <>
          <p>Típus: {selectedTable.type}</p>
          <p>Pozíció: {selectedTable.x}, {selectedTable.y}</p>
          <p>Állapot: {selectedTable.status}</p>
          <p>Kategória: {selectedTable.category}</p>
          <p>Zárolt: {selectedTable.isLocked ? "Igen" : "Nem"}</p>

          <button onClick={startEdit}>Szerkesztés</button>
          <button onClick={() => onDelete(selectedTable.id)}>Törlés</button>
        </>
      ) : (
        <>
          <div>
            <label>Állapot:</label>
            <input
              type="number"
              value={status}
              onChange={(e) => setStatus(Number(e.target.value))}
            />
          </div>

          <div>
            <label>Zárolt:</label>
            <input
            type="checkbox"
              checked={isLocked}
              onChange={(e) => setLocked(e.target.checked)}
            />
          </div>

          <button onClick={saveEdit}>Mentés</button>
          <button onClick={() => setEditMode(false)}>Mégse</button>
        </>
      )}
    </div>
  );

}

export default DetailedView