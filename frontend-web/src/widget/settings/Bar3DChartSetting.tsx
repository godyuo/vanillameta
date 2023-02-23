import React from 'react';
import { Divider, ListItem, ListItemText } from '@mui/material';
import SelectForm from '@/components/form/SelectForm';
import { AddButton, RemoveButton } from '@/components/button/AddIconButton';
import { handleAddClick, handleChange, handleRemoveClick, handleSeriesChange } from '@/widget/utils/handler';
import { AGGREGATION_LIST, COLUMN_TYPE, DISPLAY_LIST, WIDGET_AGGREGATION } from '@/constant';
import ColorFieldForm from '@/components/form/ColorFieldForm';

const Bar3DChartSetting = props => {
  const { option, setOption, seriesItem, spec } = props;

  console.log(option);
  // 컴포넌트 별 default series
  const defaultSeries = {
    field: '',
    aggregation: WIDGET_AGGREGATION.SUM,
  };

  return (
    <React.Fragment>
      <ListItem divider>
        <ListItemText primary="카테고리 설정" sx={{ textTransform: 'uppercase' }} />
        <SelectForm
          required={true}
          id="xField"
          name="xField"
          label="x축"
          optionList={spec.map(item => item.columnName)}
          labelField="columnName"
          valueField="columnType"
          value={option.xField}
          onChange={event => handleChange(event, setOption)}
        />
      </ListItem>
      <ListItem divider>
        <ListItemText primary="시리즈 설정" />
        <AddButton
          onClick={event => handleAddClick(event, option, setOption, defaultSeries)}
          sx={{
            position: 'absolute',
            top: 30,
            right: 0,
          }}
        />
        {option.series.map((item, index) => (
          <React.Fragment key={index}>
            <SelectForm
              required={true}
              id={`field${index + 1}`}
              name={`field${index + 1}`}
              label={`필드 ${index + 1}`}
              labelField="columnName"
              valueField="columnType"
              optionList={spec.filter(item => item.columnType === COLUMN_TYPE.NUMBER).map(item => item.columnName)}
              value={item.field}
              onChange={event => handleSeriesChange(event, setOption)}
            />
            <SelectForm
              id={`aggregation${index + 1}`}
              name={`aggregation${index + 1}`}
              label="집계 방식"
              optionList={AGGREGATION_LIST}
              value={item.aggregation}
              onChange={event => handleSeriesChange(event, setOption)}
              disabledDefaultValue
              endButton={
                0 < index ? (
                  <RemoveButton onClick={event => handleRemoveClick(event, index, option, setOption)} id={index} />
                ) : (
                  ' '
                )
              }
            />
            {!!seriesItem && (
              <SelectForm
                id={`${seriesItem.id}${index + 1}`}
                name={`${seriesItem.name}${index + 1}`}
                label={seriesItem.label}
                optionList={seriesItem.optionList}
                value={item[seriesItem.value]}
                onChange={event => handleSeriesChange(event, setOption)}
                disabledDefaultValue={seriesItem.disabledDefaultValue}
              />
            )}
            <Divider />
          </React.Fragment>
        ))}
        <SelectForm
          name="label"
          label="레이블"
          optionList={DISPLAY_LIST}
          value={option.label}
          onChange={event => handleChange(event, setOption)}
        />
      </ListItem>
      <ListItem>
        <ListItemText primary="색상 범위 설정" />
        {option.color.map((item, index) => (
          <React.Fragment key={index}>
            <ColorFieldForm
              id={`color${index + 1}`}
              name={`color${index + 1}`}
              value={option.color[index]}
              colorList={option.color}
              setOption={setOption}
              index={index}
            />
          </React.Fragment>
        ))}
      </ListItem>
    </React.Fragment>
  );
};

export default Bar3DChartSetting;
