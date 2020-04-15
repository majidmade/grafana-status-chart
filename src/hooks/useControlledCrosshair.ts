import { useCallback, useEffect, useState } from 'react';
import { appEvents } from 'grafana/app/core/core';

type Crosshair = number | undefined;

interface SharedCrosshair {
  value: Crosshair;
  onCrosshairHover: (x: number) => void;
}

export const useControlledCrosshair: () => SharedCrosshair = () => {
  const [crosshair, setCrosshair] = useState<Crosshair>(undefined);

  const receiveCrosshair = useCallback((e: any /* TODO: type */) => setCrosshair(e?.pos?.x), []);
  const emitCrosshair = useCallback((x: number) => {
    setCrosshair(x);
    appEvents.emit('graph-hover', { pos: { x }, panel: {} });
  }, []);

  useEffect(() => {
    appEvents.on('graph-hover', receiveCrosshair);
    appEvents.on('graph-hover-clear', receiveCrosshair);
    return () => {
      appEvents.off('graph-hover', receiveCrosshair);
      appEvents.off('graph-hover-clear', receiveCrosshair);
    };
  }, []);

  return {
    value: crosshair,
    onCrosshairHover: emitCrosshair,
  };
};
