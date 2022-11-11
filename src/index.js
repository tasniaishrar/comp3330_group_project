import React from 'react';
import { render } from 'react-dom';
import { QRCode } from 'react-qr-svg';

const styles = {
  root: {
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  h1: {
    textAlign: 'center',
  },
  qrcode: {
    textAlign: 'center',
    marginTop: '35px',
  },
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { shop: '', item_name: '', price: '', quantity: '', date: '' }
  }

  render() {
    return (
      <div style={styles.root}>
        <h1 style={styles.h1}>Receiptify - QRCode Generation</h1>
        <h5 className="string">Shop Name:</h5>
        <input value={this.state.shop} onChange={(e) => { this.setState({ shop: e.target.value }) }} type="text" id="shop" />
        <h5 className="string">Item Name:</h5>
        <input value={this.state.item_name} type="text" id="item_name" onChange={(e) => { this.setState({ item_name: e.target.value }) }} />
        <h5 className="string">Price:</h5>
        <input value={this.state.price} onChange={(e) => { this.setState({ price: e.target.value }) }} type="text" id="price" />
        <h5 className="string">Quantity:</h5>
        <input value={this.state.quantity} onChange={(e) => { this.setState({ quantity: e.target.value }) }} type="text" id="quantity" />
        <h5 className="string">Date (DD/MM/YYYY):</h5>
        <input value={this.state.date} onChange={(e) => { this.setState({ date: e.target.value }) }} type="text" id="date" />
        <div style={styles.qrcode}>
          <QRCode
            level="Q"
            style={{ width: 256 }}
            value={JSON.stringify({
              shop: this.state.shop,
              expenseObj: this.state.item_name,
              price: this.state.price,
              quantity: this.state.quantity,
              date: this.state.date,
            })}
          />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));