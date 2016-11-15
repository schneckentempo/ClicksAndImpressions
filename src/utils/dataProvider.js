export default function getDatamodel(domain) {
  if (domain.includes('mockbin.org')) {
    const model = {
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

    return model
  }

  return {}
}
