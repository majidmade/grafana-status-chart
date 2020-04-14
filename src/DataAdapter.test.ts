// @ts-nocheck

import { mapGrafanaToDavi } from './DataAdapter';
import { PanelData } from '@grafana/data';
import { cloneDeep } from 'lodash';

const SAMPLE_DATA = {
  series: [
    {
      name: 'Series A',
      fields: [
        { type: 'time', values: { toArray: () => [0, 1, 2, 3, 4, 5] } },
        { type: 'number', values: { toArray: () => [0, 100, 200, 300, 400, 500] } },
      ],
    },
    {
      name: 'Series B',
      fields: [
        { type: 'time', values: { toArray: () => [0, 1, 2, 3, 4, 5] } },
        { type: 'number', values: { toArray: () => [1, 11, 111, 1111, 11111, 111111] } },
      ],
    },
    {
      name: 'Series C',
      fields: [
        { type: 'time', values: { toArray: () => [0, 1, 2, 3, 4, 5] } },
        { type: 'number', values: { toArray: () => [0, 1, 2, 3, 4, 5] } },
      ],
    },
  ],
};

describe('mapGrafanaToDavi', () => {
  it('should properly map from grafana data to davi data', () => {
    const ONE_MINUTE = 60 * 1000;
    const transformedSeriesAData = mapGrafanaToDavi(SAMPLE_DATA).find(s => s.title === SAMPLE_DATA.series[0].name).data;

    expect(transformedSeriesAData).toStrictEqual([
      { x0: 0, x: 0 + ONE_MINUTE, y: 0 },
      { x0: 1, x: 1 + ONE_MINUTE, y: 100 },
      { x0: 2, x: 2 + ONE_MINUTE, y: 200 },
      { x0: 3, x: 3 + ONE_MINUTE, y: 300 },
      { x0: 4, x: 4 + ONE_MINUTE, y: 400 },
      { x0: 5, x: 5 + ONE_MINUTE, y: 500 },
    ]);
  });

  it('should not mutate the data', () => {
    const CLONED_SAMPLE_DATA = cloneDeep(SAMPLE_DATA);
    const transformed = mapGrafanaToDavi(CLONED_SAMPLE_DATA);
    expect(CLONED_SAMPLE_DATA).toStrictEqual(SAMPLE_DATA);
  });

  it('should use the series "name" (grafana) as the series "title" (davi)', () => {
    const transformed = mapGrafanaToDavi({ series: [{ name: 'Series A', fields: [] }] });
    expect(transformed[0].title).toBe('Series A');
  });

  it('should use the series names as urls', () => {
    // im working with this against canary URLs, so this assumption works for now.
    // TODO: make this an option in the panel plugin settings
    const transformed = mapGrafanaToDavi({ series: [{ name: 'www.example.com', fields: [] }] });
    expect(transformed[0].url).toBe('www.example.com');
  });

  it('should reverse the series that it receives from grafana', () => {
    // davi status charts draw bottom-to-top ::shrug::
    const transformed = mapGrafanaToDavi(SAMPLE_DATA);
    expect(transformed[0].title).toBe(SAMPLE_DATA.series[2].name);
    expect(transformed[1].title).toBe(SAMPLE_DATA.series[1].name);
    expect(transformed[2].title).toBe(SAMPLE_DATA.series[0].name);
  });
});
