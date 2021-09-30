import React from 'react';

const FormReclams = ({}) => {
    return (
 <>
 <div className="reclamacionesDrawerInputs">
              <MuiThemeProvider theme={theme}>
                <TextField
                  style={{ width: "100%" }}
                  name="plaza"
                  id="reclamacionesplaza"
                  label="Plaza"
                  variant="outlined"
                  autoComplete="off"
                  select
                  value={this.state.plaza}
                  onChange={this.handledChange.bind(this)}
                >
                  {this.props?.catalogo?.plaza?.map((item) => (
                    <MenuItem value={item.clave}>
                      {item.clave} - {item.descripcion}
                    </MenuItem>
                  ))}
                </TextField>
              </MuiThemeProvider>

              <MuiThemeProvider theme={theme}>
                <TextField
                  style={{ width: "70%", marginLeft: "20px" }}
                  name="claveempresaria"
                  id="reclamacionesclaveempresaria"
                  label="Clave Empresaria"
                  variant="outlined"
                  autoComplete="off"
                  value={this.state.claveempresaria}
                  onChange={this.handleChangeClaveEmpresaria.bind(this)}
                />
              </MuiThemeProvider>
            </div>
          ) : null}
          {this.state.checked ? (
            <div className="buscarReclamacionContainer">
              <ApoloButton
                contained
                id="traerDistribuidora"
                text={"Traer"}
                onClick={this.getObtenerDistribuidora.bind(this)}
                full
              />
            </div>
          ) : null}
          {this.state.checked ? (
            <div className="reclamacionesDrawersText1">
              <p>Nombre empresaria</p>
              <p>Referencia Bancaria</p>
            </div>
          ) : null}
          {this.state.checked ? (
            <div className="reclamacionesDrawersText2">
              <p>{this.props.distribuidora.nombreCompleto}</p>
              <p>{this.props.distribuidora.numeroReferenciaPagos}</p>
            </div>
          ) : null}
          {this.state.checked ? (
            <div className="reclamacionesDrawerInputs">
              <div className="reclamacionesFechadelSuceso">
                <ApoloDatePicker
                  id="fechasuceso"
                  name="fechasuceso"
                  label={"Fecha del suceso"}
                  value={this.state.fechasuceso}
                  onChange={this.handleChangeFechaSuceso.bind(this)}
                  maxDate={fin}
                />
              </div>
              <MuiThemeProvider theme={theme}>
                <TextField
                  style={{ width: "100%" }}
                  name="producto"
                  id="producto"
                  label="Producto"
                  variant="outlined"
                  select
                  value={this.state.producto}
                  onChange={this.handleChangeProducto.bind(this)}
                >
                  {this.props?.catalogo?.productos?.map((item) => (
                    <MenuItem value={item.claveProducto}>
                      {item.descripcionProducto}
                    </MenuItem>
                  ))}
                </TextField>
              </MuiThemeProvider>
            </div>
          ) : null}
          {this.state.checked ? (
            <div className="reclamacionesDrawerInputs">
              <MuiThemeProvider theme={theme}>
                <TextField
                  style={{ width: "100%" }}
                  name="canaldetransaccion"
                  id="canaldetransaccion"
                  label="Canal de Transacción"
                  variant="outlined"
                  select
                  value={this.state.canaldetransaccion}
                  onChange={this.handleChangeCanaldeTransaccion.bind(this)}
                >
                  {this.props?.catalogo?.canales?.map((item) => (
                    <MenuItem value={item.claveCanal}>
                      {item.descripcionCanal}
                    </MenuItem>
                  ))}
                </TextField>
              </MuiThemeProvider>
              <MuiThemeProvider theme={theme}>
                <TextField
                  style={{ width: "70%", marginLeft: "20px" }}
                  name="importereclamado"
                  id="importereclamado"
                  label="Importe reclamado"
                  variant="outlined"
                  autoComplete="off"
                  value={this.state.importereclamado}
                  onChange={this.handleChangeImporteReclamado.bind(this)}
                />
              </MuiThemeProvider>
            </div>
          ) : null}
          {this.state.checked ? (
            <div className="reclamacionesDrawerInputs">
              <MuiThemeProvider theme={theme}>
                <TextField
                  style={{ width: "100%" }}
                  name="origenreclamacion"
                  id="origenreclamacion"
                  label="Origen de reclamación"
                  variant="outlined"
                  select
                  value={this.state.origenreclamacion}
                  onChange={this.handleChangeOrigenReclamacion.bind(this)}
                >
                  {this.props?.catalogo?.origenreclamacion?.map((item) => (
                    <MenuItem value={item.claveorigenreclamacion}>
                      {item.descripcionorigenreclamacion}
                    </MenuItem>
                  ))}
                </TextField>
              </MuiThemeProvider>
              <MuiThemeProvider theme={theme}>
                <TextField
                  style={{ width: "70%", marginLeft: "20px" }}
                  name="reclamacionesfolio"
                  id="reclamacionesfolio"
                  label="Folio"
                  variant="outlined"
                  autoComplete="off"
                  value={this.state.reclamacionesfolio}
                  onChange={this.handleChangeReclamacionesfolio.bind(this)}
                />
              </MuiThemeProvider>
            </div>
          ) : null}
          {this.state.checked ? (
            <MuiThemeProvider theme={theme}>
              <TextField
                name="motivoreclamacion"
                id="motivoreclamacion"
                label="Motivo de reclamación"
                variant="outlined"
                select
                value={this.state.motivoreclamacion}
                onChange={this.handleChangeMotivoReclamacion.bind(this)}
              >
                {this.props?.catalogo?.motivoreclamacion?.map((item) => (
                  <MenuItem value={item.clavemotivoreclamacion}>
                    {item.descripcionmotivoreclamacion}
                  </MenuItem>
                ))}
              </TextField>
            </MuiThemeProvider>
          ) : null}
          {this.state.checked ? (
            <div
              className="buscarReclamacionContainer"
              id="reclamacionesUploadFile"
            >
              <input
                id="fileUploader"
                className="inputfile"
                type="file"
                onChange={(event) => this.handleChanges(event)}
                accept=".pdf"
              />
              <label htmlFor="fileUploader">
                <PublishIcon />
              </label>
            </div>
          ) : null}
    );
};

export default FormReclams;
