import React, { Component } from 'react'
import {ProductConsumer} from "../context";
import {Link} from "react-router-dom";
import {ButtonContainer} from "./Button";

export default class Details extends Component {
    render() {
        return (
            <div>
                <ProductConsumer>
                    {value=>{
                       const {id,company,img,info,price,title,inCart} = value.detailProduct;
                       return(
                           <div className="container py-5 ">
                               <div className="row">
                                   {/*title info*/}
                                   <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                       <h1>{title}</h1>
                                   </div>
                                   {/*end title info*/}

                                   {/*product info*/}
                                   <div className="col-10 mx-auto col-md-5 my-3">
                                       <img src={img} alt="product" className="img-fluid"/>
                                   </div>

                                   {/*product text*/}
                                   <div className="col-10 mx-auto col-md-7 my-3 text-capitalize">
                                       <h2>model : {title}</h2>
                                       <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                           made by :<span className="text-uppercase">{company}</span>
                                       </h4>
                                       <h4 className="text-blue">
                                           <strong>
                                               price : <span>$</span>{price}
                                           </strong>
                                       </h4>
                                       <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                           some info about product:
                                       </p>
                                       <p className="text-muted lead">{info}</p>

                                       {/*buttons*/}
                                       <div>
                                           <Link to="/">
                                               <ButtonContainer>
                                                   back to products
                                               </ButtonContainer>
                                           </Link>
                                           <ButtonContainer disabled={inCart?true:false} onClick={()=>{
                                               value.addToCart(id);
                                               value.openModal(id);
                                           }} cart>
                                               {inCart?"in Cart":" Add to cart"}
                                           </ButtonContainer>
                                       </div>
                                   </div>
                                   {/*end produit text*/}
                               </div>

                           </div>
                       )
                    }

                    }
                </ProductConsumer>
            </div>
        )
    }
}
