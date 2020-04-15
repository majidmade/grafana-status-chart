import { PanelPlugin } from '@grafana/data';
import { StatusChartOptions, defaultOptions } from './components/StatusChartOptions';
import StatusChart from './components/StatusChartPanel';
import { StatusChartOptionsEditor } from './components/StatusChartOptionsEditor';

export const plugin = new PanelPlugin<StatusChartOptions>(StatusChart).setDefaults(defaultOptions).setEditor(StatusChartOptionsEditor);
