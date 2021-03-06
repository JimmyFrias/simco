import React, { Component } from 'react';

import PublishIcon from '@material-ui/icons/Publish';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
// import compose from 'recompose/compose';
// import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { ApoloDatePicker, ApoloButton } from 'dsmapolo-react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import moment from 'moment';
import '../styles/custom.css';

import  '../styles/reclamaciones.css';
import PaginationTable from './PaginationTableReclamaciones.js';
import { getReclamaciones, getObtenerCatalogos } from '../reclamaciones/actions';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { stringify } from 'querystring';

const fin = moment().format('DD/MM/YYYY');

const theme = createMuiTheme({
  palette: {
    primary: {main: '#00AC68'},
  },
  overrides: {
    MuiFormControl: {
      root: {
        height: '80px',
      },
    },
    MuiInputBase: {
      root: {
        height: '49px',
      },
    },
  },
});

export class Reclamaciones extends Component {

  constructor(props) {
      super(props);
      this.handleChangePageSize = this.handleChangePageSize.bind(this);
      this.handleChangePagePrev= this.handleChangePagePrev.bind(this);
      this.handleChangePageNext= this.handleChangePageNext.bind(this);
      this.handledChange= this.handledChange.bind(this);
      //this.llenaReclamacionDrawer=this.llenaReclamacionDrawer.bind(this);
      
      this.state = {
        folioreclamacion: '',
        fechareclamacion: '',
        tiporeclamacion: '',
        tipodereclamacion: '',
        importe: '',
        estatusreclamacion: '',
        empresaria: '',  
        plaza: 0,
        selectedModuleProfiles: [],
        claveempresaria: '',
        fechasuceso: '',
        producto: '',
        canaldetransaccion: '',
        reportereclamado: '',
        origenreclamacion: '',
        motivoreclamacion: '',
        totalElements: '-',
        tableData: '',
        pageNo: 0,
        pageSize: 10,
        waiting: false,
        showResult: false,
        buscar: false,
        right: false,
        anchor: false,
        catalogosfetch:false
      };
  }
  componentDidMount() {
    this.getReclamaciones();
   this.getObtenerCatalogos();
 
}

  handleChangeFolio = (e) => {
    const value=e.target.value;
      const re =/[^A-Za-z0-9]*$/;

  if (value === '' || re.test(value)) {
   this.setState({folioreclamacion: e.target.value.substr(0,19)});
  }
    this.setState({buscar: false});
  }
  handleChangeFechaReclamacion = (e) => {
    this.setState({fechareclamacion: e});
    this.setState({buscar: false});
  }
  handleChangeTipodeReclamacion = (e) => {
    this.setState({tiporeclamacion: e.target.value});
    this.setState({buscar: false});
  }
  handleChangeImporte= (e) => {
    this.setState({importe: e.target.value});
    this.setState({buscar: false});
  }
  handleChangeStatus = (e) => {
    this.setState({estatusreclamacion: e.target.value});
    this.setState({buscar: false});
  }
  handleChangeempresaria = (e) => {
    this.setState({empresaria: e.target.value});
    this.setState({buscar: false});
  }
  
  handledChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleChangePlaza = (e) => {
    this.setState({plaza: e.target.value});
  }
  handleChangeClaveEmpresaria = (e) => {
    this.setState({claveempresaria: e.target.value});
  }
  handleChangeFechaSuceso = (e) => {
    this.setState({fechasuceso: e.target.value});
  }
  handleChangeProducto = (e) => {
    this.setState({producto: e.target.value});
  }
  handleChangeCanaldeTransaccion = (e) => {
    this.setState({canaldetransaccion: e.target.value});
  }
  handleChangeReporteReclamado = (e) => {
    this.setState({reportereclamado: e.target.value});
  }
  handleChangeOrigenReclamacion = (e) => {
    this.setState({origenreclamacion: e.target.value});
  }
  handleChangeMotivoReclamacion = (e) => {
    this.setState({motivoreclamacion: e.target.value});
  }


  toggleDrawer1 = () => {
    this.setState({anchor: true});
  };
  toggleDrawer2 = () => {
    this.setState({anchor: false});
  };

  

