
function Tables({tables, onSelect}){

  return(
 <div>
      {tables.map((t) => (
        <div key={t.id} onClick={() => onSelect(t)}>
          {t.type} ({t.x}, {t.y})
        </div>
      ))}
    </div>
  );
}

export default Tables