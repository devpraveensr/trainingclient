import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import ContentHeader from '../components/header/content-header';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return(
      <section className="content">
        <ContentHeader title={`Settings`} />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Title</h3>

                  <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                      <i className="fas fa-minus"></i></button>
                    <button type="button" className="btn btn-tool" data-card-widget="remove" data-toggle="tooltip" title="Remove">
                      <i className="fas fa-times"></i></button>
                  </div>
                </div>
                <div className="card-body">
                  Start creating your amazing application!
                </div>
                <div className="card-footer">
                  Footer
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Settings