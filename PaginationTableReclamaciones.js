
import React, { Component } from 'react';


import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MaterialIcon from '@material/react-material-icon';
import IconButton from '@material/react-icon-button';

import PropTypes from 'prop-types';


export class PaginationTable extends Component {

  constructor(props) {
      super(props);
  }

  render() {

    const changePagePrev = this.props.changePagePrev;
    const changePageNext = this.props.changePageNext;
    const changePageSize = this.props.changePageSize;
    const page = this.props.page;
    const rowsPerPage = this.props.rowsPerPage;
    let totalElements = this.props.totalElements;
    let rows2 = this.props.data;

    const columns = [
      { id: 'folioreclamacion', label: 'Folio de reclamación' },
      { id: 'fechareclamacion', label: 'Fecha de reclamación' },
      { id: 'empresaria', label: 'Empresaria' },
      { id: 'tiporeclamacion', label: 'Tipo de reclamación' },
      { id: 'importe', label: 'Importe' },
      { id: 'estatusreclamacion', label: 'Estatus' }
    ];

    let fromElement = page * rowsPerPage + 1;
    let toElement = (page +1) * rowsPerPage;
    if (toElement > totalElements) {
      toElement = totalElements;
    }

    return (

      <Paper >
  
          <Table aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column,index) => (
                  <TableCell
                    className='reclamaciones_paginationTable'
                    key={index}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows2.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                    {columns.map((column,index) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={index} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <div className='apolo-table-footer'>
            <div>
              <span>Filas por páginas</span>
              <select className='apolo-table-foot-select' onChange={changePageSize} defaultValue={rowsPerPage}>
                <option key={10} value={10}>10</option>
                <option key={25} value={25} >25</option>
                <option key={100} value={100}>100</option>
              </select>
              <label> {fromElement} - {toElement} </label> <span style={{padding:5}}> {' de '} </span> <label> {totalElements} </label>
              <span className=''>
                <IconButton onClick={changePagePrev} > <MaterialIcon icon='keyboard_arrow_left' /></IconButton>
                <IconButton onClick={changePageNext} > <MaterialIcon icon='keyboard_arrow_right' /></IconButton>
            </span>
            </div>
          </div>
        
      </Paper>
    );
  }
}


PaginationTable.propTypes = {
  data: PropTypes.any.isRequired,
  totalElements: PropTypes.any.isRequired,
  changePagePrev: PropTypes.func.isRequired,
  changePageNext: PropTypes.func.isRequired,
  changePageSize: PropTypes.func.isRequired,
  page: PropTypes.any.isRequired,
  rowsPerPage: PropTypes.any.isRequired
};

  export default PaginationTable;
