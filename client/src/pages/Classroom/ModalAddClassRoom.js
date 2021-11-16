import React, { Component } from 'react'

export default class ModalAddClassRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valuesForm: {
                tenlophoc:'',
                phan:'',
                chude:'',
                phong:'',
                duonglink:'',
            }
        }
    }

    handleChange = (e) => {
        
        let { name, value } = e.target;
        this.setState({
            valuesForm: { ...this.state.valuesForm, [name]: value }
        })
    }



    handleSubmit = (e) => {
        // e.preventDefault();
        this.props.addClass(this.state.valuesForm);
    }
    render() {
        return (
            <div>
                <div className="modal fade" id="modelId" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create class</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <form>
                                <div classname="modal-body">
                                    <div className="form-group">
                                        <p>Class name (require)</p>
                                        <input type="text" classname="form-control" name="tenLop" onChange={this.handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <p>Section</p>
                                        <input type="text" classname="form-control" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <p>Subject</p>
                                        <input type="text" classname="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <p>Room</p>
                                        <input type="text" classname="form-control" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                                </div>

                            </form>



                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

