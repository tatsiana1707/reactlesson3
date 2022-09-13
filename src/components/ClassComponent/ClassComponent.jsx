import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  state = {
    result: `Загадано число от ${this.props.min} до ${this.props.max}`,
    userNumber: '',
    randomNumber:
    Math.floor(Math.random() * (this.props.max - this.props.min + 1)) +
      this.props.min,
    text: 'Угадать',
    count: 0,
    disabled: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();


    this.setState(state => {
      console.log(state, state.userNumber, typeof(state.count),
        'state');

      let num = state.count;

      if (!this.state.disabled) {
        if (!+state.userNumber ||
          +state.userNumber < 1 ||
          +state.userNumber > 10) {
          return {
            userNumber: '',
            result: `Введите число от ${this.props.min} до ${this.props.max}`
          };
        } else if (+state.userNumber > state.randomNumber) {
          num++;
          return {
            result: `${state.userNumber} больше загаданного`,
            userNumber: '',
            count: num,
          };
        } else if (+state.userNumber < state.randomNumber) {
          num++;
          return {
            result: `${state.userNumber} меньше загаданного`,
            userNumber: '',
            count: num,
          };
        } else {
          return {
            result: `Вы угадали, загаданное число ${this.state.userNumber},
              попыток ${state.count + 1}`,
            userNumber: '',
            text: 'Сыграть еще...',
            randomNumber:
              Math.floor(Math.random() * this.props.max - this.props.min) +
              this.props.min,
            count: 0,
            disabled: true,
          };
        }
      }

      return {
        result: `Загадано число от ${this.props.min} до ${this.props.max}`,
        disabled: false,
        text: 'Угадать',
      };
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
