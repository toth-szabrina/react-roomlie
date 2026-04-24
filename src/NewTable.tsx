import { useState } from "react";


function NewTable({onAdd}){
  const [type, setType] = useState("biliard");

  return(
    <div>
      <select onChange={(e) => setType(e.target.value)}>
        <option value="biliard">Billiárd</option>
        <option value="csocso">Csocsó</option>
        <option value="airhockey">Léghoki</option>
      </select>

      <button onClick={() =>
        onAdd({
          id: Date.now(),
          type,
          x:0,
          y:0,
          condition:5,
        })
      }>
        Hozzáadás
      </button>
    </div>
  );
}

export default NewTable