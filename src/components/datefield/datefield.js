import React, { Component } from 'react'; 
import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import * as moment from 'moment';

class DateField extends Component {
  constructor() {
    super();
    this.state = {
      DateVal : moment()
    }
  }

  componentDidMount() {
    if(this.props.value) {
      this.setState({
        ...this.state,
        DateVal : moment(this.props.value)
      })
    }
  }
  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.value && nextProps.value !== prevState.DateVal) {
      return { DateVal : moment(nextProps.value) };
    }
    return null;
  }
  
  DateSelected = (e) => {
    this.props.onApply(e.target.value)
  }

  onApply = (event, picker) => {
    
    this.props.onValueChange(this.props.dataid, this.props.dataKey, moment(picker.startDate).toISOString(true))
    
  }

  render() {
    const { DateVal } = this.state;
    return (

      <div className="input-group input-group-sm mb-2" >
        
        <span className="input-group-append">
          <DateRangePicker startDate={moment(DateVal)} singleDatePicker onApply={this.onApply} autoApply opens={'left'} drops={'auto'} >
            <input type="text" className="form-control" placeholder="Date..." value={moment(DateVal).format('DD-MM-YYYY')} onChange={this.setDateVal} readOnly />
          </DateRangePicker>
        </span>
      </div>

    )
  }
}

export default DateField