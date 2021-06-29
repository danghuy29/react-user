import React, { Component, Fragment } from 'react';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editUser: false,
        }
    }
    editUser = (e) => {
        var tempPermission=0
        if(this.props.Permission==="Admin"){
            tempPermission=1
        }else if(this.props.Permission==="Moderator"){
            tempPermission=2
        }else{
            tempPermission=3
        }
        this.setState({
            editUser: !this.state.editUser,
            name: this.props.name,
            tel: this.props.tel,
            Permission:tempPermission
        });

    }
    handleSubmit = () => {
        this.setState({
            editUser: !this.state.editUser
        });

        var id = this.props.dataId
        var name = this.state.name
        var tel = this.state.tel
        var Permission = this.state.Permission
        this.props.tableConnectUser(id, name, tel, Permission)
    }
    handleDelete = ()=>{
        var deleteValue ={
            id:this.props.dataId,
            name:this.props.name,
            tel:this.props.tel,
            Permission:this.props.Permission,
        }
   
        this.props.deleteFun(deleteValue)
    }
    editChange = (e) => {

        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]: value
        });
    }
    renderUser = () => {
        if (this.state.editUser === false) {
            return (
                <Fragment>
                    <td >{this.props.id}</td>
                    <td>{this.props.name}</td>
                    <td>{this.props.tel}</td>
                    <td>{this.props.Permission}</td>
                    <td>
                        <div className="btn-group">
                            <button type="button" className="btn btn-primary" onClick={(e) => this.editUser(e)}><i className="fa fa-edit" />Sửa</button>
                            <button type="button" className="btn btn-danger" onClick={ () =>{this.handleDelete()}}><i className="fa fa-trash-o" aria-hidden="true"  />Xóa</button>
                        </div>
                    </td>
                </Fragment>
            )
        }
        else {
            return (
                <Fragment>
                    <td >{this.props.id}
                    </td>
                    <td>
                        <input type="text" defaultValue={this.props.name} className="form-control" name="name" onChange={(e) => this.editChange(e)} />
                    </td>
                    <td> <input type="text" defaultValue={this.props.tel} className="form-control" name="tel" onChange={(e) => this.editChange(e)} /></td>
                    <td>
                        <select className="custom-select" name="Permission" onChange={(e) => this.editChange(e)} >
                            <option hidden value="">{this.props.Permission}</option>
                            <option value="1">Admin</option>
                            <option value="2">Moderate</option>
                            <option value="3">Member</option>
                        </select>
                    </td>
                    <td>
                        <div className="btn-group">
                            <button type="button" className="btn btn-primary" onClick={(e) => this.handleSubmit(e)}><i className="fa fa-edit" />submit</button>

                        </div>
                    </td>
                </Fragment>
            )
        }
    }
    render() {
        return (

            <tr>
                {this.renderUser()}

            </tr>


        );
    }
}

export default User;