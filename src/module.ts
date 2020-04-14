import { setThemeCustomization } from 'davi-js';
import { PanelPlugin } from '@grafana/data';
import { getTheme } from '@grafana/ui';
import { StatusChartOptions, defaultOptions } from './StatusChartOptions';
import StatusChart from './StatusChartPanel';
import { StatusChartOptionsEditor } from './StatusChartOptionsEditor';

// TODO: handle ::shudder:: light-mode
setThemeCustomization({
  name: 'dark',
  chart: {
    background: getTheme().colors.panelBg,
  },
});

export const plugin = new PanelPlugin<StatusChartOptions>(StatusChart).setDefaults(defaultOptions).setEditor(StatusChartOptionsEditor);
