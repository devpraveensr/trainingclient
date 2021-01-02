import React from 'react'; 
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

const ContentHeader = ({title, buttonclick}) => {
  return (
    <section className="content-header padtb-l-2-0">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <h4 className="mb-0">{ title }</h4>
          </div>
          {/* <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item"><a href="#">Layout</a></li>
              <li className="breadcrumb-item active">Fixed Layout</li>
            </ol>
          </div> */}
          <Col lg={6} sm={6} xs={6} md={6} xl={6} className="text-right">
            <a className={`btn btn-primary lh-1 ${typeof buttonclick === "undefined" && 'nodisp'}`} onClick={() => buttonclick('add')} >
              <i className="fa fa-plus"></i> Add { title }
            </a>
          </Col>
        </div>
      </div>
    </section>
  )
}

export default ContentHeader