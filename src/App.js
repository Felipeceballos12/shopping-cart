import React from 'react';
// Feature 1
import './index.css';
// Data Product
import data from './data.json';
import Products from './components/Products';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      products: data.products,
      size: "",
      sort: "",
    };
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
