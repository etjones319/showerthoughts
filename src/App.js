import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      link: '',
      author: '',
    };
  }

  componentDidMount() {
    fetch('https://www.reddit.com/r/showerthoughts.json')
      .then(response => {
        return response.json();
      })
      .then(data => {
        let parsedJsonObject = this.parseJsonObject(data);
        this.setState({
          title: parsedJsonObject.title,
          link: parsedJsonObject.link,
          author: parsedJsonObject.author
        });
      });
  }

  parseJsonObject(data) {
    let dataChildrenArray = data.data.children;
    let randomElement = dataChildrenArray[Math.floor(Math.random()*dataChildrenArray.length)];
    let randomElementData = randomElement.data;
    let parsedRandomElementData = {
      title: randomElementData.title,
      link: 'https://reddit.com' + randomElementData.permalink,
      author: randomElementData.author
    }

    return parsedRandomElementData;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Shower Thoughts
        </header>
        <div className="container">
          <div className="st-detail">
            <a href={this.state.link}>{this.state.title}</a>
          </div>
          <div className="st-author">
            - {this.state.author}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
