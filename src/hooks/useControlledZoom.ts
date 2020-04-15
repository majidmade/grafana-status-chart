import { useMemo, useCallback } from 'react';
import { ISyncProvider } from 'davi-js';
import { PanelProps } from '@grafana/data';

export const useControlledZoom = ({ timeRange, onChangeTimeRange }: Pick<PanelProps, 'timeRange' | 'onChangeTimeRange'>): ISyncProvider => {
  const zoom = useMemo(() => ({ xStart: timeRange.from.valueOf(), xEnd: timeRange.to.valueOf(), zoomBuffer: [] }), [timeRange]);
  const zoomCallback = useCallback(({ xStart, xEnd }) => onChangeTimeRange({ from: xStart, to: xEnd }), [onChangeTimeRange]);
  return {
    zoom,
    zoomCallback,
    syncSelectedSeries: false /* TODO */,
  };
};
