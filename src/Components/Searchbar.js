import React, { Component } from 'react';

class Searchbar extends Component {
     constructor(props) {
         super(props);
         this.state={
             tempValue:""
         }
     }
    displayBtn() {
        if (this.props.displayForm ===true) {
            return (
                <div className="btn btn-outline-primary btn-block  mt-2 mb-2" onClick={() => this.props.eventBtn()} >Thêm mới</div>
            )
        }
        else {
            return (
                <div className="btn btn-outline-secondary btn-block mt-2 mb-2" onClick={() => this.props.eventBtn()}>Đóng lại</div>
            )
        }
    }
    isChange=(event)=>{
        this.setState({
            tempValue:event.target.value
        });
        this.props.eventSearching(this.state.tempValue)
    }
    render() {
        return (
            <div>
                <div className="searchbar">
                    <div className="container">
                        <div className="row"> 
                            <div className="col-6">
                                <div className="btn-group">
                                    <input type="text" className="form-control" name="name" id="name" placeholder="Nhập tên ở đây" onChange={(event)=>this.isChange(event)}/>
                                    <button type="button" className="btn btn-primary" onClick={(dl)=>this.props.eventSearching(this.state.tempValue)}><i className="fa fa-search" aria-hidden="true" /></button>
                                </div>
                                
                            </div>
                            <div className="col-12">
                                {this.displayBtn()}
                            </div>
                            <div className="col-12">
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default Searchbar;


