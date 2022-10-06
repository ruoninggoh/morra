import React from 'react';

const exports = {};

exports.GetClaw = class extends React.Component {
  render() {
    const {parent, playable, hand} = this.props;
    return (
      <div>
        {claw ? 'It was a draw! Pick again.' : ''}
        <br />
        {!playable ? 'Please wait...' : 'Pick a number'}
        <br />
        <button
          disabled={!playable}
          onClick={() => parent.playClaw('ZERO')}
        >ZERO</button>
        <button
          disabled={!playable}
          onClick={() => parent.playClaw('ONE')}
        >ONE</button>
        <button
          disabled={!playable}
          onClick={() => parent.playClaw('TWO')}
        >TWO</button>
        <button
          disabled={!playable}
          onClick={() => parent.playClaw('THREE')}
        >THREE</button>
        <button
          disabled={!playable}
          onClick={() => parent.playClaw('FOUR')}
        >FOUR</button>
        <button
          disabled={!playable}
          onClick={() => parent.playClaw('FIVE')}
        >FIVE</button>
      </div>
    );
  }
}

exports.GetGuess = class extends React.Component {
  render() {
    const {parent, playable, guess} = this.props;
    return (
      <div>
        {hand ? 'It was a draw! Pick again.' : ''}
        <br />
        {!playable ? 'Please wait...' : ''}
        <br />
        <button
          disabled={!playable}
          onClick={() => parent.playGuess('ZEROO')}
        >ZERO</button>
        <button
          disabled={!playable}
          onClick={() => parent.playGuess('ONEO')}
        >ONE</button>
        <button
          disabled={!playable}
          onClick={() => parent.playGuess('TWOO')}
        >TWO</button>
        <button
          disabled={!playable}
          onClick={() => parent.playGuess('THREEO')}
        >THREE</button>
        <button
          disabled={!playable}
          onClick={() => parent.playGuess('FOURO')}
        >FOUR</button>
        <button
          disabled={!playable}
          onClick={() => parent.playGuess('FIVEO')}
        >FIVE</button>
        <button
          disabled={!playable}
          onClick={() => parent.playGuess('SIXO')}
        >SIX</button>
        <button
          disabled={!playable}
          onClick={() => parent.playGuess('SEVENO')}
        >SEVEN</button>
        <button
          disabled={!playable}
          onClick={() => parent.playGuess('EIGHTO')}
        >EIGHT</button>
        <button
          disabled={!playable}
          onClick={() => parent.playGuess('NINEO')}
        >NINE</button>
        <button
          disabled={!playable}
          onClick={() => parent.playGuess('TENO')}
        >TEN</button>
      </div>
    );
  }
}

exports.WaitingForResults = class extends React.Component {
  render() {
    return (
      <div>
        Waiting for results...
      </div>
    );
  }
}

exports.Done = class extends React.Component {
  render() {
    const {outcome} = this.props;
    return (
      <div>
        Thank you for playing. The outcome of this game was:
        <br />{outcome || 'Unknown'}
      </div>
    );
  }
}

exports.Timeout = class extends React.Component {
  render() {
    return (
      <div>
        There's been a timeout. (Someone took too long.)
      </div>
    );
  }
}

export default exports;