import React, { Component } from 'react';
const { v1: uuidv1 } = require('uuid');
 
class Addinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      tel: "",
      Permission: ""
    }
  }
  addUser = (e) => {
    var name = e.target.name
    var value = e.target.value
    this.setState({
      [name]: value
    });
  }
  submitUser = (e) => {
    if ((this.state.name !== "" && this.state.tel !== "") && this.state.Permission !== "") {
      var id = uuidv1()
      var name = this.state.name
      var tel = this.state.tel
      var permisssion = this.state.Permission
      this.props.sentData(id,name,tel,permisssion)
    }
  }

  hienthiForm = () => {

    if (this.props.displayForm === false) {
      return (
        <div className="col">
          <div className="card">
            <div className="card-header">
              <h4>Thêm thông tin</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <input type="text" className="form-control" name="name" placeholder="Nhập tên ở đây" onChange={(e) => this.addUser(e)} />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" name="tel" placeholder="Nhập số điện thoại ở đây" onChange={(e) => this.addUser(e)} />
                </div>
                <div className="form-group">
                  <div className="form-group">
                    <select className="custom-select" name="Permission" onChange={(e) => this.addUser(e)}>
                      <option hidden value="">Phân quyền</option>
                      <option value="1">Admin</option>
                      <option value="2">Moderate</option>
                      <option value="3">Member</option>
                    </select>
                  </div>
                </div>
                <input type="reset" className="btn btn-primary btn-block" onClick={(e) => this.submitUser(e)} value="Submit"/>
              </form>
            </div>
          </div>
        </div>

      )
    }
  }
  render() {
    return (
      <div>        {this.hienthiForm()}
      </div>
    );
  }
}

export default Addinfo;
