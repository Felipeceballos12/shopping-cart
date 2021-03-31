import React from 'react';
// Feature 1
import './index.css';
// Data Product
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      products: data.products,
      size: "",
      sort: "",
    };

  }

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
              <Products products={this.state.products} />
            </div>
            <div className="sidebar">
              Cart Items
            </div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    );
  }  
}

export default App;
