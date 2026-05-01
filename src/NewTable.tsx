import { useState } from "react";
import type { Table, TableType, Categories } from "./RoomManager";

type NewTableProps = {
  width: number;
  height:number;
  onAdd: (table: Table) => void;
};

function NewTable({width, height, onAdd }: NewTableProps) {
  const [type, setType] = useState<TableType>("snooker");
  const [category, setCategory] = useState<Categories>("normal");
  const [color, setColor] = useState("red");
  const [status, setStatus] = useState(5);
  const [x, setX] = useState(60);
  const [y, setY] = useState(60);
  const [name, setName] = useState("");

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    onAdd({
      id: Date.now(),
      type,
      category,
      x,
      y,
      color,
      status,
      isLocked: false,
      isInvalid: false,
      name,
    });

  setName("");
  setType("snooker");
  setCategory("normal");
  setColor("red");
  setStatus(5);
  setX(60);
  setY(60);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Új asztal hozzáadása</h2>

      <label>
        Asztal neve:
        <input
        type="string" 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        required></input>
      </label>


      <label>
        Asztal típusa:
        <select
          value={type}
          onChange={(e) => setType(e.target.value as TableType)}
        >
          <option value="snooker">Biliárd / Snooker</option>
          <option value="foosball">Csocsó</option>
          <option value="airhockey">Léghoki</option>
        </select>
      </label>

      <label>
        Kategória:
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Categories)}
        >
          <option value="race">Verseny</option>
          <option value="normal">Normál</option>
          <option value="kids">Gyerek</option>
        </select>
      </label>

      <label>
        Szín:
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
        >
          <option value="red">Piros</option>
          <option value="green">Zöld</option>
          <option value="blue">Kék</option>
          </select>
      </label>

      <label>
        Állapot:
        <input
          type="number"
          min={1}
          max={10}
          value={status}
          onChange={(e) => setStatus(Number(e.target.value))}
        />
      </label>

      <label>
        X koordináta:
        <input
          type="number"
          value={x}
          min={0}
          max={width}
          onChange={(e) => setX(Number(e.target.value))}
        />
      </label>

      <label>
        Y koordináta:
        <input
          type="number"
          value={y}
          min={0}
          max={height}
          onChange={(e) => setY(Number(e.target.value))}
        />
      </label>

      <button type="submit">Hozzáadás</button>
    </form>
  );
}

export default NewTable;