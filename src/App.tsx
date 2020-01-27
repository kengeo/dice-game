import * as React from 'react';
import './App.css';

interface MyProps {

}

interface MyState {
  roundScore: number;
  player_1_label: string,
  player_2_label: string,
  player_1: number;
  player_2: number;
  diceCurrent: string;
  activePlayer: number;
  gamePlaying: boolean;
  current_1: number;
  current_2: number;
}

class App extends React.PureComponent<MyProps, MyState> {
  state: MyState;

  constructor(props: MyProps) {
    super(props)

    this.state = {
      roundScore: 0,
      player_1_label: "Player 1",
      player_2_label: "Player 2",
      player_1: 0,
      player_2: 0,
      diceCurrent: "/assets/i/dice-blank.png",
      activePlayer: 0,
      gamePlaying: true,
      current_1: 0,
      current_2: 0
    }
    this.rollDice = this.rollDice.bind(this)
    this.hold = this.hold.bind(this)
    this.newGame = this.newGame.bind(this)
    this.nextPlayer = this.nextPlayer.bind(this)
    this.checkWinner = this.checkWinner.bind(this)

  }

  rollDice = () => {
    console.log("roll")
    if (this.state.gamePlaying) {
      let dice = Math.floor(Math.random() * 6) + 1
      let diceCurrent = `/assets/i/dice-${dice}.png`

      console.log(dice)

      if (dice !== 1) {

        if (this.state.activePlayer === 0) {

          this.setState(prevState => ({
            roundScore: (this.state.roundScore ? this.state.roundScore : 0) + dice,
            current_1: (this.state.roundScore ? this.state.roundScore : 0) + dice,
            diceCurrent: diceCurrent
          }))

        } else {

          this.setState(prevState => ({
            roundScore: (this.state.roundScore ? this.state.roundScore : 0) + dice,
            current_2: (this.state.roundScore ? this.state.roundScore : 0) + dice,
            diceCurrent: diceCurrent
          }))

        }
      } else {
        this.nextPlayer()
      }
    }
    console.log(this.state.current_1, this.state.current_2)
  }

  nextPlayer = () => {
    if (this.state.activePlayer === 0) {
      this.setState({
        roundScore: 0,
        current_1: 0,
        diceCurrent: "/assets/i/dice-blank.png",
        activePlayer: 1
      })
    } else {
      this.setState({
        roundScore: 0,
        current_2: 0,
        diceCurrent: "/assets/i/dice-blank.png",
        activePlayer: 0
      })
    }
  }

  checkWinner = () => {

    if (this.state.current_1 >= 20) {
      this.setState({
        diceCurrent: "/assets/i/dice-blank.png",
        player_1_label: "WINNER!",
        player_2_label: "L0SER!",
        gamePlaying: false
      })
      return

    } else if (this.state.current_2 >= 20) {
      this.setState({
        diceCurrent: "/assets/i/dice-blank.png",
        player_2_label: "WINNER!",
        player_1_label: "L0SER!",
        gamePlaying: false
      })
      return
    }
  }

  hold = () => {
    console.log("hold")

    if (this.state.gamePlaying) {

      if (this.state.activePlayer === 0) {

        this.setState({
          diceCurrent: "/assets/i/dice-blank.png",
          activePlayer: 1,
          player_1: (this.state.player_1 ? this.state.player_1 : 0) + this.state.roundScore,
          current_1: 0,
          roundScore: 0
        })
        this.checkWinner()

      } else {

        this.setState({
          diceCurrent: "/assets/i/dice-blank.png",
          activePlayer: 0,
          player_2: (this.state.player_2 ? this.state.player_2 : 0) + this.state.roundScore,
          current_2: 0,
          roundScore: 0
        })
        this.checkWinner()
      }
      console.log(this.state)
    } else {

      this.nextPlayer();

    }

  }

  newGame = () => {
    this.setState({
      roundScore: 0,
      player_1_label: "Player 1",
      player_2_label: "Player 2",
      player_1: 0,
      player_2: 0,
      diceCurrent: "/assets/i/dice-blank.png",
      activePlayer: 0,
      gamePlaying: true,
      current_1: 0,
      current_2: 0
    })
  }


  render() {
    return (
      <div className="App">
        <div className="wrapper clearfix">

          <div className={this.state.activePlayer === 0 ? "player-0-panel active" : "player-0-panel"}>
            <div className="player-name" id="name-0">{this.state.player_1_label}</div>
            <div className="player-score" id="score-0">{this.state.player_1}</div>
            <div className="player-current-box">
              <div className="player-current-label">Current</div>
              <div className="player-current-score" id="current-0">{this.state.current_1}</div>
            </div>
          </div>

          <div className={this.state.activePlayer === 1 ? "player-1-panel active" : "player-1-panel"}>
            <div className="player-name" id="name-1">{this.state.player_2_label}</div>
            <div className="player-score" id="score-1">{this.state.player_2}</div>
            <div className="player-current-box">
              <div className="player-current-label">Current</div>
              <div className="player-current-score" id="current-1">{this.state.current_2}</div>
            </div>
          </div>

          <button className="btn-new" onClick={this.newGame}><i className="ion-ios-plus-outline"></i>New game</button>
          <button className="btn-roll" onClick={this.rollDice}><i className="ion-ios-loop"></i>Roll dice</button>
          <button className="btn-hold" onClick={this.hold}><i className="ion-ios-download-outline"></i>Hold</button>

          <img src={this.state.diceCurrent} alt="Dice" className="dice" />
        </div>
      </div >
    );
  }

}

export default App;
