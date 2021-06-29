import './App.css';
import Addinfo from './Components/Addinfo';
import Header from './Components/Header';
import Searchbar from './Components/Searchbar';
import Table from './Components/Table';
import React, { Component } from 'react';
import Data from './Components/Data.json'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayForm: true,
      Data: [],
      search: ""
    }
  }

  componentWillMount() {
    var tempData = []
    if (localStorage.getItem("userData") === null) {
      console.log(Data)
      localStorage.setItem("userData", JSON.stringify(Data))
    }
    else {
      tempData = JSON.parse(localStorage.getItem("userData"))
    }
    this.setState({
      Data: tempData
    });
  }

  formChange = () => {
    this.setState({
      displayForm: !this.state.displayForm
    });
  }
  searching = (dl) => {
    this.setState({
      search: dl
    });
  }
  editsearch = (str) => {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, ' ');

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');

    // return
    str = str.toLowerCase()
    return str;
  }
  receiveData = (id, name, tel, Permission) => {
    var item = {
      id: id,
      name: name,
      tel: tel,
      Permission: parseInt(Permission, 20)
    }
    var items = this.state.Data
    items.push(item)
    this.setState(
      {
        Data: items
      });
    localStorage.setItem("userData", JSON.stringify(items))
  }
  checkConnectTable = (id, name, tel, Permission) => {
    var tempData = this.state.Data
    var length = tempData.length
    var editData = {
      id: id,
      name: name,
      tel: tel,
      Permission: parseInt(Permission, 20)
    }
    for (var i = 0; i < length; i++) {
      if (id === tempData[i].id) {
        tempData.splice(i, 1, editData)
      }
    }
    this.setState(
      {
        Data: tempData
      }
    );
    localStorage.setItem("userData", JSON.stringify(tempData))

  }
  deleteUser = (deleteValue) => {
    var tempData = this.state.Data.filter((item) => item.id !== deleteValue.id)
    this.setState({
      Data: tempData
    });
    localStorage.setItem("userData", JSON.stringify(tempData))

  }
  render() {

    var searchData = []
    this.state.Data.forEach((item) => {
      if (this.editsearch(item.name).indexOf(this.editsearch(this.state.search)) !== -1) {
        searchData.push(item)
      }

    })

    return (
      <div>
        <Header />
        <Searchbar displayForm={this.state.displayForm} eventBtn={(dl) => this.formChange(dl)} eventSearching={(dl) => this.searching(dl)} />
        <div className="container">
          <div className="row">
            <Table dataUsers={searchData} appConnectTable={(id, name, tel, Permission) => this.checkConnectTable(id, name, tel, Permission)} deleteFun={(deleteValue) => this.deleteUser(deleteValue)} />
            <Addinfo displayForm={this.state.displayForm} sentData={(id, name, tel, Permission) => this.receiveData(id, name, tel, Permission)} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;