import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { Carousel } from 'react-bootstrap';
class CityDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }
    componentDidMount() {
        setTimeout(() => {
            $("#modalPopup").removeClass('fade').show();
        }, 100);

    }
    onChangeHandler(e) {
        this.setState({
            title: e.target.value
        })
    }
    render() {

        return (
            <div id="modalPopup" className="modal fade"  >
                <div className="overlay"></div>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">

                            <button type="button" className="close" data-dismiss="modal" onClick={this.props.handleHideModal} aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div class="modal-body">
                            <input type="text" placeholder="Movie Title" onChange={this.onChangeHandler} value={this.state.title} ></input>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" onClick={(e) => this.props.saveMovie(this.state.title)} data-dismiss="modal">Submit</button>
                            <button type="button" className="btn btn-default" onClick={this.props.handleHideModal} data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default CityDetail;
CityDetail.propTypes = {
    handleHideModal: PropTypes.func,
    saveMovie: PropTypes.func,
    thumbNailImages: PropTypes.array
};
CityDetail.defaultValue = {
    thumbNailImages: []
}