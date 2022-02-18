import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function FormControlLabelPosition(props) {

  const { filter } = props;
  const [checked, setChecked] = useState(true);

  const handleChange = e => {
    setChecked(prev => !prev);
  }

  return (
    <FormControlLabel
      value={filter.identifier}
      control={
        <Switch 
          color="primary" 
          onChange={handleChange} 
          checked={checked}
        />
      }
      label={filter.name}
      labelPlacement="left"
    />
  );
}