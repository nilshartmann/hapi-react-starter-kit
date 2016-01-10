import React from 'react';

export default class Counter extends React.Component {
  constructor() {
    super();

    this.increment = ::this.increment;

    this.state = {
      count: 0
    };
  }

  increment() {
    const { count } = this.state;
    this.setState({
      count: count + 1
    });
  }

  render() {
    return <div>
      <button onClick={this.increment}>Count</button>
      <p>Current: {this.state.count}</p>
    </div>;
  }
}
