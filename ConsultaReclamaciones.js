import React, { Component } from "react";

import PublishIcon from "@material-ui/icons/Publish";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
// import compose from 'recompose/compose';
// import { connect } from 'react-redux';
import compose from "recompose/compose";
import { connect } from "react-redux";
import { ApoloDatePicker, ApoloButton } from "dsmapolo-react";
import { MuiThemeProvider } from "@material-ui/core";
import moment from "moment";
import "../styles/custom.css";

import "../styles/reclamaciones.css";
import PaginationTable from "./PaginationTableReclamaciones.js";
import {
  getReclamaciones,
  getObtenerCatalogos,
} from "../reclamaciones/actions";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { stringify } from "querystring";

const fin = moment().format("DD/MM/YYYY");



export class Reclamaciones extends Component {
  constructor(props) {
    super(props);
    this.handleChangePageSize = this.handleChangePageSize.bind(this);
    this.handleChangePagePrev = this.handleChangePagePrev.bind(this);
    this.handleChangePageNext = this.handleChangePageNext.bind(this);
    this.handledChange = this.handledChange.bind(this);
    this.handledChangeFilter = this.handledChangeFilter.bind(this);

    //this.llenaReclamacionDrawer=this.llenaReclamacionDrawer.bind(this);

    this.state = {
      folioreclamacion: "",
      fechareclamacion: "",
      tiporeclamacion: "",
      tipodereclamacion: "",
      importe: "",
      estatusreclamacion: "",
      empresaria: "",
      plaza: 0,
      selectedModuleProfiles: [],
      claveempresaria: "",
      fechasuceso: "",
      producto: "",
      canaldetransaccion: "",
      reportereclamado: "",
      origenreclamacion: "",
      motivoreclamacion: "",
      totalElements: "-",
      tableData: "",
      pageNo: 0,
      pageSize: 10,
      waiting: false,
      showResult: false,
      buscar: false,
      right: false,
      anchor: false,
      catalogosfetch: false,
    };
  }
  componentDidMount() {
    this.getReclamaciones();
    this.getObtenerCatalogos();
  }

  handleChangeFolio = (e) => {
    const value = e.target.value;
    const re = /[^A-Za-z0-9]*$/;

    if (value === "" || re.test(value)) {
      this.setState({ folioreclamacion: e.target.value.substr(0, 19) });
    }
    this.setState({ buscar: false });
  };

  handleChangeFechaReclamacion = (e) => {
    this.setState({ fechareclamacion: e });
    this.setState({ buscar: false });
  };

  handleChangeImporte = (e) => {
    this.setState({ importe: e.target.value });
    this.setState({ buscar: false });
  };

  handleChangeempresaria = (e) => {
    this.setState({ empresaria: e.target.value });
    this.setState({ buscar: false });
  };

  handledChangeFilter = (e) => {
    this.setState({ [e.targte.name]: e.target.value });
    this.setState({ buscar: false });
  };

  handledChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleDrawer1 = () => {
    this.setState({ anchor: true });
  };
  toggleDrawer2 = () => {
    this.setState({ anchor: false });
  };

  handleChangePageSize = (event) => {
    this.setState({ pageSize: +event.target.value });
    this.setState({ pageNo: 0 });
  };
  handleChangePagePrev = () => {
    let currentPage = this.state.pageNo;
    let prevPage = currentPage - 1;
    if (currentPage > 0) {
      this.setState({ pageNo: prevPage });
    }
  };
  handleChangePageNext = () => {
    let currentTotalElements = this.state.totalElements;
    let currentPageSize = this.state.pageSize;
    let currentPage = this.state.pageNo;
    let nextPage = currentPage + 1;
    if (currentPage + 1 < currentTotalElements / currentPageSize) {
      this.setState({ pageNo: nextPage });
    }
  };

  getReclamaciones = async () => {
    await this.setState({ waiting: true });
    let query = {};
    query.folioreclamacion = this.state.folioreclamacion;
    query.estatusreclamacion = this.state.estatusreclamacion;
    query.pageNo = 0;
    query.pageSize = 10000000;
    await this.props.actionGetReclamaciones(query);

    function createData(
      folioreclamacion,
      fechareclamacion,
      empresaria,
      tiporeclamacion,
      importe,
      estatusreclamacion
    ) {
      return {
        folioreclamacion,
        fechareclamacion,
        empresaria,
        tiporeclamacion,
        importe,
        estatusreclamacion,
      };
    }
    let apiresponselements = this.props.reclamaciones.content;

    let tableRows = [];
    for (let i = 0; i < apiresponselements.length; i++) {
      let singleRow = createData(
        apiresponselements[i].folioreclamacion,
        apiresponselements[i].fechareclamacion,
        apiresponselements[i].empresaria,
        apiresponselements[i].tiporeclamacion,
        apiresponselements[i].importe,
        apiresponselements[i].estatusreclamacion
      );
      tableRows.push(singleRow);
    }

    await this.setState({ tableData: tableRows });
    await this.setState({ pageNo: 0 });
    await this.setState({
      totalElements: this.props.reclamaciones.totalElements,
    });
    await this.setState({ waiting: false, showResult: true });
    await this.setState({ buscar: true });
  };

