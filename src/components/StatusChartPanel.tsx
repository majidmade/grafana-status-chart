import React, { FunctionComponent, useMemo } from 'react';
import { SelectedIndexProvider, StatusChart } from 'davi-js';
import { PanelProps } from '@grafana/data';
import { useControlledZoom, useControlledCrosshair } from 'hooks';
import { mapGrafanaToDavi } from 'DataAdapter';
import { StatusChartOptions } from './StatusChartOptions';

interface StatusChartProps extends PanelProps<StatusChartOptions> {}

const WrappedStatusChart: FunctionComponent<StatusChartProps> = props => {
  const { data, timeRange, onChangeTimeRange, options } = props;
  const { animation, thresholds } = options;
  const transformedData = useMemo(() => mapGrafanaToDavi(data), [data]);
  const controlledZoom = useControlledZoom({ timeRange, onChangeTimeRange });
  const controlledCrosshair = useControlledCrosshair();

  return (
    <SelectedIndexProvider {...controlledCrosshair}>
      <StatusChart
        {...controlledZoom}
        {...controlledCrosshair}
        zoomEnabled
        xAxisSnappedTicks
        showTooltipForAllSeries
        showDidNotRun={false}
        animation={animation}
        thresholds={thresholds}
        data={transformedData}
      />
    </SelectedIndexProvider>
  );
};

export default WrappedStatusChart;
