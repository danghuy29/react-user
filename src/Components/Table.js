import React, { Component } from 'react';
import User from './User';


class Table extends Component {
       //this.props.deleteFun
    render() {
        var userPermision = ""
        return (
            <div className="col">
                <table className="table table-striped table-hover">
                    <thead className="thead-inverse">
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Số điện thoại</th>
                            <th>Quyền</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.dataUsers.map((item,key) => {
                            if (item.Permission === 1) { userPermision = "Admin" }
                            else if (item.Permission === 2) { userPermision = "Moderator" }
                            else { userPermision = "Member" }
                            return (
                                <User id={key+1} name={item.name} tel={item.tel} Permission={userPermision} key={key} tableConnectUser={(id,name,tel,Permission)=>this.props.appConnectTable(id,name,tel,Permission)} deleteFun={(deleteValue)=>this.props.deleteFun(deleteValue)}
                                dataId={item.id}/>
                            )
                        })}
                    </tbody>
                </table>
              
               
            </div>
            
        );
    }
}
export default Table;