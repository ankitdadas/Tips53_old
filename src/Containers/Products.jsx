
import React, { Component } from 'react';
import "@babel/polyfill";
import { productJson } from '../../public/productJson';
import ProductDetail from './ProductDetail';


class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {

            productGroups: [],
            recommendations: [],
            showDetail: false,
            title: '',
            thumbNailImages: [],
            addButtons: [],
            removeButtons: []
        };
        this.showDetail = this.showDetail.bind(this);
        this.handleHideModal = this.handleHideModal.bind(this);
        this.addButton = this.addButton.bind(this);
        this.addMovie = this.addMovie.bind(this);
        this.saveMovie = this.saveMovie.bind(this);
        this.removeButton = this.removeButton.bind(this);
        this.removeMovie = this.removeMovie.bind(this);

    }
    saveMovie(title) {
        this.setState({
            productGroups: this.state.productGroups.concat({
                id: this.state.productGroups.length + 1,
                title: title, img: null
            })
        });
        this.handleHideModal();
    }
    componentDidMount() {
        const { mylist, recommendations } = productJson();


        this.setState({
            productGroups: mylist,
            recommendations: recommendations
        })

    }
    showDetail(e) {

        this.setState({
            showDetail: true,
        })
    }
    handleHideModal() {

        this.setState({
            showDetail: false
        })
    }
    addButton(id) {
        if (this.state.addButtons.findIndex(p => p === id) < 0) {
            this.setState({
                addButtons: this.state.addButtons.concat(id)
            })
        }
    }
    addMovie() {
        this.showDetail();
    }
    removeMovie(id) {
        this.setState({
            recommendations: this.state.recommendations.filter(p => p.id !== id)
        })
    }
    removeButton(id) {
        if (this.state.removeButtons.findIndex(p => p === id) < 0) {
            this.setState({
                removeButtons: this.state.removeButtons.concat(id)
            })
        }
    }
    render() {
        const productDiv = this.state.productGroups.map((product) => {

            product.title = product.title.replace('&amp;', "&");
            return (<div className="col-lg-4 col-sm-6 col-xs-12">
                <div className=" product">

                    <div class="product_slider_container">
                        <div class=" product_item">
                            <div class="product-thumnial product_image">
                                <img src={product.img === null ?
                                    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' : product.img}
                                    onMouseMove={(e) => this.addButton(product.id)} className="img-responsive" />
                            </div>
                        </div>
                    </div>
                    <div class="product_content">
                        <div class="product_title">{product.title}</div>
                        {this.state.addButtons.find(id => id === product.id) &&
                            <input type="button" onClick={this.addMovie} value="Add Movie"></input>}
                    </div>
                </div>
            </div>);
        })
        const recomadationDiv = this.state.recommendations.map((product) => {

            product.title = product.title.replace('&amp;', "&");
            return (<div className="col-lg-4 col-sm-6 col-xs-12">
                <div className=" product">

                    <div class="product_slider_container">
                        <div class=" product_item">
                            <div class="product-thumnial product_image">
                                <img src={product.img} onMouseMove={(e) => this.removeButton(product.id)} className="img-responsive" />
                            </div>
                        </div>
                    </div>
                    <div class="product_content">
                        <div class="product_title">{product.title}</div>
                        {this.state.removeButtons.find(id => id === product.id) &&
                            <input type="button" onClick={() => this.removeMovie(product.id)} value="Remove Movie"></input>}
                    </div>
                </div>
            </div>);
        })
        return (

            <div className="row">
                {productDiv}
                {recomadationDiv}
                {this.state.showDetail ? <ProductDetail
                    thumbNailImages={this.state.thumbNailImages}
                    title={this.state.title}
                    saveMovie={this.saveMovie}
                    handleHideModal={this.handleHideModal}></ProductDetail> : null
                }
            </div>
        );
    }
}

export default Products;