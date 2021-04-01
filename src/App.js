import React from 'react';
// Feature 1
import './index.css';
// Data Product
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store';
import { Provider } from 'react-redux';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      products: data.products,
      // Guardar el dato aun asi la pagina se recargue
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
      size: "",
      sort: "",
    };

  }

  createOrder = (order) => {
    alert("Need to save order for " + order.name);
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter(x => x._id !== product._id),
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(x => x._id !== product._id)));
  }

  addToCart = (product) => {

    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;

    cartItems.forEach(item =>{
      if(item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });

    if(!alreadyInCart) {
      cartItems.push({...product, count: 1});
    }
    
    this.setState({cartItems});
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  sortProducts = (event) => {
    // implement
    const sort = event.target.value;
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a,b) => (
          sort === "lowest" ? 
          ((a.price > b.price) ? 1:-1):
          sort === "highest" ?
          ((a.price < b.price) ? 1:-1):
          ((a._id < b._id) ? 1:-1)
        )),
    }))
    console.log(sort);
  }

  filterProducts = (event) => {
    // implement
    const target = event.target;
    if (target.value === "") {
      this.setState({ size: target.value, product: data.products });
    }
    else {
      this.setState({
        size: target.value,
        products: data.products.filter(product => product.availableSizes.indexOf(target.value) >= 0)
      });
    }
    console.log(target.value);
  }
  
  render() { 
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <nav>
              <a href="/">ShoppingCart</a>
            </nav>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter 
                  count={this.state.products.length}
                  size={this.state.size}
                  sort={this.state.sort}
                  filterProducts={this.filterProducts}
                  sortProducts={this.sortProducts}
                />
                <Products
                  products={this.state.products}
                  addToCart={this.addToCart}
                />
              </div>
              <div className="sidebar">
                <Cart
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}
                />
              </div>
            </div>
          </main>
          <footer>All right is reserved.</footer>
        </div>
      </Provider>
    );
  }  
}

export default App;
