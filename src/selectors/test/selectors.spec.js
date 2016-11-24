import { expect } from 'chai'
import * as selectors from '../../selectors/'

describe('selectors', () => {
  it('computeNormalizedData should return the unique dimensionValues and dataset', () => {
    const csvData = 'campaign,channel,clicks,impressions\ncampaign_a,channel_a,185,8760\ncampaign_b,channel_b,203,5966'

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

    const resultDataset = [{
      campaign: 'campaign_a',
      channel: 'channel_a',
      clicks: 185,
      impressions: 8760,
    }, {
      campaign: 'campaign_b',
      channel: 'channel_b',
      clicks: 203,
      impressions: 5966,
    }]

    const resultOptions = [{
      value: 'campaign_a',
      label: 'campaign_a',
    }, {
      value: 'campaign_b',
      label: 'campaign_b',
    }, {
      value: 'channel_a',
      label: 'channel_a',
    }, {
      value: 'channel_b',
      label: 'channel_b',
    }]

    expect(selectors.computeNormalizedData({ csvData, mapping })).to.eql(
      { dimensionValues: resultOptions, normalizedCsv: resultDataset }
    )
  })

  it('computeSumMetrics should return a sum for each metric regarding a given dimensionvalue', () => {
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

    const normalizedCsv = [{
      campaign: 'campaign_a',
      channel: 'channel_a',
      clicks: 185,
      impressions: 8760,
    }, {
      campaign: 'campaign_b',
      channel: 'channel_b',
      clicks: 200,
      impressions: 5000,
    }, {
      campaign: 'campaign_c',
      channel: 'channel_b',
      clicks: 100,
      impressions: 50,
    }]

    const selectedDimensionValue = 'channel_b'

    expect(
      selectors.computeSumMetrics({ normalizedCsv, mapping, selectedDimensionValue })
    )
    .to.eql(
      [{ name: 'clicks', sum: 300 }, { name: 'impressions', sum: 5050 }]
    )
  })
})
