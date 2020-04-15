import { useState, useEffect, useContext } from 'react';
import { setThemeCustomization } from 'davi-js';
import { ThemeContext } from '@grafana/ui';

export const useGrafanaTheme = () => {
  const [, forceUpdate] = useState<0 | 1>(0); // <--
  const theme = useContext(ThemeContext);
  useEffect(() => {
    setThemeCustomization({
      name: theme.type,
      chart: {
        background: theme?.colors?.panelBg,
      },
      // matching the grafana crosshair is worth considering, but its a red that may be hard to see over the fail-red
      // crosshair: { color: '#000000', },
      tooltip: {
        backgroundColor: theme.isLight ? theme?.colors?.gray5 : theme?.colors?.dark1, // :(
        color: theme?.colors?.text,
        opacity: 1
      },
    });
    forceUpdate(1); // <-- why? well... see note at bottom of file.
  }, [theme]);
  return theme;
};

// --> when you set the davi theme, the chart doesn't rerender until it otherwise needs to
// (which, typically, is when it gets an interaction of some sort -- eg, mouseover)
// setting state forces a re-render immediately, which avoids this. without it, the chart
// is in light mode while the rest of the page is in dark mode (until touched), or vice versa
// this is like calling both this.forceUpdate() in a class component (incl. its anti-goal-ed-ness)
