import Room from "./Room";
import type { Table } from "./RoomManager";

type TablesProps = {
  tables: Table[];
  roomWidth: number;
  roomHeight: number;
  onSelect: (table: Table) => void;
};

function Tables({ tables, roomWidth, roomHeight, onSelect }: TablesProps) {
  return (
    <section>
      <h2>Terem</h2>

      <Room
        width={roomWidth}
        height={roomHeight}
        tables={tables}
        onSelect={onSelect}
      />
    </section>
  );
}

export default Tables;