  handleChangePageSize = (event) => {
    this.setState({pageSize:  +event.target.value});
    this.setState({pageNo:  0});
  };
  handleChangePagePrev = () => {
    let currentPage = this.state.pageNo;
    let prevPage = currentPage -1;
    if(currentPage > 0) {
      this.setState({pageNo: prevPage});
    }
  };
  handleChangePageNext = () => {
    let currentTotalElements = this.state.totalElements;
    let currentPageSize = this.state.pageSize;
    let currentPage = this.state.pageNo;
    let nextPage = currentPage + 1;
    if (currentPage +1 < (currentTotalElements/currentPageSize)) {
      this.setState({pageNo: nextPage});
    }
  };

  getReclamaciones = async () => {
    await this.setState({waiting: true});
     let query={};
     query.folioreclamacion = this.state.folioreclamacion;
     query.estatusreclamacion = this.state.estatusreclamacion;
     query.pageNo = 0;
     query.pageSize = 10000000;
     await this.props.actionGetReclamaciones(query);
    
    function createData(folioreclamacion, fechareclamacion, empresaria, tiporeclamacion, importe, estatusreclamacion) {
      return { folioreclamacion, fechareclamacion, empresaria, tiporeclamacion, importe, estatusreclamacion };
    }
    let apiresponselements = this.props.reclamaciones.content;
    

    let tableRows = [];
    for (let i=0; i < apiresponselements.length; i++) {
      let singleRow = createData(apiresponselements[i].folioreclamacion, apiresponselements[i].fechareclamacion, apiresponselements[i].empresaria, apiresponselements[i].tiporeclamacion, apiresponselements[i].importe, apiresponselements[i].estatusreclamacion);
      tableRows.push(singleRow);
    }
    
    await this.setState({tableData: tableRows});
    await this.setState({pageNo: 0});
    await this.setState({totalElements: this.props.reclamaciones.totalElements});
    await this.setState({waiting: false, showResult: true,});
    await this.setState({buscar: true});
  }

  getObtenerCatalogos = async () => {
    await this.setState({waiting: true});
    let query={};
    await this.props.actionGetObtenerCatalogos(query);
    console.log(this.props.catalogo);
     await this.setState({catalogosfetch:true});
    //let apiresponselements = this.props.catalogo.tiposaclaracion;
    //console.log("GETOBTENER"+this.props.catalogo.tiposaclaracion[0].descripciontipo);
     
   
    let tableRows = [];


  }

