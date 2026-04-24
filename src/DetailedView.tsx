
function DetailedView({table}){

  if(!table) return <p>Nincs kiválasztva</p>

  return(
    <div>
      <h2>Részletek</h2>
      <p>Típus: {table.type}</p>
      <p>Pozíció: {table.x} {table.y}</p>
      <p>Állapot: {table.condition}</p>
    </div>
  );
}

export default DetailedView