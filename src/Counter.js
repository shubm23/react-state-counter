import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this)
    this.reset = this.reset.bind(this)
  }

  increment() {
    //Merge the Objects
    // this.setState({ counter: this.state.counter + 1 });

    //Passing the Function
    /* The this.setState is higher order function take callback function , 
    the callback function have two parameters state and counter props */
    this.setState((state, props) => {
      const { max, step } = props;
      if (state.counter >= max) return;
      return { counter: state.counter + step };
    });
  }

  decrement() {
    this.setState((state) => {
      if (state.counter === 0) return;
      return { counter: state.counter - 1 };
    });
  }

  reset() {
    this.setState((state) => {
      return { counter: 0 };
    });
  }

  render() {
    const { counter } = this.state;
    return (
      <div className="Counter">
        <p className="count">{counter}</p>
        <section className="controls">
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
          <button onClick={this.reset}>Reset</button>
        </section>
      </div>
    );
  }
}

export default Counter;