  selectStatus = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => this.searchByStatus());
  };


  validaEntrada = (event) => {
    const reg = /^[\w\d ]+$/;
    stringify.replace('_');
    if(!reg.test(event.key)) {
      event.preventDefault();
    }
  }

  onPaste = (e) => {
    const str = e.clipboardData.getData('folioreclamacion');
    const newStr = str.replace(/[+-.]/g, '');
    if (str !== newStr) {
      e.preventDefault();
    }
  }
  
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
    const {catalogosfetch} = this.state;
    const list = () => (
      
        <div
        className="reclamacionDrawer"
        role="presentation"
      >
        <List style={{width: '100%'}}>
          <div className="reclamacionDrawerHeader">
            <a className="reclamacionDrawerHeaderx" onClick={this.toggleDrawer2.bind(this)}>X</a><p>Solicitud de reclamaci??n</p>
          </div>
          <Divider style={{marginBottom: '30px'}} />
        </List>

        
        <div className="reclamacionDrawerContainer">
          <MuiThemeProvider theme={theme}>
            <TextField
              style= {{ width: '100%'}}
              name="tipodereclamacion"
              id="tipodereclamacion"
              label="Tipo de reclamaci??n"
              variant="outlined"
              select
              value={this.state.tipodereclamacion}
              onChange={this.handleChangeTipodeReclamacion.bind(this)}
            >
             
             {typeof this.state.catalogo !==`undefined` ?this.state.catalogo.map((c,index,array)=>{
var indice=c.tiposaclaracion.length

return <MenuItem value={c.tiposaclaracion[indice-1].descripciontipo}>${c.tiposaclaracion[indice-1].descripciontipo}</MenuItem>
/*while (array.indexOf(c)<c.tiposaclaracion.length){

}*/
             }):null}
           
          
            
              
              {/*<MenuItem value="Deposito a otra empresaria">Deposito a otra empresaria</MenuItem>
              <MenuItem value="Deposito a otra empresaria">Deposito a otra empresaria</MenuItem>
              <MenuItem value="Deposito a otra empresaria">Deposito a otra empresaria</MenuItem>*/}
            
            </TextField>
          </MuiThemeProvider>
          {
                    JSON.stringify(this.state) 
                  }
                  guia
          <div className="reclamacionesDrawerInputs">
            <MuiThemeProvider theme={theme}>
                <TextField
                  style= {{ width: '100%'}} 
                  name="plaza"
                  id="reclamacionesplaza"
                  label="Plaza"
                  variant="outlined"
                  select
                  value={this.state.plaza}
                  onChange={this.handledChange.bind(this)}
                >
                  
                 <Select value={this.state.plaza} onChange={e => this.getObtenerCatalogos(e)} input={<OutlinedInput labelWidth={0} name="plaza" />} className="altaUsuario__body__permits__select__comp">
												<MenuItem value="111" disabled><em>Seleccionar perfil</em></MenuItem>
												{this.state.selectedModuleProfiles.map((val, key) => {
                          console.log(val);
													return <MenuItem value={val.catalogo} key={key}><em> {val.catalogo} </em></MenuItem>;
												})}
											</Select>
                     
                </TextField>
            </MuiThemeProvider>
            <MuiThemeProvider theme={theme}>
              <TextField
                style= {{ width: '70%', marginLeft: '20px'}} 
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

          <div className="buscarReclamacionContainer">
              <input
                id="fileUploader"
                className="inputfile"
              />
              <label htmlFor="fileUploader">
                Traer
              </label>
            </div>


          <div className="reclamacionesDrawersText1">
            <p>Nombre empresaria</p><p>Referencia Bancaria</p>
          </div>
          <div className="reclamacionesDrawersText2">
            <p>{'Maria Guadalupe Lopez Mendoza'}</p><p>{'12341345334'}</p>
          </div>

          <div className="reclamacionesDrawerInputs">
            <div className="reclamacionesFechadelSuceso">
              <ApoloDatePicker
                id='fechasuceso'
                name='fechasuceso'
                label={ 'Fecha del suceso' }
                value={this.state.fechasuceso}
                onChange={this.handleChangeFechaSuceso.bind(this)}
                maxDate={fin}
              />
            </div>
            <MuiThemeProvider theme={theme}>
              <TextField
                style= {{ width: '100%'}} 
                name="reclamacionesproducto"
                id="reclamacionesproducto"
                label="Producto"
                variant="outlined"
                select
                value={this.state.producto}
                onChange={this.handleChangeProducto.bind(this)}
              >
                <MenuItem value="111-Pago de relaci??n">111-Pago de relaci??n</MenuItem>
                <MenuItem value="111-Pago de relaci??n">111-Pago de relaci??n</MenuItem>
                <MenuItem value="111-Pago de relaci??n">111-Pago de relaci??n</MenuItem>
              </TextField>
            </MuiThemeProvider>
          </div>
          <div className="reclamacionesDrawerInputs">
            <MuiThemeProvider theme={theme}>
                <TextField
                  style= {{ width: '100%'}} 
                  name="reclamacionescanaldetransaccion"
                  id="reclamacionescanaldetransaccion"
                  label="Canal de Transacci??n"
                  variant="outlined"
                  select
                  value={this.state.canaldetransaccion}
                  onChange={this.handleChangeCanaldeTransaccion.bind(this)}
                >
                  <MenuItem value="203 Comercio por internet">203 Comercio por internet</MenuItem>
                  <MenuItem value="203 Comercio por internet">203 Comercio por internet</MenuItem>
                  <MenuItem value="203 Comercio por internet">203 Comercio por internet</MenuItem>
                </TextField>
            </MuiThemeProvider>
            <MuiThemeProvider theme={theme}>
              <TextField
                style= {{ width: '70%', marginLeft: '20px'}} 
                name="reclamacionesimportereclamado"
                id="reportereclamado"
                label="Reporte reclamado"
                variant="outlined"
                autoComplete="off"
                value={this.state.reportereclamado}
                onChange={this.handleChangeReporteReclamado.bind(this)} 
              />
          </MuiThemeProvider>
          </div>
          <div className="reclamacionesDrawerInputs">
            <MuiThemeProvider theme={theme}>
                <TextField
                  style= {{ width: '100%'}} 
                  name="reclamacionesorigendereclamacion"
                  id="reclamacionesorigendereclamacion"
                  label="Origen de reclamaci??n"
                  variant="outlined"
                  select
                  value={this.state.origenreclamacion}
                  onChange={this.handleChangeOrigenReclamacion.bind(this)}
                >
                  <MenuItem value="701 - Entidad">701 - Entidad</MenuItem>
                  <MenuItem value="701 - Entidad">701 - Entidad</MenuItem>
                  <MenuItem value="701 - Entidad">701 - Entidad</MenuItem>
                </TextField>
            </MuiThemeProvider>
            <MuiThemeProvider theme={theme}>
              <TextField
                style= {{ width: '70%', marginLeft: '20px'}} 
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
              name="motivodereclamacion"
              id="motivodereclamacion"
              label="Motivo de reclamaci??n"
              variant="outlined"
              select
              value={this.state.motivoreclamacion}
              onChange={this.handleChangeMotivoReclamacion.bind(this)}
            >
              <MenuItem value="318 - Error operativo del cliente">318 - Error operativo del cliente</MenuItem>
              <MenuItem value="390 - Por definir">390 - Por definir</MenuItem>
            </TextField>
          </MuiThemeProvider>

          <div className="buscarReclamacionContainer" id="reclamacionesUploadFile">
            <input
              id="fileUploader"
              className="inputfile"
            />
            <label htmlFor="fileUploader">
              <PublishIcon />
            </label>
          </div>

          <ApoloButton contained
            id='buttonSearch'
            text={'CREAR'}
            full
          />
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
                <React.Fragment key='right'>
                  <Drawer anchor='right' open={this.state.anchor} onClose={this.toggleDrawer2.bind(this)}>
                    {list()}
                  </Drawer>
                </React.Fragment>
            </div>

            <div className="reclamaciones_descargarButtonArea">
              <ApoloButton contained
                id='buttonSearch'
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
                  style= {{ width: '100%'}} 
                  name="folioreclamaciones"
                  label="Buscar por folio"
                  variant="outlined"
                  autoComplete="off"
                  inputProps={{maxLength:`20`}}
                  onKeyPress={(event) => { this.validaEntrada(event); }}
                  value={this.state.folio}
                  onChange={this.handleChangeFolio.bind(this)}
                />

              </div>
            </MuiThemeProvider>
            
            <MuiThemeProvider theme={theme}>
              <div className="reclamaciones_textfieldarea">
                <TextField
                  style= {{ width: '100%'}} 
                  name="estatusreclamacion"
                  id="estatusreclamacion"
                  label="Estatus"
                  variant="outlined"
                  select
                  value={this.state.estatusreclamacion}
                  onChange={this.handleChangeStatus.bind(this)}
                >
                  <MenuItem value="">Todas</MenuItem>
                  <MenuItem value="CONCLUIDA">Concluida</MenuItem>
                  <MenuItem value="PENDIENTE">Pendiente</MenuItem>
                </TextField>
              </div>
            </MuiThemeProvider>
            
            <div className="buscarReclamacionContainer">
              
              
              <ApoloButton contained
                id='buttonSearch'
                text={'Buscar'}
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
            <p>No se encontraron resultados de la b??squeda.</p>
          </div>
         ) : this.state.totalElements === '-' ? (
            <div className="reclamaciones_noResultados">
              <p>No se encontraron resultados de la b??squeda.</p>
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

const mapStateToProps = state => {
   return {
    reclamaciones: state.Reclamaciones.reclamaciones,
    catalogo: state.Reclamaciones.catalogo,
    permisos: state.BasePermits.permits
  };
};

const mapDispatchToProps = dispatch => {
   return {
    actionGetReclamaciones: (query) => dispatch(getReclamaciones(query)),
    actionGetObtenerCatalogos: (query) => dispatch(getObtenerCatalogos(query)),
   };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Reclamaciones);

/*
export default Reclamaciones;
*/
