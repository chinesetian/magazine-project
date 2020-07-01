import React, { useMemo } from 'react';
import './index.less';
function LabelValue({ label, value, emptyValue, labelColor, valueColor, className, fontSize, noWrap = true, valueFontWeight, valueFontSize,noColon }) {
  const defaultValueColor = useMemo(() => (!!value ? valueColor : '#333'), [value, valueColor]);
  return (
    <div className={`label-value-layout ${className}`} style={{ fontSize }}>
      <span style={{ color: labelColor }}>{label}{noColon?'':'：'}</span>
      <span
        title={typeof value === 'string' || typeof value === 'number' ? value : null}
        className={`${noWrap ? 'no-wrap' : ''}`}
        style={{ color: defaultValueColor, fontWeight: valueFontWeight, fontSize: valueFontSize }}
      >
        {value || emptyValue || '-'}
      </span>
    </div>
  );
}

LabelValue.defaultProps = {
  value: '',
  labelColor: '#999',
  emptyValue: '-',
  valueColor: '#333',
  fontSize: '12px',
  valueFontSize: '12px',
  noWrap: false,
  className: '',
  valueFontWeight: 'normal'
};

export default React.memo(LabelValue);
