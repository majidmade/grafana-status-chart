import React, { PureComponent } from 'react';
import { FormField } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';
import { StatusChartOptions } from './StatusChartOptions';

// cant make this a functional component Because Types Apparently

export class StatusChartOptionsEditor extends PureComponent<PanelEditorProps<StatusChartOptions>> {
  onChange = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, animation: target?.checked ?? false });
  };

  render() {
    return (
      <div className="section gf-form-group">
        <h5 className="section-heading">Options</h5>
        {/* does the onChange handler need .bind(this)? the example didnt do it, and it works, so... gross but okay for now */}
        <FormField label="Enable Animation" labelWidth={10} inputWidth={5} type="checkbox" onChange={this.onChange} />
      </div>
    );
  }
}
