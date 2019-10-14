import React, {Component, Fragment} from 'react';
import Spinner from './Spinner';
import './image-spinner.css';

export default class ImageSpinner extends Component {
  constructor (props) {
    super (props);
    this.state = {
      startSpinner: false,
      spinnerValues: [],
    };

    this.images = [
      '../images/banana.png',
      '../images/monkey.png',
      '../images/orange.png',
      '../images/strawberry.png',
    ];
    this.startMachine = null;
    this.stopMachine = null;
  }

  componentDidMount () {
    this.startMachine = setTimeout (() => {
      this.setState ({
        startSpinner: true,
      });
    }, 5000);
  }

  componentDidUpdate () {
    if (this.state.startSpinner === true) {
      this.stopMachine = setTimeout (() => {
        this.setState ({
          startSpinner: false,
        });
      }, 10000);
    }
  }

  handleSpinner = () => {
    this.setState ({
      startSpinner: !this.state.startSpinner,
      spinnerValues: [],
    });
    if (this.state.startSpinner === false) {
      clearTimeout (this.stopMachine);
    }
  };

  getSpinnerValues = val => {
    if (this.state.spinnerValues.length < 3) {
      this.setState (function (prevState) {
        return {
          spinnerValues: [...prevState.spinnerValues, val],
        };
      });
    }
  };

  prizeHandle = () => {
    const showPrize = this.state.spinnerValues.reduce ((acc, val) => {
      if (acc.indexOf (val) === -1) {
        acc.push (val);
      }
      return acc;
    }, []);
    return showPrize;
  };

  componentWillUnmount () {
    clearTimeout (this.startMachine);
  }

  render () {
    const prize = this.prizeHandle ();
    return (
      <Fragment>
        <div className="spinner-wrapper">
          <Spinner
            spinnerStatus={this.state.startSpinner}
            images={this.images}
            getSpinnerValues={this.getSpinnerValues}
          />
          <Spinner
            spinnerStatus={this.state.startSpinner}
            images={this.images}
            getSpinnerValues={this.getSpinnerValues}
          />
          <Spinner
            spinnerStatus={this.state.startSpinner}
            images={this.images}
            getSpinnerValues={this.getSpinnerValues}
          />
        </div>
        <button onClick={this.handleSpinner}>
          {!this.state.startSpinner ? 'Start' : 'Stop'}
        </button>
        <br /><br /><br />
        {prize.length === 1
          ? <h2>Congrats!.. You have won $20.</h2>
          : prize.length === 2
              ? <h2>Congrats!.. You have won $10.</h2>
              : prize.length === 3 ? <h2>Better luck next time.</h2> : null}

      </Fragment>
    );
  }
}
