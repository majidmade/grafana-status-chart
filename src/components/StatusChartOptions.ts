import { ISeriesThreshold, IChartThresholdType } from 'davi-js';

export interface StatusChartOptions {
  animation: boolean;
  thresholds: ISeriesThreshold[];
}

export const defaultOptions: StatusChartOptions = {
  animation: false,
  thresholds: [
    // TODO: offer more options here
    {
      label: 'Failure',
      type: IChartThresholdType.LessThanOrEqualTo,
      value: 0,
      style: { color: '#f2495c' },
    },
    {
      label: 'Success',
      type: IChartThresholdType.GreaterThanOrEqualTo,
      value: 1,
      style: { color: '#73bf69' },
    },
  ],
};
