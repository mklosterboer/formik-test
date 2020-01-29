import React from "react";
import { FieldAttributes, useField } from "formik";
import { TextField } from "@material-ui/core";

type Props = { placeholder: string } & FieldAttributes<{}>;

export const MyTextField: React.FC<Props> = ({ placeholder, ...props }) => {
    const [field, meta] = useField(props);

    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
        <TextField
            placeholder={placeholder}
            {...field}
            helperText={errorText}
            error={!!errorText}
        />
    );
};
