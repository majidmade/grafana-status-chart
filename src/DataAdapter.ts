import { PanelData, FieldType } from '@grafana/data';
import { IStatusChartSeries } from 'davi-js';
import { zipWith } from 'lodash';

// TODO: one-minute is a magic number; either document or find the right abstraction
const ONE_MINUTE: number = 1000 * 60;

export const mapGrafanaToDavi = (data: PanelData): IStatusChartSeries[] =>
  // TODO: series reversal is a responsibility of the view, not the adapter; abstract out to the component?
  [...data.series].reverse().map(({ name, fields }) => {
    const timestamps = fields.find(f => f.type === FieldType.time)?.values?.toArray() ?? [];
    const statuses = fields.find(f => f.type === FieldType.number)?.values?.toArray() ?? [];
    return {
      title: name,
      url: name,
      data: zipWith(timestamps, statuses, (x: number, y: number) => ({ x0: x, x: x + ONE_MINUTE, y })),
    };
  });
