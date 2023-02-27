import React, { useEffect, useState } from 'react';
import { ListItem, ListItemText } from '@mui/material';
import SelectForm from '@/components/form/SelectForm';
import ColorFieldForm from '@/components/form/ColorFieldForm';
import { handleChange } from '@/widget/utils/handler';
import { AGGREGATION_LIST, COLUMN_TYPE, LEGEND_LIST, PIE_LABEL_LIST } from '@/constant';
import { getAggregationDataForChart, getColorArr } from '@/widget/modules/utils/chartUtil';
import { AddButton } from '@/components/button/AddIconButton';

const PieChartSetting = props => {
  const { option, setOption, listItem, spec, dataSet } = props;
  const [colorNum, setColorNum] = useState(12);

  useEffect(() => {
    let pieAggrData = [];
    if (option.series.field) {
      pieAggrData = getAggregationDataForChart(dataSet, option.series.name, option.series.field, option.series.aggregation);
    }
    if (pieAggrData.length !== option.series.color.length) {
      const colorArr = getColorArr(pieAggrData.length);
      setOption(prevState => {
        prevState.series.color = colorArr;
        return { ...prevState };
      });
    }
  }, [option.series.field, option.series.name]);

  const handleSeriesChange = event => {
    setOption(prevState => ({
      ...prevState,
      series: {
        ...prevState.series,
        [event.target.name]: event.target.value,
      },
    }));
  };

  const handleAddColorClick = () => {
    if (option.series.field && option.series.name) {
      setColorNum(prevState => prevState + 12);
    }
  };

  return (
    <React.Fragment>
      <ListItem divider>
        <ListItemText primary="카테고리 설정" sx={{ textTransform: 'uppercase' }} />
        <SelectForm
          required={true}
          id="name"
          name="name"
          label="이름"
          labelField="columnName"
          valueField="columnType"
          optionList={spec.map(item => item.columnName)}
          value={option.series.name}
          onChange={handleSeriesChange}
        />
        <SelectForm
          name="label"
          label="레이블 타입"
          optionList={PIE_LABEL_LIST}
          value={option.series.label}
          onChange={handleSeriesChange}
        />
      </ListItem>
      <ListItem divider>
        <ListItemText primary="시리즈 설정" />
        <SelectForm
          required={true}
          id="field"
          name="field"
          label="필드"
          labelField="columnName"
          valueField="columnType"
          optionList={spec.filter(item => item.columnType === COLUMN_TYPE.NUMBER).map(item => item.columnName)}
          value={option.series.field}
          onChange={handleSeriesChange}
        />
        <SelectForm
          id="aggregation"
          name="aggregation"
          label="집계 방식"
          optionList={AGGREGATION_LIST}
          value={option.series.aggregation}
          onChange={handleSeriesChange}
          disabledDefaultValue
        />
      </ListItem>

      {/* 추가되는 아이템 */}
      {!!listItem && (
        <ListItem divider>
          <ListItemText primary={listItem.title} />
          {listItem.children}
        </ListItem>
      )}

      <ListItem divider>
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
      <ListItem>
        <ListItemText primary="색상 설정" />
        <AddButton
          onClick={handleAddColorClick}
          sx={{
            position: 'absolute',
            top: 30,
            right: 0,
          }}
        />
        {option.series.field &&
          option.series.color
            .filter((item, index) => index < colorNum)
            .map((item, index) => (
              <React.Fragment key={index}>
                <ColorFieldForm
                  id={`color${index + 1}`}
                  name={`color${index + 1}`}
                  value={option.series.color[index]}
                  colorList={option.series.color}
                  setOption={setOption}
                  index={index}
                />
              </React.Fragment>
            ))}
      </ListItem>
    </React.Fragment>
  );
};

export default PieChartSetting;
