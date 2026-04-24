import { useState } from 'react';
import Tables from './Tables';
import DetailedView from './DetailedView';
import NewTable from './NewTable';

type Table ={
  id: number;
  type: "billiard" | "csocso" | "airhockey";
  x: number;
  y: number;
  condition: number;
}

function RoomManager(){

  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  return (
    <div>
      <Tables tables={tables} onSelect={setSelectedTable} />
      <DetailedView table={selectedTable} />
      <NewTable onAdd={(t) => setTables([...tables, t])} />
    </div>
  );
}
export default RoomManager;