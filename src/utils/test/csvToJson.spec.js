import { expect } from 'chai'
import { describe, it } from 'mocha'
import csvToJson from '../csvToJson'

describe('csvToJson transforms a CSV into a JSON-dataset and returns unique dimensionValues (channels and campaigns) and the given dataset', () => {
  it('should return the unique dimensionValues and dataset', () => {
    const csv = 'campaign,channel,clicks,impressions\ncampaign_a,channel_a,185,8760\ncampaign_b,channel_b,203,5966'

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

    expect(csvToJson(csv, mapping)).to.eql(
      { dimensionValues: resultOptions, normalizedCsv: resultDataset }
    )
  })

  it('should return the unique dimensionValues and dataset in alphabetical order - first campaigns, then channels', () => {
    const csv = 'campaign,channel,clicks,impressions\ncampaign_b,channel_b,185,8760\ncampaign_a,channel_a,203,5966'

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
      clicks: 203,
      impressions: 5966,
    }, {
      campaign: 'campaign_b',
      channel: 'channel_b',
      clicks: 185,
      impressions: 8760,
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

    expect(csvToJson(csv, mapping)).to.eql({ dimensionValues: resultOptions, normalizedCsv: resultDataset })
  })

  it('should return an object with empty arrays for dimensionValues and dataset', () => {
    const csv = ''

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

    expect(csvToJson(csv, mapping)).to.eql({ dimensionValues: [], normalizedCsv: [] })
  })
})
