import React, { useState, useEffect } from 'react';
import { Box, Stack, Step, StepLabel, Stepper } from '@mui/material';
import PageTitleBox from '@/components/PageTitleBox';
import PageContainer from '@/components/PageContainer';
import ConfirmCancelButton from '@/components/button/ConfirmCancelButton';
import TitleBox from '@/components/TitleBox';
import WidgetDataSelect from './WidgetDataSelect';
import WidgetTypeSelect from './WidgetTypeSelect';
import WidgetAttributeSelect from './WidgetAttributeSelect';

const title = '위젯 생성';
const steps = ['데이터 선택', '위젯 타입 선택', '위젯 속성 설정'];

function WidgetCreate(props) {
  const [activeStep, setActiveStep] = useState(0);

  const [dataSet, setDataSet] = useState(null); // step 1
  const [widgetType, setWidgetType] = useState(null); // step 2
  const [widgetOption, setWidgetOption] = useState(null); // step 3
  const [widgetTitle, setWidgetTitle] = useState(null);

  // 개발 편의상 임시로 적용
  useEffect(() => {
    setDataSet(688279);
    setWidgetType('CHART_LINE');
    setActiveStep(2);
  }, []);

  useEffect(() => {
    if (!widgetOption) {
      return;
    }
    setWidgetTitle(widgetOption.title);
  }, [widgetOption]);

  const [isWidgetValueValid, setIsWidgetValueValid] = useState(false);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (activeStep === 0 && !!dataSet) {
      setIsNextButtonDisabled(false);
      return;
    }

    if (activeStep === 1 && !!widgetType) {
      setIsNextButtonDisabled(false);
      return;
    }

    if (activeStep === steps.length - 1) {
      setIsNextButtonDisabled(false);
      return;
    }

    setIsNextButtonDisabled(true);
  }, [activeStep, dataSet, widgetType]);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    }
  };

  // 위젯 속성 저장
  const handleSubmit = event => {
    event.preventDefault();
    setIsSubmit(true);

    if (!isWidgetValueValid) {
      return;
    }
    console.log('datesetId:', dataSet);
    console.log('widgetType:', widgetType);
    console.log('widgetTitle:', widgetTitle);
    console.log('widgetOption:', widgetOption);
  };

  return (
    <PageContainer>
      <PageTitleBox
        title={title}
        button={
          <Stack>
            <ConfirmCancelButton
              confirmLabel={activeStep === steps.length - 1 ? '저장' : '다음'}
              cancelLabel="이전"
              confirmProps={{
                form: 'widgetAttribute',
                onClick: activeStep === steps.length - 1 ? handleSubmit : handleNext,
                disabled: isNextButtonDisabled,
              }}
              cancelProps={{
                onClick: handleBack,
                disabled: activeStep === 0,
              }}
            />
          </Stack>
        }
      >
        <Box>
          <Stepper
            activeStep={activeStep}
            sx={{
              width: { xs: '100%', sm: '70%' },
              m: 'auto',
              mt: 8,
              mb: 6,
            }}
          >
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>

        {activeStep === 0 ? (
          <WidgetDataSelect setDataSet={setDataSet} />
        ) : activeStep === 1 ? (
          <WidgetTypeSelect widgetType={widgetType} setWidgetType={setWidgetType} />
        ) : (
          <TitleBox title="위젯 속성 설정">
            <WidgetAttributeSelect
              dataSetId={dataSet}
              componentType={widgetType}
              setWidgetOption={setWidgetOption}
              setIsValid={setIsWidgetValueValid}
              isSubmit={isSubmit}
            />
          </TitleBox>
        )}
      </PageTitleBox>
    </PageContainer>
  );
}

export default WidgetCreate;
