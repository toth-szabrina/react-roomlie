import type { Table } from "./RoomManager";

const TYPE_LABELS = {
  snooker: "Biliárd / Snooker",
  foosball: "Csocsó",
  airhockey: "Léghoki",
} as const;

type Props = {
  tables: Table[];
};

function Summary({ tables }: Props) {
  const types = ["snooker", "airhockey", "foosball"] as const;

  return (
    <section>
      <h2>Összesítő</h2>

      <p>Lehelyezett asztalok száma: {tables.length}</p>

      {types.map((type) => {
        const tablesOfType = tables.filter((table) => table.type === type);

        const average =
          tablesOfType.length === 0
            ? 0
            : tablesOfType.reduce((sum, table) => sum + table.status, 0) /
              tablesOfType.length;

        return (
          <p key={type}>
            {TYPE_LABELS[type]}: {tablesOfType.length} db, átlagos állapot:{" "}
            {average.toFixed(2)}
          </p>
        );
      })}
    </section>
  );
}

export default Summary;