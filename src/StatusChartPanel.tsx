import React, { FunctionComponent, useMemo, useCallback } from 'react';
import { AppEvents, PanelProps } from '@grafana/data';
import { SyncProvider, StatusChart, IChartThresholdType, ISeriesThreshold, ISyncProvider } from 'davi-js';
import { StatusChartOptions } from './StatusChartOptions';
import { mapGrafanaToDavi } from 'DataAdapter';

// THIS IS SPIKY CODE
// HARD-COUPLED TO USE CASE
// UNTESTED
// WOE BE UPON THEY WHO USE IN PROD

const PASS_FAIL: ISeriesThreshold[] = [
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
];

interface StatusChartProps extends PanelProps<StatusChartOptions> {}

const useControlledZoom = ({ timeRange, onChangeTimeRange }: Pick<StatusChartProps, 'timeRange' | 'onChangeTimeRange'>): ISyncProvider => {
  const zoom = useMemo(() => ({ xStart: timeRange.from.valueOf(), xEnd: timeRange.to.valueOf(), zoomBuffer: [] }), [timeRange]);
  const zoomCallback = useCallback(({ xStart, xEnd }) => onChangeTimeRange({ from: xStart, to: xEnd }), [onChangeTimeRange]);
  return {
    zoom,
    zoomCallback,
    syncSelectedSeries: false /* TODO */,
  };
};

const WrappedStatusChart: FunctionComponent<StatusChartProps> = props => {
  // console.warn(props);
  const { data, timeRange, onChangeTimeRange, options } = props;
  const { animation } = options;
  const transformedData = useMemo(() => mapGrafanaToDavi(data), [data]);
  const controlledZoom = useControlledZoom({ timeRange, onChangeTimeRange });

  return (
    <SyncProvider {...controlledZoom}>
      {(sync: unknown) => (
        <StatusChart
          {...sync}
          zoomEnabled
          xAxisSnappedTicks
          showTooltipForAllSeries
          showDidNotRun={false}
          animation={animation}
          thresholds={PASS_FAIL}
          data={transformedData}
        />
      )}
    </SyncProvider>
  );
};

export default WrappedStatusChart;
