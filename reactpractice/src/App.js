import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    score: 0,
    highScore: 0
  };

componentDidMount(){
  this.setState({friends: this.shuffleFriends(this.state.friends)});
}

handleCorrectGuess = newFriends => {
  const { highScore, score} = this.state;
  const newScore = score + 1;
  const newHighScore = Math.max(newScore, highScore);
  this.setState({
    friends: this.shuffleFriends(newFriends),
    score: newScore,
    highScore: newHighScore
  });
  console.log(score);
};

handleIncorrectGuess = friends => {
  this.setState({
    friends: this.resetFriends(friends),
    score: 0
  });
};

resetFriends = friends => {
  const resetFriends = friends.map(item => ({...item, clicked: false}))
  return this.shuffleFriends(resetFriends);
};

shuffleFriends = friends => {
  let i = friends.length -1;
  while (i>0){
    const j = Math.floor(Math.random()* (i+1));
    const temp = friends[i]; 
    friends[i]=friends[j];
    friends[j]=temp;
    i--;
  }
  return friends;
};

handleItemClick = id => {
  let guessedCorrectly = false;
  const newFriends = this.state.friends.map(item => {
    const newItem = {...item};
    if (newItem.id === id) {
      if (!newItem.clicked){
        newItem.clicked = true;
        guessedCorrectly= true;
      }
    }
    return newItem;
  });
  guessedCorrectly
  ? this.handleCorrectGuess(newFriends)
  : this.handleIncorrectGuess(newFriends);
};



  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <div>
      <Wrapper>
        <Title score={this.state.score} highScore={this.state.highScore}>Clicky Game <br></br>Score: {this.state.score}<br></br>High Score: {this.state.highScore}
        
        </Title>
        {this.state.friends.map(item => (
          <FriendCard
            id={item.id}
            key={item.id}
            image={item.image}
            handleClick={this.handleItemClick}
         
          />
        ))}
      </Wrapper>
      </div>
    )
  }}

export default App;
