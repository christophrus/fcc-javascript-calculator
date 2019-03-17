import React, { Component } from 'react';
import './App.css';


const beginsWithOperator = /^(\+|-|x|÷)/;
const endsWithOperator = /(\+|-|x|÷)$/;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      equation: '',
      equationMemory: '',
      display: '0',
      bracketsOpened: 0,
      bracketsClosed: 0
    };

    this.handleDigit = this.handleDigit.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
    this.handleClear = this.handleClear.bind(this);

  }

  handleDecimal() {
    if (!(/\./).test(this.state.display) && ! (/=/).test(this.state.equation)) {
      this.setState({
        display: this.state.display + '.'
      })
    }
  }

  handleOperator(e) {

    let equation = this.state.display === 'ERROR' ? '' : this.state.equation;

    equation = endsWithOperator.test(equation) ? equation.replace(endsWithOperator, e.target.innerHTML) : (/=/).test(equation) ? this.state.equationMemory + e.target.innerHTML : equation + e.target.innerHTML;

    this.setState({
      equation: equation,
      equationMemory: equation,
      display: e.target.innerHTML
    })

  }

  handleEquals() {

    if (!(/=/).test(this.state.equation)) {
      let equation = this.state.equation;
      equation = equation.replace(endsWithOperator, '');

      for(let i=0; i < this.state.bracketsOpened - this.state.bracketsClosed; i++) {
        equation += ")";
      }

      try {
        // eslint-disable-next-line no-eval
        let result = eval(equation.replace('÷', '/').replace("x", '*'));
        this.setState({
          equation: equation + "=" + result,
          equationMemory: result,
          display: result,
          bracketsOpened: 0,
          bracketsClosed: 0
        })
      } catch(e) {
        this.setState({
          bracketsOpened: 0,
          bracketsClosed: 0,
          display: 'ERROR'
        })
      }

    }

  }

  handleDigit(e){

    if (e.target.innerHTML === ")" && this.state.bracketsOpened === this.state.bracketsClosed) return;

    let display = this.state.display;
    let equation = this.state.equation;
    let equationMemory = this.state.equationMemory;

    if ((/=/).test(equation) || display === 'ERROR') {
      equation = '';
      equationMemory = '';
      display = '0';
    }

    if (display === "0" && e.target.innerHTML === "0") return;
    display = ((display === "0" && e.target.innerHTML !== "0") || beginsWithOperator.test(display)) ? e.target.innerHTML : display + e.target.innerHTML;
    equation = equationMemory + display;

    this.setState({
      equation: equation,
      equationMemory: equationMemory,
      display: display,
      bracketsOpened: e.target.innerHTML === "(" ? this.state.bracketsOpened + 1 : this.state.bracketsOpened,
      bracketsClosed: e.target.innerHTML === ")" ? this.state.bracketsClosed + 1 : this.state.bracketsClosed
    })
  }

  handleClear() {

    this.setState({
      equation: '',
      equationMemory: '',
      display: '0',
      bracketsOpened: 0,
      bracketsClosed: 0
    })

  }


  render() {
    return (
      <main>
        <div id="calculator">
          <div id="display"><span>{this.state.display}</span></div>
          <div id="equation"><span>{this.state.equation}</span></div>
          <button className="light-grey" id="zero" onClick={this.handleDigit}>0</button>
          <button className="light-grey" id="one" onClick={this.handleDigit}>1</button>
          <button className="light-grey" id="two" onClick={this.handleDigit}>2</button>
          <button className="light-grey" id="three" onClick={this.handleDigit}>3</button>
          <button className="light-grey" id="four" onClick={this.handleDigit}>4</button>
          <button className="light-grey" id="five" onClick={this.handleDigit}>5</button>
          <button className="light-grey" id="six" onClick={this.handleDigit}>6</button>
          <button className="light-grey" id="seven" onClick={this.handleDigit}>7</button>
          <button className="light-grey" id="eight" onClick={this.handleDigit}>8</button>
          <button className="light-grey" id="nine" onClick={this.handleDigit}>9</button>
          <button className="grey" id="add" onClick={this.handleOperator}>+</button>
          <button className="grey" id="subtract" onClick={this.handleOperator}>-</button>
          <button className="grey" id="multiply" onClick={this.handleOperator}>x</button>
          <button className="grey" id="divide" onClick={this.handleOperator}>÷</button>
          <button className="blue" id="equals" onClick={this.handleEquals}>=</button>
          <button className="grey" id="decimal" onClick={this.handleDecimal}>.</button>
          <button className="grey" id="bracket-open" onClick={this.handleDigit}>(</button>
          <button className="grey" id="bracket-close" onClick={this.handleDigit}>)</button>
          <button className="grey" id="clear" onClick={this.handleClear}>AC</button>
        </div>
      </main>
    );
  }
}

export default App;
