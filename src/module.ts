import { setThemeCustomization } from 'davi-js';
import { PanelPlugin } from '@grafana/data';
import { getTheme } from '@grafana/ui';
import { StatusChartOptions, defaultOptions } from './components/StatusChartOptions';
import StatusChart from './components/StatusChartPanel';
import { StatusChartOptionsEditor } from './components/StatusChartOptionsEditor';

// TODO: handle ::shudder:: light-mode
setThemeCustomization({
  name: 'dark',
  chart: {
    background: getTheme().colors.panelBg,
  },
});

export const plugin = new PanelPlugin<StatusChartOptions>(StatusChart).setDefaults(defaultOptions).setEditor(StatusChartOptionsEditor);
