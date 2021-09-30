import React from "react";
import { MenuItem, MuiThemeProvider, TextField } from "@material-ui/core";

type TypeValues = {
    value?: {}[];
    values?: { id: number; descripciontipo: string }[];
    keys?: {
        value?: string;
        text?: string;
    }
}
type TypeSelect = {
    theme: {};
    change: Function;
    name?: string;
    id?: string;
    label?: string;
    variant?: string;
    style?: null | object;
    values: TypeValues
}


const Select = ({ theme, change, name, id, label, variant, style, values }: TypeSelect) => {
    return (
        <MuiThemeProvider theme={theme}>
            <TextField
                style={style || { width: "100%" }}
                name={name}
                id={id}
                label={label}
                variant={variant}
                select
                value={values.value}
                onChange={(e) => change(e)}
            //   onClick={() => this.handleChange(true)}              
            >
                <MenuItem value="12">prueba 1</MenuItem>
                <MenuItem value="33">prueba 2</MenuItem>

                {values.values.map((item) => (
                    <MenuItem value={item[values.keys.value]}>{item[values.keys.text]}</MenuItem>
                ))}
            </TextField>
        </MuiThemeProvider>
    )
}


export default Select;