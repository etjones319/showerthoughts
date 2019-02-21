import React, { Component } from 'react';
import Card from './components/card';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      currentIndex: 0,
      length: 0,
    };
  }

  componentDidMount() {
    fetch('https://www.reddit.com/r/showerthoughts.json')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          data: data.data.children,
          length: data.data.children.length
        });
      });
  }

  next() {
    if (this.state.currentIndex < this.state.length - 1) {
      this.setState({ currentIndex: this.state.currentIndex + 1 })
    }
    else {
      this.setState({ currentIndex: 0 })
    }
  }

  prev() {
    if (this.state.currentIndex > 0) {
      this.setState({ currentIndex: this.state.currentIndex -1 })
    }
    else {
      this.setState({ currentIndex: this.state.length - 1 })
    }
  }

  getMappedShowerThoughtList(){
    let showerThoughtsArray = this.state.data;
    let keyIterator = 0;
    let that = this;

    if (this.state.data === null){
      return (
        <li>
          Loading...
        </li>
      );
    }

    const listItems = showerThoughtsArray.map(function(item, index) {
      keyIterator++;
      return (
        <Card key={keyIterator} show={that.state.currentIndex === index} {...item.data} />
      );
    });

    return listItems;
  }

  render() {
    return (
      <div className="App">
        <div className="App-container">
          <header className="App-header">
            Shower Thoughts
          </header>
          <div className="container">
            <ul className="card-list">
              {this.getMappedShowerThoughtList()}
            </ul>
            <nav>
              <span className="prev" onClick={this.prev.bind(this)} />
              <span className="next" onClick={this.next.bind(this)} />
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
