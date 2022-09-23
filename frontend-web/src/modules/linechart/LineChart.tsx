import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Box } from '@mui/material';
import { getGridSize, getLegendOtion } from '@/modules/utils/chartUtil';

const LineChart = props => {
  const { option, dataSet, axisReverse, seriesOp, defaultOp, createOp, ...rest } = props;

  const [componentOption, setComponentOption] = useState({});

  const defaultComponentOption = {
    grid: { top: 50, right: 50, bottom: 50, left: 50 },
    tooltip: { trigger: 'axis' },
    [!axisReverse ? 'xAxis' : 'yAxis']: {
      type: 'category',
    },
    [!axisReverse ? 'yAxis' : 'xAxis']: {
      type: 'value',
    },
    series: [],
    emphasis: {
      focus: 'series',
      blurScope: 'coordinateSystem',
    },
    ...defaultOp,
  };

  useEffect(() => {
    if (option && dataSet) {
      const newOption = createComponentOption();
      console.log('linechart new option', newOption);
      setComponentOption(newOption);
    }
  }, [option, dataSet]);

  /**
   *
   * 위젯옵션과 데이터로
   * 컴포넌트에 맞는 형태로 생성
   */

  const createComponentOption = () => {
    let newOption = {};

    // series option에서 가져오기
    const newSeries = [];
    const newColors = [];
    option.series.forEach(item => {
      if (item.field) {
        const series = {
          name: item.field,
          data: dataSet.map(dataItem => dataItem[item.field]),
          // type: 'line',
          type: item.type ?? 'line',
          smooth: true,
          ...seriesOp,
        };
        newSeries.push(series);
        newColors.push(item.color);
      }
    });
    if (dataSet) {
      const op = {
        [!axisReverse ? 'xAxis' : 'yAxis']: {
          type: 'category',
          data: !!option[!axisReverse ? 'xField' : 'yField']
            ? dataSet.map(item => item[option[!axisReverse ? 'xField' : 'yField']])
            : '',
        },
        series: newSeries,
        color: newColors,
        grid: getGridSize(option.legendPosition),
        legend: getLegendOtion(option.legendPosition),
        ...createOp,
      };

      newOption = { ...defaultComponentOption, ...op };
    }

    return newOption;
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <ReactECharts option={componentOption} style={{ height: '100%', width: '100%' }} lazyUpdate={true} notMerge={true} />
    </Box>
  );
};

export default LineChart;
