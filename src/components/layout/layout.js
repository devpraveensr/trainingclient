import React, { Component } from 'react'; 
import Navbar from '../navbar/navbar';
import Sidebar from '../sidebar/sidebar';
import Footer from '../footer/footer';
import Modals from '../modal/modals';


class AppLayout extends Component {
  constructor() {
    super();
    this.state = {
      modalShow : false,
      modalContent: '',
      modalTag: '',
    }
  }

 
  redirect = (target) => {
    this.props.history.push(`${target}`);
  }

  logout = () => {
    window.localStorage.removeItem('traininglogindata')
    window.location.reload()
  }

  modalClose = () => {
    this.setState({ 
      ...this.state, 
      modalShow: false,
      modalContent: '',
      modalTag: ''
    })
  }
  modalShow = (contentview, contentTag) => {
    this.setState({ 
      ...this.state, 
      modalShow: true,
      modalContent: contentview,
      modalTag: contentTag
    })
  }

  render() {
    const { children } = this.props;
    const { modalShow, modalContent, modalTag } = this.state;
    let childView;
    React.Children.forEach(children, element => {
      if(!React.isValidElement(element)) return
      switch(this.props.location.pathname) {
        default:
          childView = React.cloneElement(element, {settings : this.props.settings, history: this.props.history, modalShow: this.modalShow, modalHide: this.modalClose});
          break;
      }
      
    })
    return(
      <div className="wrapper">
        <Navbar />
        <Sidebar menu={this.props.settings.menu} location={this.props.history.location} redirect={this.redirect} logout={this.logout} />
        <div className="content-wrapper">
          { childView }
        </div>
        <Footer />
        <aside className="control-sidebar control-sidebar-dark"></aside>
        <Modals show={modalShow} onHide={this.modalClose} view={modalContent} tag={modalTag}  />
      </div>
    )
  }
}

export default AppLayout