export default function getDatamapping(datasource) {
  if (datasource.includes('http://mockbin.org/bin/3f1037be-88f3-4e34-a8ec-d602779bf2d6')) {
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
  }

  return {}
}
