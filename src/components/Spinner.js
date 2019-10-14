import React from 'react';

export default class Spinner extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      count: Math.ceil (Math.random () * 4),
    };
    this.timer = null;
  }

  randomNumber = () => {
    this.setState ({
      count: Math.ceil (Math.random () * 4),
    });
  };

  interVal = () => {
    if (this.timer === null) {
      this.timer = setInterval (() => {
        this.randomNumber ();
      }, 50);
    }
  };

  componentWillReceiveProps (nextProps) {
    if (!nextProps.spinnerStatus) {
      this.props.getSpinnerValues (this.state.count);
    }
  }

  componentDidUpdate () {
    if (!this.props.spinnerStatus) {
      clearInterval (this.timer);
      this.timer = null;
    } else {
      this.interVal ();
    }
  }

  render () {
    return (
      <div className="spinner-block">
        <img
          src={this.props.images[this.state.count - 1]}
          alt={this.props.images[this.state.count - 1]}
        />
      </div>
    );
  }
}
