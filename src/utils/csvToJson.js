import { zipObject, sortBy, tail, concat } from 'lodash'
import parseRow from './parseRow'
import getColumn from './getColumn'


export default function csvToJson(csv, model) {
  const content = csv.trim().split('\n')

  const header = content[0].split(',')
  const adwordData = sortBy(tail(content).map(row =>
    zipObject(header, parseRow(row.split(',')))
  ), ['campaign', 'channel'])

  const uniques = concat(
    ...new Set(adwordData.map(item => item[getColumn(item, 'campaign', model)])),
    ...new Set(adwordData.map(item => item[getColumn(item, 'channel', model)]))
  )

  const options = uniques.map(value => ({ value, label: value }))

  return { options, adwordData }
}
