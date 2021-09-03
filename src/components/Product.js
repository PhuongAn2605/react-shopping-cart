  //do not need prefix for each request

import React, { Component } from 'react';
import Modal from "react-modal";
import Fade from 'react-reveal/Fade';
import Zoom from "react-reveal/Zoom";
import { fetchProducts } from '../actions/productActions';
import formatCurrency from '../util';
import { connect } from 'react-redux';

class Product extends Component {
    constructor(props){
        super(props);
        this.state = {
            product: null

        }
    }

    componentDidMount(){
        fetchProducts();
    }

    openModal = (product) => {
        this.setState({ product })
    }

    closeModal = () => {
        this.setState({ product: null})
    }

    render() {
        const { product } = this.state;
        return (
            <div>
                <Fade bottom cascade>
                    {
                        !this.props.products ? (<div>Loading...</div>)
                        : (
                    <ul className="products">
                        {this.props.products.map(product => (
                            <li key={product._id}>
                                <div className="product">
                                    <a href={"#" + product._id} 
                                        onClick={() => this.openModal(product)}>
                                        <img src={product.image} al={product.title}></img>
                                        <p>{product.title}</p>
                                    </a>
                                    <div className="product-price">
                                        <div>{formatCurrency(product.price)}</div>
                                        <button onClick={() => this.props.addToCart(product)} className="button primary">Add to cart</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                        )}
                </Fade>
                {
                    product && (
                        <Modal isOpen={true}
                            onRequestClose={this.closeModal}>
                            <Zoom>
                                <button className="close-model" onClick={this.closeModal}>x</button>
                                <div className="product-details">
                                    <img src={product.image} alt={product.title}></img>
                                    <div className="product-details-description">
                                    <p>
                                        <strong>{product.title}</strong>
                                    </p>
                                    <p>
                                        <strong>{product.description}</strong>
                                    </p>
                                    <p>
                                        Available Sizes: {" "}
                                        {product.availableSizes.map(x => (
                                            <span>
                                                {" "}
                                                <button className="button">{x}</button>
                                            </span>
                                        ))}
                                    </p>
                                    <div className="product-price">
                                        <div>
                                            {formatCurrency(product.price)}
                                        </div>
                                        <button className="button primary" onClick={(e) => {
                                            this.props.addToCart(this.props.cartItems, product);
                                            this.closeModal();
                                            }}>Add to cart</button>
                                    </div>
                                    </div>
                                </div>
                            </Zoom>
                        </Modal>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    products: state.products.filteredItems
});

// const mapDispatchToProps = () => ({
//     fetchProducts: fetchProducts
// })


//Product: name of parameter
export default connect(mapStateToProps, fetchProducts)(Product);