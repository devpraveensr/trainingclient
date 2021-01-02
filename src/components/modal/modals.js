import React, { Component } from 'react'; 
import { Modal } from 'react-bootstrap';

class Modals extends Component {
  constructor() {
    super();
    this.state = {
      showState : false,
      view :''
    }
  }
  componentWillMount() {
    this.setState({
      ...this.state,
      view: this.props.view
    })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      view: nextProps.view
    })
  }

  modalClose = () => {
    this.props.onHide()
  }

  render() {
    const { view } = this.state;
    let content;
    return (

      <Modal animation={false} show={this.props.show} onHide={this.props.onHide} size="md" aria-labelledby="contained-modal-title-vcenter" backdrop={true} centered >
        { view }
      </Modal>
    )
  }
}

export default Modals