import React, { Component } from 'react'; 
import { Row, Col } from 'react-bootstrap';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css';
require('datatables.net');


class DataTable extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      data: [],
      actionsField: false
    }
  }

  componentWillMount() {
    this.setState({
      ...this.state,
      fields: this.props.fields,
      data: this.props.data,
      actionsField: this.props.actionsField ? this.props.actionsField : false
    })
  }

  componentDidMount() {
    
    this.$el = $(this.el);
    this.$el.DataTable();
    
  }

  componentWillUnmount() {
      this.$el.DataTable().destroy(true);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== this.props.data) {
      this.$el.DataTable().destroy();
    }
    
    this.setState({
      ...this.state,
      fields: nextProps.fields,
      data: nextProps.data,
      actionsField: nextProps.actionsField ? nextProps.actionsField : false
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.state.data !== prevState.data) {
      this.$el.DataTable()
    }
  }

  render() {
    const { fields, data, actionsField } = this.state;
    let columnHeader = fields.length ? (
      fields.map((col, i) => {
        return(
          <th key={col}>
            {col}
          </th>
        )
      })
    ) : ([])
    let bodyData = data.length ? (
      data.map((dt, i) => {
        let dataFld = Object.keys(dt)
        let dtActions = {};
        if(dataFld.length) {
          dataFld.forEach(dtfl => {
            dtActions[dtfl] = [];
          })
        }
        
        if(actionsField) {
           dataFld.forEach(fld => {
              dtActions[fld] = Array.isArray(dt[fld]) ? (
                dt[fld].map(act => {
                  if(act.display === 'label') {
                    return (
                      <span className={`badgedData ${act.status} `} key={`${dt[act.id]}`}>{ act.text }</span>
                    )
                  } else if(act.display === 'button') {
                    return (
                      <span className={`btn btn-sm mr-1 ${act.status}`} onClick={act.onclick} key={`${dt[act.id]}${act.type}`}>
                        <i className={`${act.icon} `}></i> { act.text }
                      </span>
                    )
                  }
                  
                })
                
                
              ) : ('')
           })
        }
       
        let cells = dataFld.length ? (
          fields.map(fl => {
            if(dataFld.indexOf(fl) > -1) {
              if(Array.isArray(dt[fl])) {
                return <td className="text-left" key={`${i}${fl}`}>{ dtActions[fl] }</td>
              } else {
                return <td className="text-left"  key={`${i}${fl}`}>{ dt[`${fl}`] }</td>
              }
            } else {
              return <td className="text-left"  key={`${i}${fl}`}></td>
            }
             
          })
        ) : (
          <td colSpan={columnHeader.length} className="text-center"> No Data Found</td>
        )

        return(
          <tr key={`${i}${dt.Name}`}>
            { cells }
          </tr>
        )
      })
    ) : ([])
    
    return(
        
      columnHeader.length ? (
        <table className="table table-bordered small" ref={el => this.el = el}>
        <thead>
          <tr>
            { columnHeader }
          </tr>
        </thead>
        <tbody>
          { bodyData }
        </tbody>
      </table>
      ) : ('')
        
          
        
    )
  }

}



export default DataTable