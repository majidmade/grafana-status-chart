import React, { FunctionComponent, useMemo } from 'react';
import { SelectedIndexProvider, StatusChart } from 'davi-js';
import { PanelProps } from '@grafana/data';
import { useControlledZoom, useControlledCrosshair, useGrafanaTheme } from 'hooks';
import { mapGrafanaToDavi } from 'DataAdapter';
import { StatusChartOptions } from './StatusChartOptions';

interface StatusChartProps extends PanelProps<StatusChartOptions> {}

const WrappedStatusChart: FunctionComponent<StatusChartProps> = ({ data, timeRange, onChangeTimeRange, id, options: { animation, thresholds } }) => {
  useGrafanaTheme();
  const transformedData = useMemo(() => mapGrafanaToDavi(data), [data]);
  const controlledZoom = useControlledZoom({ timeRange, onChangeTimeRange });
  const controlledCrosshair = useControlledCrosshair(id);

  return (
    <SelectedIndexProvider {...controlledCrosshair}>
      <StatusChart
        {...controlledZoom}
        {...controlledCrosshair}
        animation={animation}
        thresholds={thresholds}
        data={transformedData}
        zoomEnabled={true}
        showDidNotRun={false}
      />
    </SelectedIndexProvider>
  );
};

export default WrappedStatusChart;
