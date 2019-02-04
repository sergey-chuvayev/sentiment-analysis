import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      result: '',
      error: '',
    }
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  }

  handleClick = () => {
    console.log(this.state.text)
    axios.post(`http://localhost:3000/getsentiment?text=${this.state.text}`)
      .then(req => this.setState({ result: req.data.result }))
      .catch(error => this.setState({ error }));
  }

  render() {
    return (
      <div className="App">
        <textarea placeholder="paste your text here" cols="30" rows="10" onChange={this.handleChange}>
        </textarea>
        <button onClick={this.handleClick}>Check sentiment</button>

        <pre>{JSON.stringify(this.state.result, null, 2)}</pre>
        <div style={{ color: 'red' }}>{JSON.stringify(this.state.error)}</div>
      </div>
    );
  }
}

export default App;
