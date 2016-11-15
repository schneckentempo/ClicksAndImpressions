export default function parseRow(row, { metrics }) {
  const parseIndexes = metrics.map(metricObject => metricObject.index)

  const parsedRow = row.map((item, i) => {
    if (parseIndexes.includes(i)) {
      return parseInt(item, 10)
    }
    return item
  })

  return parsedRow
}
