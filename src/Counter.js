import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
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
          <button onClick={this.increment.bind(this)}>Increment</button>
          <button onClick={this.decrement.bind(this)}>Decrement</button>
          <button onClick={this.reset.bind(this)}>Reset</button>
        </section>
      </div>
    );
  }
}

export default Counter;
