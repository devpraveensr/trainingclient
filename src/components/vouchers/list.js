import React, { Component } from 'react'; 
import { Row, Col } from 'react-bootstrap';
import DataTable from '../datatable/dtable';


class List extends Component {
  constructor(props) {
    super();
    this.state = {
      titles: props.titles,
      data: props.data
    }
    
  }
  
  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.data.length !== prevState.data.length){
      return {data : nextProps.data};
    }
    if(nextProps.titles !== prevState.tiles){
      return {tiles : nextProps.tiles};
    }
    else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data.length !== this.props.data.length || prevProps.titles !== this.props.titles) {
      this.setState({
        ...this.state,
        data: this.props.data,
        titles: this.props.titles
      })
    }
  }

  render() {
    const { titles, data } = this.state;
    
    
    let tableFields = titles;
    let tableData = data.length ? (
      data.map((dt, dtIndex) => {
        let dataObj = {};
        tableFields.forEach(fld => {
          switch(fld) {
            case '#':
              dataObj[`${fld}`] = dtIndex+1;
              break;
            case 'Action':
              let Actions = Object.keys(this.props.Actions);
              if(Actions.length) {
                dataObj[`${fld}`] = Actions.map(Action => {
                  let actionProps = this.props.Actions[Action].actionProps;
                  let newActionProp = {...actionProps, onclick: () => {this.props.Actions[Action].action(actionProps.type, dtIndex, `${dt.id}`)}}
                  return newActionProp
                })
              }
              break;
            default:
              
              dataObj[`${fld}`] = dt[`${fld.toLowerCase().split(' ').join('_')}`];
              break;
          }
          
        })
        return (dataObj)
        
      })
    ) : ([])
    return(
      <Row>
        <Col lg={12} sm={12} xs={12} md={12} xl={12} >
          <DataTable fields={tableFields} data={tableData} actionsField={true} />
        </Col>
      </Row>
    )
  }
}



export default List