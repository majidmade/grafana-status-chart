import { useCallback, useEffect, useState } from 'react';
import { SystemJS } from '@grafana/runtime';
import { Emitter } from 'grafana/app/core/core';

interface SharedCrosshair {
  value: number;
  onCrosshairHover: (x: number) => void;
}

const PLACEHOLDER_EMITTER: Emitter = {
  on: () => {},
  off: () => {},
  emit: () => {},
  emitter: null,
  removeAllListeners: () => {},
}

export const useControlledCrosshair: () => SharedCrosshair = () => {
  const [crosshair, setCrosshair] = useState<number>(0); // TODO: not a good default
  const [appEvents, setAppEvents] = useState<Emitter>(PLACEHOLDER_EMITTER);
  SystemJS.load('app/core/app_events').then(setAppEvents);

  const receiveCrosshair = useCallback(e => setCrosshair(e?.pos?.x ?? 0 /* TODO: not a good fallback */), []);
  const emitCrosshair = useCallback(
    (x: number) => {
      setCrosshair(x);
      appEvents.emit('graph-hover', { pos: { x }, panel: {} });
    },
    [appEvents]
  );
  useEffect(() => {
    appEvents.on('graph-hover', receiveCrosshair);
    appEvents.on('graph-hover-clear', receiveCrosshair);
    return () => {
      appEvents.off('graph-hover', receiveCrosshair);
      appEvents.off('graph-hover-clear', receiveCrosshair);
    };
  }, [appEvents, receiveCrosshair]);

  return {
    value: crosshair,
    onCrosshairHover: emitCrosshair,
  };
};
