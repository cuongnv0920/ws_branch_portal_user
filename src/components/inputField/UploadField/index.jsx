import React, { useState } from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

UploadField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export function UploadField(props) {
  const { form, name, label, disabled } = props;
  const { control } = form;

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, error },
      }) => (
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          // inputProps={{
          //   multiple: true,
          // }}
          type="file"
          margin="normal"
          variant="outlined"
          fullWidth
          label={label}
          error={invalid}
          helperText={error?.message}
          onChange={(event) => onChange(event.target.files[0])}
          onBlur={onBlur}
          disabled={disabled}
          name={name}
        />
      )}
    />
  );
}
