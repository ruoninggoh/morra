import React from 'react';

const exports = {};

// Player views must be extended.
// It does not have its own Wrapper view.

exports.GetHand = class extends React.Component {
  render() {
    const {parent, playable, hand} = this.props;
    return (
      <div>
        {hand ? 'It was a draw! Pick again.' : ''}
        <br />
        {!playable ? 'Please wait...' : 'Pick a number'}
        <br />
        <button
          disabled={!playable}
          onClick={() => parent.playHand('ZERO')}
        >Zero</button>
        <button
          disabled={!playable}
          onClick={() => parent.playHand('ONE')}
        >One</button>
        <button
          disabled={!playable}
          onClick={() => parent.playHand('TWO')}
        >Two</button>
        <button
          disabled={!playable}
          onClick={() => parent.playHand('THREE')}
        >Three</button>
        <button
          disabled={!playable}
          onClick={() => parent.playHand('FOUR')}
        >Four</button>
        <button
          disabled={!playable}
          onClick={() => parent.playHand('FIVE')}
        >Five</button>
      </div>
    );
  }
}

exports.GetGuess = class extends React.Component {
  render() {
    const {parent, playable, hand} = this.props;
    return (
      <div>
        {hand ? 'It was a draw! Pick again.' : ''}
        <br />
        {!playable ? 'Please wait...' : ''}
        <br />
        <button
          disabled={!playable}
          onClick={() => parent.playGuess('ZERO')}
        >0</button>
        <button
          disabled={!playable}
          onClick={() => parent.playGuess('ONE')}
        >1</button>
        <button
          disabled={!playable}
          onClick={() => parent.playGuess('TWO')}
        >2</button>
            <button
          disabled={!playable}
          onClick={() => parent.playGuess('THREE')}
        >3</button>
            <button
          disabled={!playable}
          onClick={() => parent.playGuess('FOUR')}
        >4</button>
          <button
          disabled={!playable}
          onClick={() => parent.playGuess('FIVE')}
        >5</button>
            <button
          disabled={!playable}
          onClick={() => parent.playGuess('SIX')}
        >6</button>
            <button
          disabled={!playable}
          onClick={() => parent.playGuess('SEVEN')}
        >7</button>
            <button
          disabled={!playable}
          onClick={() => parent.playGuess('EIGHT')}
        >8</button>
            <button
          disabled={!playable}
          onClick={() => parent.playGuess('NINE')}
        >9</button>
            <button
          disabled={!playable}
          onClick={() => parent.playGuess('TEN')}
        >10</button>
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