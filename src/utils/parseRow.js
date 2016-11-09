export default function parseRow(row) {
  const parsedRow = [...row]

  parsedRow[2] = parseInt(parsedRow[2], 10)
  parsedRow[3] = parseInt(parsedRow[3], 10)

  return parsedRow
}
