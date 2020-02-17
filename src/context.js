import React, { Component } from 'react'
import {storeProducts,detailProduct} from './data'

const ProductContext = React.createContext();
//Provider
//Consumer
 class ProductProvider extends Component {
     state = {
         //products:storeProducts,
         products:[],
         detailProduct:detailProduct,
         cart:[],
         modalOpen:false,
         modalProduct:detailProduct,
         // info sur notre panier
         cartSubTotal:0,
         cartTax:0,
         cartTotal:0

     
       };
       componentDidMount(){
           this.setProducts();
       }

       setProducts = ()=>{
           let temProducts = [];
           storeProducts.forEach(item=>{
               const singleItem = {...item};
               temProducts = [...temProducts,singleItem]
           })
          this.setState(()=>{
              return {products:temProducts}
          })
       }

       getItem = id =>{
           const product = this.state.products.find(item => item.id === id);
           return product;
       }


     addToCart = id=>{
           let temProducts = [...this.state.products];
           const index = temProducts.indexOf(this.getItem(id));
           const product = temProducts[index];
           product.inCart = true;
           product.count = 1;
           const  price = product.price;
           product.total = price;

           this.setState(()=>{
               return {product : temProducts,cart: [...this.state.cart,product]};
           },()=>{
               this.addTotal()
           });
         //console.log(`hello from add to cart.id is ${id}`)
     }
// ouverture de la boite modal
     openModal = id =>{
         const product = this.getItem(id);
         this.setState(()=>{
             return {modalProduct:product,modalOpen:true}
         })
     }
//fermeture de la modal
     closeModal = ()=>{
         this.setState(()=>{
             return {modalOpen:false}
         })
     }

//gestion de detail de chaque produit lors du clic
     handleDetail  = (id)=>{
        const product = this.getItem(id);
        this.setState(()=>{
            return{detailProduct:product}
         })
    };

       // methode pour  composant pannier

     increment = id=>{
         let tempCart = [...this.state.cart];
         const selectedProduct = tempCart.find(item => item.id===id);
         const index = tempCart.indexOf(selectedProduct);
         const product = tempCart[index];

         product.count = product.count + 1;
         product.total = product.count * product.price;

         this.setState(()=>{
             return{
                 cart: [...tempCart]

             }
         },()=>{
             this.addTotal();
         })
     }

     decrement = id=>{
         let tempCart = [...this.state.cart];
         const selectedProduct = tempCart.find(item => item.id===id);
         const index = tempCart.indexOf(selectedProduct);
         const product = tempCart[index];

         product.count = product.count -1 ;
         if(product.count ===0){
             this.removeItem(id);
         }else {
             product.total = product.count * product.price;

             this.setState(()=>{
                 return{
                     cart: [...tempCart]

                 }
             },()=>{
                 this.addTotal();
             })
         }



     }

     removeItem = id=>{
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item=>item.id !==id);

        const index = tempProducts.indexOf(this.getItem(id));
        let removeProduct = tempProducts[index];
        removeProduct.inCart = false;
        removeProduct.count = 0;
        removeProduct.total = 0;

        this.setState(()=>{
            return{
                cart: [...tempCart],
                products: [...tempProducts]
            }
        },()=>{
            this.addTotal();
        })
     }

     clearCart = ()=>{
        this.setState(()=>{
            return{cart: []};
        },()=>{
            this.setProducts();
            this.addTotal();
        })
     }

     addTotal = ()=>{
         let subTotal = 0;
         this.state.cart.map(item=>(subTotal +=item.total));
         const temTax = subTotal * 0.1;
         const tax = parseFloat(temTax.toFixed(2));
         const total = subTotal + tax;
         this.setState(()=>{
             return {
                 cartSubTotal: subTotal,
                 cartTax: tax,
                 cartTotal: total
             }
         })
     }


    /* tuto 6
    tester=()=>{
        console.log('State product : ',this.state.products[0].inCart);
        console.log('Data product : ', storeProducts[0].inCart);

        const tempPruducts = [...this.state.products];
        tempPruducts[0].inCart=true
        this.setState(()=>{
            return {products:tempPruducts}
        },()=>{
            console.log('State product : ', this.state.products[0].inCart);
            console.log('Data product : ', storeProducts[0].inCart); 
        })
    }*/



    render() {
        return (
            <ProductContext.Provider value={{
                //on recupere tous les elements du state
                ...this.state,
                // appel de la methode handle pour le gestion
                //des infos concernant chaque article
                handleDetail: this.handleDetail,
                // appel de la methode pour l'ajout dans le panier
                addToCart: this.addToCart,
                // appel de nos methode pour la modal dans le render
                openModal: this.openModal,
                closeModal: this.closeModal,
                // appel et initialisation de nos methode de
                // pannier dans le render
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}>
                    {/*tuto 4 <button onClick={this.tester}>test me</button>*/}
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export  {ProductProvider, ProductConsumer};
