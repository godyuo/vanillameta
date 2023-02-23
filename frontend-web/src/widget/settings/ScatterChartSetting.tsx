import React from 'react';
import { Divider, ListItem, ListItemText } from '@mui/material';
import SelectForm from '@/components/form/SelectForm';
import ColorButtonForm from '@/components/form/ColorButtonForm';
import TextFieldForm from '@/components/form/TextFieldForm';
import { AddButton, RemoveButton } from '@/components/button/AddIconButton';
import { handleAddClick, handleChange, handleRemoveClick, handleSeriesChange } from '@/widget/utils/handler';
import { COLUMN_TYPE, DISPLAY_LIST, LEGEND_LIST } from '@/constant';

const ScatterChartSetting = props => {
  const { option, setOption, spec } = props;

  // 컴포넌트 별 default series
  const defaultSeries = {
    title: `이름 ${option.series.length + 1}`,
    xField: '',
    yField: '',
    color: '',
    symbolSize: 20,
  };

  return (
    <React.Fragment>
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
            <TextFieldForm
              id={`title${index + 1}`}
              name={`title${index + 1}`}
              label={`시리즈 ${index + 1} 이름`}
              value={item.title}
              onChange={event => handleSeriesChange(event, setOption)}
              endButton={<ColorButtonForm index={index} option={option} setOption={setOption} />}
            />
            <SelectForm
              required={true}
              id={`xField${index + 1}`}
              name={`xField${index + 1}`}
              label="X 필드"
              labelField="columnName"
              valueField="columnType"
              optionList={spec.filter(item => item.columnType === COLUMN_TYPE.NUMBER).map(item => item.columnName)}
              value={item.xField}
              onChange={event => handleSeriesChange(event, setOption)}
            />
            <SelectForm
              required={true}
              id={`yField${index + 1}`}
              name={`yField${index + 1}`}
              label="Y 필드"
              labelField="columnName"
              valueField="columnType"
              optionList={spec.filter(item => item.columnType === COLUMN_TYPE.NUMBER).map(item => item.columnName)}
              value={item.yField}
              onChange={event => handleSeriesChange(event, setOption)}
            />
            <TextFieldForm
              id={`symbolSize${index + 1}`}
              name={`symbolSize${index + 1}`}
              label="사이즈"
              type="number"
              value={item.symbolSize}
              onChange={event => handleSeriesChange(event, setOption)}
              endButton={
                0 < index ? (
                  <RemoveButton onClick={event => handleRemoveClick(event, index, option, setOption)} id={index} />
                ) : (
                  false
                )
              }
            />
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
        <ListItemText>범례 설정</ListItemText>
        <SelectForm
          id="legendPosition"
          name="legendPosition"
          label="위치"
          optionList={LEGEND_LIST}
          value={option.legendPosition}
          onChange={event => handleChange(event, setOption)}
        />
      </ListItem>
    </React.Fragment>
  );
};

export default ScatterChartSetting;
