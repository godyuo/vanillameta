import React, { useState } from 'react';
import { FormControl, FormLabel, IconButton, OutlinedInput, Popover, Select, Stack, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { SketchPicker } from 'react-color';

function ColorFieldForm(props) {
  const { id, label, value, optionList, setOption, index, endButton, ...rest } = props;

  const color = !!optionList ? optionList.series.color[index] : '#eee';
  const labelItem = label[index] || '';
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = event => {
    setOption(prevState => {
      const _tempOption = { ...prevState };
      _tempOption.series.color.splice(index, 1, event.target.value);
      return _tempOption;
    });
  };

  const handleCompleteChange = selectColor => {
    setAnchorEl(null);
    setOption(prevState => {
      const _tempOption = { ...prevState };
      _tempOption.series.color.splice(index, 1, selectColor.hex);
      return _tempOption;
    });
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? '색상 선택 팝업' : undefined;

  return (
    <FormControl fullWidth sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <FormLabel
        htmlFor={id}
        sx={{ width: '35%', pr: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
      >
        {labelItem}
      </FormLabel>
      <Stack flexDirection="row" sx={{ width: label ? '65%' : '100%' }} justifyContent="space-between" alignItems="center">
        <IconButton
          aria-label="색상 선택"
          sx={{ mr: 1, border: '1px solid #c4c4c4', bgcolor: '#fff' }}
          onClick={handleClick}
        >
          <CircleIcon sx={{ color: value }} />
        </IconButton>
        <Popover
          id={popoverId}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <SketchPicker color={color} onChangeComplete={handleCompleteChange} />
        </Popover>
        <OutlinedInput
          id={id}
          value={value}
          type="text"
          margin="dense"
          fullWidth
          sx={endButton ? { width: 'calc(100% - 38px)', flexShrink: 0 } : { width: '100%' }}
          onChange={handleChange}
          {...rest}
        />
      </Stack>
    </FormControl>
  );
}

ColorFieldForm.defaultProps = {
  value: '#eee',
  endButton: undefined,
  id: '',
  label: [],
  index: 0,
  optionList: '',
  setOption: '',
};

export default ColorFieldForm;
