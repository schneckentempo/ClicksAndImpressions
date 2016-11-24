import { DATA_SOURCE_1, DATA_SOURCE_2 } from '../constants/DataSources'

export default function getMappingFromDatasource(datasource) {
  if (datasource.includes(DATA_SOURCE_1)) {
    const mapping = {
      metrics: [{
        index: 2,
        header: 'clicks',
      }, {
        index: 3,
        header: 'impressions',
      }],
      dimensions: [{
        index: 0,
        header: 'campaign',
      }, {
        index: 1,
        header: 'channel',
      }],
    }

    return mapping
  } else if (datasource.includes(DATA_SOURCE_2)) {
    const mapping = {
      metrics: [{
        index: 2,
        header: 'clicks',
      }, {
        index: 3,
        header: 'impressions',
      }, {
        index: 4,
        header: 'bounces',
      }],
      dimensions: [{
        index: 0,
        header: 'campaign',
      }, {
        index: 1,
        header: 'channel',
      }],
    }

    return mapping
  }

  return {}
}
