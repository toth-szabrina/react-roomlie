import { useState } from "react";
import type {Table} from "./RoomManager";

const TYPE_LABELS = {
  snooker: "Biliárd / Snooker",
  foosball: "Csocsó",
  airhockey: "Léghoki",
} as const;

const CATEGORY_LABELS = {
  race: "Verseny",
  normal: "Normál",
  kids: "Gyerek",
} as const;

type Props={
  table: Table | null;
  onDelete: (id:number) => void;
  onUpdate: (table:Table) => void;
};

function DetailedView({table, onDelete, onUpdate}: Props){
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(0);
  const [isLocked, setLocked] = useState(false);
  const [name, setNewName] = useState("");

    if (!table) return <p>Nincs kiválasztva</p>;

    const selectedTable = table;

    function startEdit(){
      setEditMode(true);
      setStatus(selectedTable.status);
      setLocked(selectedTable.isLocked);
      setNewName(selectedTable.name);
    }

    function saveEdit(){
      onUpdate({
        ...selectedTable,
        status,
        isLocked,
        name,
      });
      setEditMode(false);
    }

     return (
    <div>
      <h2>Részletek</h2>

      {!editMode ? (
        <>
          <p>Név: {selectedTable.name}</p>
          <p>Típus: {TYPE_LABELS[selectedTable.type]}</p>
          <p>Pozíció: {selectedTable.x}, {selectedTable.y}</p>
          <p>Állapot: {selectedTable.status}</p>
          <p>Kategória: {CATEGORY_LABELS[selectedTable.category]}</p>
          <p>Zárolt: {selectedTable.isLocked ? "Igen" : "Nem"}</p>

          <button onClick={startEdit}>Szerkesztés</button>
          <button onClick={() => onDelete(selectedTable.id)}>Törlés</button>
        </>
      ) : (
        <>
          <div>

          <label>
            Asztal neve:
          <input
          type="string" 
          value={name} 
          onChange={(e) => setNewName(e.target.value)}></input>
          </label>

            <label>Állapot:</label>
            <input
              type="number"
              min={1}
              max={10}
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