import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  state = {
    result: `Загадано число от ${this.props.min} до ${this.props.max}`,
    userNumber: '',
    randomNumber:
    Math.floor(Math.random() * this.props.max - this.props.min) +
      this.props.min,
    count: 0,
    text: 'Угадать',
    disabled: false,
  };


  handleSubmit = (e) => {
    e.preventDefault();

    this.setState(state => {
      this.setState(state => ({
        count: state.count + 1,
      }));

      this.setState(state => {
        if (!state.userNumber) {
          return {
            result: `Введите число от ${this.props.min} до ${this.props.max}`,
            count: 0,
            text: 'Угадать',
            disabled: false,
          };
        }

        if (state.userNumber < 1 || state.userNumber > 10) {
          return {
            result: `Введите число от ${this.props.min} до ${this.props.max}`,
            count: 0,
            text: 'Угадать',
            userNumber: '',
            disabled: false,
          };
        }

        if (state.userNumber > state.randomNumber) {
          return {
            result: `${state.userNumber} больше загаданного`,
            userNumber: '',
          };
        }

        if (state.userNumber < state.randomNumber) {
          return {
            result: `${state.userNumber} меньше загаданного`,
            userNumber: '',
          };
        }

        return {
          result: `Вы угадали, загаданное число ${state.userNumber},
          попыток ${state.count}`,
          userNumber: '',
          text: 'Сыграть еще...',
          randomNumber:
            Math.floor(Math.random() * this.props.max - this.props.min) +
            this.props.min,
          disabled: true,
          count: 0,
        };
      });
    });
  };


  handleChange = (e) => {
    this.setState((state, props) => {
      console.log(state, props);
      return {
        userNumber: e.target.value,
      };
    });
  };

  render() {
    console.log(this.props);
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>

        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>

          <input className={style.input} type='number' id='user_number'
            onChange={this.handleChange} value={this.state.userNumber}
            disabled = {(this.state.disabled) ? 'disabled' : ''}/>

          <button className={style.btn} >{this.state.text}</button>
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
