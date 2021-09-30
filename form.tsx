import React from 'react';

import Select from './atoms/selects/Select';

const FormReclams = ({ theme, parentState }) => {
    return ( <>
        <div className="reclamacionesDrawerInputs">
            <Select
                id="reclamacioesplaza"
                name="plaza"
                label="plaza"
                change={parentState.handledChange.bind(this)}
                theme={theme}
                values={{
                    values: parentState.props?.catalogo?.plaza,
                    value: parentState.state.plaza,
                    keys: {
                        text: 'descripcion',
                        value: 'clave'
                    }
                }}
            />

            <Select
                style={{ width: "70%", marginLeft: "20px" }}
                id="claveempresaria"
                name="claveempresaria"
                label="Clave Empresaria"
                change={parentState.handleChangeClaveEmpresaria.bind(this)}
                theme={theme}
                variant="outlined"
                values={{
                    value: parentState.state.claveempresaria
                }}
            // values={parentState.props?.catalogo?.plaza}
            />
            {/* 
                <MuiThemeProvider theme={theme}>
                    <TextField
                        style={{ width: "70%", marginLeft: "20px" }}
                        name="claveempresaria"
                        id="reclamacionesclaveempresaria"
                        label="Clave Empresaria"
                        variant="outlined"
                        autoComplete="off"
                        value={parentState.state.claveempresaria}
                        onChange={parentState.handleChangeClaveEmpresaria.bind(this)}
                    />
                </MuiThemeProvider> */}
        </div>
        {parentState.state.checked ? (
            <div className="buscarReclamacionContainer">
                <ApoloButton
                    contained
                    id="traerDistribuidora"
                    text={"Traer"}
                    onClick={parentState.getObtenerDistribuidora.bind(this)}
                    full
                />
            </div>
        ) : null}
        {parentState.state.checked ? (
            <div className="reclamacionesDrawersText1">
                <p>Nombre empresaria</p>
                <p>Referencia Bancaria</p>
            </div>
        ) : null}
        {parentState.state.checked ? (
            <div className="reclamacionesDrawersText2">
                <p>{parentState.props.distribuidora.nombreCompleto}</p>
                <p>{parentState.props.distribuidora.numeroReferenciaPagos}</p>
            </div>
        ) : null}
        {parentState.state.checked ? (
            <div className="reclamacionesDrawerInputs">
                <div className="reclamacionesFechadelSuceso">
                    <ApoloDatePicker
                        id="fechasuceso"
                        name="fechasuceso"
                        label={"Fecha del suceso"}
                        value={parentState.state.fechasuceso}
                        onChange={parentState.handleChangeFechaSuceso.bind(this)}
                        maxDate={fin}
                    />
                </div>
                {/* <MuiThemeProvider theme={theme}>
                    <TextField
                        style={{ width: "100%" }}
                        name="producto"
                        id="producto"
                        label="Producto"
                        variant="outlined"
                        select
                        value={parentState.state.producto}
                        onChange={parentState.handleChangeProducto.bind(this)}
                    >
                        {parentState.props?.catalogo?.productos?.map((item) => (
                            <MenuItem value={item.claveProducto}>
                                {item.descripcionProducto}
                            </MenuItem>
                        ))}
                    </TextField>
                </MuiThemeProvider> */}

                <Select
                    id="producto"
                    name="producto"
                    label="producto"
                    variant="outlined"
                    change={parentState.handleChangeProducto.bind(this)}
                    theme={theme}
                    values={{
                        value: parentState.state.producto,
                        values: parentState.props?.catalogo?.productos,
                        keys: {
                            text: 'claveProducto',
                            value: 'descripcionProducto'
                        }

                    }}
                />
            </div>
        ) : null}
        {parentState.state.checked ? (
            <div className="reclamacionesDrawerInputs">
                {/* <MuiThemeProvider theme={theme}>
                    <TextField
                        style={{ width: "100%" }}
                        name="canaldetransaccion"
                        id="canaldetransaccion"
                        label="Canal de Transacción"
                        variant="outlined"
                        select
                        value={parentState.state.canaldetransaccion}
                        onChange={parentState.handleChangeCanaldeTransaccion.bind(this)}
                    >
                        {parentState.props?.catalogo?.canales?.map((item) => (
                            <MenuItem value={item.claveCanal}>
                                {item.descripcionCanal}
                            </MenuItem>
                        ))}
                    </TextField>
                </MuiThemeProvider> */}

                <Select
                    id="canaldetransaccion"
                    name="canaldetransaccion"
                    label="Canal de Transacción"
                    variant="outlined"
                    change={parentState.handleChangeCanaldeTransaccion.bind(this)}
                    theme={theme}
                    values={{
                        value: parentState.state.canaldetransaccion,
                        values: parentState.props?.catalogo?.canales,
                        keys: {
                            text: 'claveCanal',
                            value: 'descripcionCanal'
                        }

                    }}
                />
                {/* <MuiThemeProvider theme={theme}>
                    <TextField
                        style={{ width: "70%", marginLeft: "20px" }}
                        name="importereclamado"
                        id="importereclamado"
                        label="Importe reclamado"
                        variant="outlined"
                        autoComplete="off"
                        value={parentState.state.importereclamado}
                        onChange={parentState.handleChangeImporteReclamado.bind(this)}
                    />
                </MuiThemeProvider> */}

                <Select
                    id="importereclamado"
                    name="importereclamado"
                    label="Canal de Transacción"
                    variant="outlined"
                    change={parentState.handleChangeImporteReclamado.bind(this)}
                    theme={theme}
                    values={{
                        value: parentState.state.importereclamado,
                        values: [],
                        keys: {
                            text: 'claveCanal',
                            value: 'descripcionCanal'
                        }

                    }}
                />

            </div>
        ) : null}
        {parentState.state.checked ? (
            <div className="reclamacionesDrawerInputs">
                <MuiThemeProvider theme={theme}>
                    <TextField
                        style={{ width: "100%" }}
                        name="origenreclamacion"
                        id="origenreclamacion"
                        label="Origen de reclamación"
                        variant="outlined"
                        select
                        value={parentState.state.origenreclamacion}
                        onChange={parentState.handleChangeOrigenReclamacion.bind(this)}
                    >
                        {parentState.props?.catalogo?.origenreclamacion?.map((item) => (
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
                        value={parentState.state.reclamacionesfolio}
                        onChange={parentState.handleChangeReclamacionesfolio.bind(this)}
                    />
                </MuiThemeProvider>
            </div>
        ) : null}
        {parentState.state.checked ? (
            <MuiThemeProvider theme={theme}>
                <TextField
                    name="motivoreclamacion"
                    id="motivoreclamacion"
                    label="Motivo de reclamación"
                    variant="outlined"
                    select
                    value={parentState.state.motivoreclamacion}
                    onChange={parentState.handleChangeMotivoReclamacion.bind(this)}
                >
                    {parentState.props?.catalogo?.motivoreclamacion?.map((item) => (
                        <MenuItem value={item.clavemotivoreclamacion}>
                            {item.descripcionmotivoreclamacion}
                        </MenuItem>
                    ))}
                </TextField>
            </MuiThemeProvider>
        ) : null}
        {parentState.state.checked ? (
            <div
                className="buscarReclamacionContainer"
                id="reclamacionesUploadFile"
            >
                <input
                    id="fileUploader"
                    className="inputfile"
                    type="file"
                    onChange={(event) => parentState.handleChanges(event)}
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