  getObtenerCatalogos = async () => {
    await this.setState({ waiting: true });
    let query = {};
    await this.props.actionGetObtenerCatalogos(query);
    console.log(this.props.catalogo);
    await this.setState({ catalogosfetch: true });
    //let apiresponselements = this.props.catalogo.tiposaclaracion;
    //console.log("GETOBTENER"+this.props.catalogo.tiposaclaracion[0].descripciontipo);

    let tableRows = [];
  };

  selectStatus = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () =>
      this.searchByStatus()
    );
  };

  validaEntrada = (event) => {
    const reg = /^[\w\d ]+$/;
    stringify.replace("_");
    if (!reg.test(event.key)) {
      event.preventDefault();
    }
  };

  onPaste = (e) => {
    const str = e.clipboardData.getData("folioreclamacion");
    const newStr = str.replace(/[+-.]/g, "");
    if (str !== newStr) {
      e.preventDefault();
    }
  };

  /*llenaReclamacionDrawer =() =>{
     console.log("test"+this.state.catalogo)
       //console.log("llena reclamacion 1!! " +this.state.catalogo.tiposaclaracion);
 
       return this.state.catalogo.map((c,index,array)=>{
        var indice=c.tiposaclaracion.length
      while (array.indexOf(c)<c.tiposaclaracion.length){
        return (
      <>
      <MenuItem value={c.tiposaclaracion[indice-1].descripciontipo}>${c.tiposaclaracion[indice-1].descripciontipo}</MenuItem>
       </>
          );
      };
      }
          )
      }*/

  render() {
    const { catalogosfetch } = this.state;
    const list = () => (
      <div className="reclamacionDrawer" role="presentation">
        <List style={{ width: "100%" }}>
          <div className="reclamacionDrawerHeader">
            <a
              className="reclamacionDrawerHeaderx"
              onClick={this.toggleDrawer2.bind(this)}
            >
              X
            </a>
            <p>Solicitud de reclamación</p>
          </div>
          <Divider style={{ marginBottom: "30px" }} />
        </List>

        <div className="reclamacionDrawerContainer">
          <MuiThemeProvider theme={theme}>
            <TextField
              style={{ width: "100%" }}
              name="tiporeclamacion"
              id="tipodereclamacion"
              label="Tipo de reclamación"
              variant="outlined"
              select
              value={this.state.tipodereclamacion}
              onChange={this.handledChangeFilter.bind(this)}
            >
              {typeof this.state.catalogo !== `undefined`
                ? this.state.catalogo.map((c, index, array) => {
                    var indice = c.tiposaclaracion.length;

                    return (
                      <MenuItem
                        value={c.tiposaclaracion[indice - 1].descripciontipo}
                      >
                        ${c.tiposaclaracion[indice - 1].descripciontipo}
                      </MenuItem>
                    );
                    /*while (array.indexOf(c)<c.tiposaclaracion.length){

}*/
                  })
                : null}

              {/*<MenuItem value="Deposito a otra empresaria">Deposito a otra empresaria</MenuItem>
              <MenuItem value="Deposito a otra empresaria">Deposito a otra empresaria</MenuItem>
              <MenuItem value="Deposito a otra empresaria">Deposito a otra empresaria</MenuItem>*/}
            </TextField>
          </MuiThemeProvider>
          {JSON.stringify(this.state)}
          guia
          <div className="reclamacionesDrawerInputs">
            <MuiThemeProvider theme={theme}>
              <TextField
                style={{ width: "100%" }}
                name="plaza"
                id="reclamacionesplaza"
                label="Plaza"
                variant="outlined"
                select
                value={this.state.plaza}
                onChange={this.handledChange.bind(this)}
              >
                <Select
                  value={this.state.plaza}
                  onChange={(e) => this.getObtenerCatalogos(e)}
                  input={<OutlinedInput labelWidth={0} name="plaza" />}
                  className="altaUsuario__body__permits__select__comp"
                >
                  <MenuItem value="111" disabled>
                    <em>Seleccionar perfil</em>
                  </MenuItem>
                  {this.state.selectedModuleProfiles.map((val, key) => {
                    console.log(val);
                    return (
                      <MenuItem value={val.catalogo} key={key}>
                        <em> {val.catalogo} </em>
                      </MenuItem>
                    );
                  })}
                </Select>
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
                onChange={this.handledChange.bind(this)}
              />
            </MuiThemeProvider>
          </div>
          <div className="buscarReclamacionContainer">
            <input id="fileUploader" className="inputfile" />
            <label htmlFor="fileUploader">Traer</label>
          </div>
          <div className="reclamacionesDrawersText1">
            <p>Nombre empresaria</p>
            <p>Referencia Bancaria</p>
          </div>
          <div className="reclamacionesDrawersText2">
            <p>{"Maria Guadalupe Lopez Mendoza"}</p>
            <p>{"12341345334"}</p>
          </div>
          <div className="reclamacionesDrawerInputs">
            <div className="reclamacionesFechadelSuceso">
              <ApoloDatePicker
                id="fechasuceso"
                name="fechasuceso"
                label={"Fecha del suceso"}
                value={this.state.fechasuceso}
                onChange={this.handledChange.bind(this)}
                maxDate={fin}
              />
            </div>
            <MuiThemeProvider theme={theme}>
              <TextField
                style={{ width: "100%" }}
                name="producto"
                id="reclamacionesproducto"
                label="Producto"
                variant="outlined"
                select
                value={this.state.producto}
                onChange={this.handledChange.bind(this)}
              >
                <MenuItem value="111-Pago de relación">
                  111-Pago de relación
                </MenuItem>
                <MenuItem value="111-Pago de relación">
                  111-Pago de relación
                </MenuItem>
                <MenuItem value="111-Pago de relación">
                  111-Pago de relación
                </MenuItem>
              </TextField>
            </MuiThemeProvider>
          </div>
          <div className="reclamacionesDrawerInputs">
            <MuiThemeProvider theme={theme}>
              <TextField
                style={{ width: "100%" }}
                name="canaldetransaccion"
                id="reclamacionescanaldetransaccion"
                label="Canal de Transacción"
                variant="outlined"
                select
                value={this.state.canaldetransaccion}
                onChange={this.handledChange.bind(this)}
              >
                <MenuItem value="203 Comercio por internet">
                  203 Comercio por internet
                </MenuItem>
                <MenuItem value="203 Comercio por internet">
                  203 Comercio por internet
                </MenuItem>
                <MenuItem value="203 Comercio por internet">
                  203 Comercio por internet
                </MenuItem>
              </TextField>
            </MuiThemeProvider>
            <MuiThemeProvider theme={theme}>
              <TextField
                style={{ width: "70%", marginLeft: "20px" }}
                name="reportereclamado"
                id="reportereclamado"
                label="Reporte reclamado"
                variant="outlined"
                autoComplete="off"
                value={this.state.reportereclamado}
                onChange={this.handledChange.bind(this)}
              />
            </MuiThemeProvider>
          </div>
          <div className="reclamacionesDrawerInputs">
            <MuiThemeProvider theme={theme}>
              <TextField
                style={{ width: "100%" }}
                name="origenreclamacion"
                id="reclamacionesorigendereclamacion"
                label="Origen de reclamación"
                variant="outlined"
                select
                value={this.state.origenreclamacion}
                onChange={this.handledChange.bind(this)}
              >
                <MenuItem value="701 - Entidad">701 - Entidad</MenuItem>
                <MenuItem value="701 - Entidad">701 - Entidad</MenuItem>
                <MenuItem value="701 - Entidad">701 - Entidad</MenuItem>
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
                value={this.state.folio}
                onChange={this.handleChangeFolio.bind(this)}
              />
            </MuiThemeProvider>
          </div>
          <MuiThemeProvider theme={theme}>
            <TextField
              name="motivoreclamacion"
              id="motivodereclamacion"
              label="Motivo de reclamación"
              variant="outlined"
              select
              value={this.state.motivoreclamacion}
              onChange={this.handledChange.bind(this)}
            >
              <MenuItem value="318 - Error operativo del cliente">
                318 - Error operativo del cliente
              </MenuItem>
              <MenuItem value="390 - Por definir">390 - Por definir</MenuItem>
            </TextField>
          </MuiThemeProvider>
          <div
            className="buscarReclamacionContainer"
            id="reclamacionesUploadFile"
          >
            <input id="fileUploader" className="inputfile" />
            <label htmlFor="fileUploader">
              <PublishIcon />
            </label>
          </div>
          <ApoloButton contained id="buttonSearch" text={"CREAR"} full />
        </div>
      </div>
    );
    return (
      <div className="reclamaciones_pageContainer">
        <div className="reclamaciones_topContainer">
          <div className="reclamaciones_topArea">
            <div className="reclamaciones_title">
              <p>Reclamaciones</p>
            </div>

            <div>
              <React.Fragment key="right">
                <Drawer
                  anchor="right"
                  open={this.state.anchor}
                  onClose={this.toggleDrawer2.bind(this)}
                >
                  {list()}
                </Drawer>
              </React.Fragment>
            </div>

            <div className="reclamaciones_descargarButtonArea">
              <ApoloButton
                contained
                id="buttonSearch"
                className="reclamaciones_button"
                onClick={this.toggleDrawer1.bind(this)}
                full
              >
                <p>+ CREAR SOLICITUD</p>
              </ApoloButton>
            </div>
          </div>
          <div className="reclamaciones_bottomArea">
            <MuiThemeProvider theme={theme}>
              <div className="reclamaciones_textfieldarea2">
                <TextField
                  style={{ width: "100%" }}
                  name="folioreclamaciones"
                  label="Buscar por folio"
                  variant="outlined"
                  autoComplete="off"
                  inputProps={{ maxLength: `20` }}
                  onKeyPress={(event) => {
                    this.validaEntrada(event);
                  }}
                  value={this.state.folio}
                  onChange={this.handleChangeFolio.bind(this)}
                />
              </div>
            </MuiThemeProvider>

            <MuiThemeProvider theme={theme}>
              <div className="reclamaciones_textfieldarea">
                <TextField
                  style={{ width: "100%" }}
                  name="estatusreclamacion"
                  id="estatusreclamacion"
                  label="Estatus"
                  variant="outlined"
                  select
                  value={this.state.estatusreclamacion}
                  onChange={this.handledChangeFilter.bind(this)}
                >
                  <MenuItem value="">Todas</MenuItem>
                  <MenuItem value="CONCLUIDA">Concluida</MenuItem>
                  <MenuItem value="PENDIENTE">Pendiente</MenuItem>
                </TextField>
              </div>
            </MuiThemeProvider>

            <div className="buscarReclamacionContainer">
              <ApoloButton
                contained
                id="buttonSearch"
                text={"Buscar"}
                onClick={this.getReclamaciones.bind(this)}
                full
              />
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <div className="reclamaciones_table">
          {
            this.state.totalElements === 0 ? (
              <div className="reclamaciones_noResultados">
                <p>No se encontraron resultados de la búsqueda.</p>
              </div>
            ) : this.state.totalElements === "-" ? (
              <div className="reclamaciones_noResultados">
                <p>No se encontraron resultados de la búsqueda.</p>
              </div>
            ) : (
              <PaginationTable
                data={this.state.tableData}
                totalElements={this.state.totalElements}
                changePagePrev={this.handleChangePagePrev}
                changePageNext={this.handleChangePageNext}
                changePageSize={this.handleChangePageSize}
                page={this.state.pageNo}
                rowsPerPage={this.state.pageSize}
              />
            )
            /*
            this.state.totalElements === 0 ? (
               <div className="reclamaciones_noResultados">
                 <p>No se han encontrado resultados</p>
               </div>
              ) : this.state.totalElements === '-' ? (
                 <div className="reclamaciones_noResultados">
                   <p></p>
                 </div>
               ) : (
               <PaginationTable 
                 data={this.state.tableData}
                 totalElements={this.props.reclamaciones}
                 changePagePrev={this.handleChangePagePrev}
                 changePageNext={this.handleChangePageNext}
                 changePageSize={this.handleChangePageSize}
                 page={this.state.pageNo}
                 rowsPerPage={this.state.pageSize}
               />
             ) 
             */
          }
        </div>
      </div>
    );
  }
}

Reclamaciones.propTypes = {
  actionGetReclamaciones: PropTypes.func.isRequired,
  actionGetObtenerCatalogos: PropTypes.func.isRequired,
  reclamaciones: PropTypes.any.isRequired,
  permisos: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => {
  return {
    reclamaciones: state.Reclamaciones.reclamaciones,
    catalogo: state.Reclamaciones.catalogo,
    permisos: state.BasePermits.permits,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actionGetReclamaciones: (query) => dispatch(getReclamaciones(query)),
    actionGetObtenerCatalogos: (query) => dispatch(getObtenerCatalogos(query)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  Reclamaciones
);

/*
export default Reclamaciones;
*/
