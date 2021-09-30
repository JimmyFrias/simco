  import React from "react";
import { MenuItem, MuiThemeProvider, TextField } from "@material-ui/core";

const Select = ({theme,values,change, value}) => {
return (
    <MuiThemeProvider theme={theme}>
    <TextField
      style={{ width: "100%" }}
      name="tiposaclaracion"
      id="tiposaclaracion"
      label="Tipo de reclamación"
      variant="outlined"
      select
      value={value}
    onChange={(e)=>change(e)}
    //   onClick={() => this.handleChange(true)}              
    >
        <MenuItem value="12">prueba 1</MenuItem>
        <MenuItem value="33">prueba 2</MenuItem>

    {values.map((item) => (
        <MenuItem value={item.id}>{item.descripciontipo}</MenuItem>
      ))} 
    </TextField>
  </MuiThemeProvider>
)
}


export default Select;
