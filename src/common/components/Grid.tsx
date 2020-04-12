import React from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { Action } from '../redux';
import * as T from "../types";
import { fetchWrapper, getRandomBetween } from '../helpers';
import { GAME_WINNERS_URL, Stage, Color } from '../index';


type Props = Readonly<{
  store: T.State
  dispatch: any
}>

class Grid extends React.Component<Props> {

  private scoreLocal: T.Score;
  private timerId: number | null;
  private cell: T.Coordinate | null;
  private isStarted: boolean;
  private grid: T.Grid;
  private coordinates: Array<T.Coordinate>;

  constructor(readonly props: Props) {

    super(props);

    const { difficulties, currentMode } = this.props.store;
    const { field } = difficulties![currentMode!];

    this.timerId = null;
    this.cell = [0, 0];
    this.scoreLocal = [0, 0];
    this.isStarted = false;

    this.grid = this.newGrid(field);
    this.coordinates = this.newCoordinates(field);
  }

  shouldComponentUpdate(newProps: Props) {

    const { difficulties, currentMode } = newProps.store;
    const { field } = difficulties![currentMode!];

    const isFieldsEquals =
      field === this.props.store.difficulties![this.props.store.currentMode!].field;

    // Если размеры сетки изменились, обновить сетку
    if (!isFieldsEquals) {
      this.grid = this.newGrid(field);
      this.coordinates = this.newCoordinates(field);
    }

    // Первый запуск таймера
    const { stage } = newProps.store;
    if (!this.isStarted && stage === Stage.PLAYING) {
      this.selectRandomCell();
      this.fillSelectedCell(Color.BLUE);
      this.startTimer();
      this.isStarted = true;
    }

    // Всегда true
    return true;
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  newGrid = (size: number) => {
    return new Array(size)
      .fill(null)
      .map(el => new Array(size).fill(Color.DEFAULT)) as Array<Array<string>>;
  }

  newCoordinates = (size: number) => {
    const array: Array<T.Coordinate> = [];
    for (let row = 0; row < size; ++row) {
      for (let col = 0; col < size; ++col) {
        array.push([row, col]);
      }
    }
    return array;
  }

  // Функция таймера
  timer = () => {
    // Фиксация текущих результатов
    this.clearTimer();
    this.fillSelectedCell(Color.RED);
    this.incrementComputerScore(); // изменение локального игрового счёта

    // Проверка, есть ли победитель?
    const winner = this.checkWinner();
    if (winner) {
      this.sendResultsAndDispatchThem(winner);
      this.dispatchStageWin();
    } else {
      this.selectRandomCell();
      this.fillSelectedCell(Color.BLUE);
      this.startTimer();
      // this.forceUpdate();
    }

    // Отправка локального игрового счёта в redux
    this.dispatchScore();
  }

  // Функция для обработки кликов
  onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Фиксация текущих результатов
    this.clearTimer();
    this.fillSelectedCell(Color.GREEN);
    this.incrementPlayerScore(); // изменение локального игрового счёта

    // Проверка, есть ли победитель?
    const winner = this.checkWinner();
    if (winner) {
      this.sendResultsAndDispatchThem(winner);
      this.dispatchStageWin();
    } else {
      this.selectRandomCell();
      this.fillSelectedCell(Color.BLUE);
      this.startTimer();
      // this.forceUpdate();
    }

    // Отправка локального игрового счёта в redux
    this.dispatchScore();
  }

  startTimer = () => {
    const { difficulties, currentMode } = this.props.store;
    const { delay } = difficulties![currentMode!];
    if (delay) {
      if (typeof this.timerId === 'number') {
        /*DEBUG*/console.error(new Error());
        this.clearTimer();
      }
      this.timerId = window.setTimeout(this.timer, delay);
    }
  }

  clearTimer = () => {
    if (typeof this.timerId === 'number') {
      window.clearTimeout(this.timerId);
      this.timerId = null;
      return;
    }
    /*DEBUG*///console.error(new Error());
  }

  selectRandomCell = () => {
    // Если ячейки закончились, то будет null
    if (!this.coordinates.length) {
      this.cell = null;
    }

    // Выбор случайной ячейки
    const randomIndex = getRandomBetween(0, this.coordinates.length);
    this.cell = this.coordinates[randomIndex];

    // Удаление выбранной ячейки
    this.coordinates.splice(randomIndex, 1);
  }

  fillSelectedCell = (color: Color) => {
    // Если ячейки закончились, то будет null
    if (this.cell) {
      const [row, col] = this.cell;
      this.grid[row][col] = color;
    }
  }

  incrementPlayerScore = () => {
    ++this.scoreLocal[0]; // player +1
  }

  incrementComputerScore = () => {
    ++this.scoreLocal[1]; // computer +1
  }

  dispatchScore = () => {
    this.props.dispatch({
      type: Action.SET_SCORE,
      payload: [...this.scoreLocal],
    })
  }

  // Если победитель есть, то вернуть его объект, в противном случае вернуть null
  checkWinner = () => {

    const { difficulties, currentMode, playerName, stage } = this.props.store;
    const { field } = difficulties![currentMode!];

    if (stage === Stage.WIN) return null;

    const { scoreLocal } = this;
    for (let index = 0, length = scoreLocal.length; index < length; ++index) {
      const resultAbsolute = scoreLocal[index];
      const resultRelative = resultAbsolute / Math.pow(field, 2) * 100;

      if (resultRelative > 50) {

        const winner = { date: new Date().toLocaleString() } as T.Winner;
        switch (index) {
          case 0:
            winner.winner = playerName || '';
            break
          case 1:
            winner.winner = 'computer';
            break;
          default:
            throw new Error();
        }

        return winner;
      }
    }

    return null;
  }

  sendResultsAndDispatchThem = (winner: T.Winner) => {

    // Отправка данных на сервер и обновление рейтинга победителей
    type AsyncAction = ThunkAction<void, T.State, undefined, AnyAction>;
    const asyncAction: AsyncAction = (dispatch, getState) => {

      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(winner),
      };

      fetchWrapper(GAME_WINNERS_URL, params)
        .then(res => dispatch({
          type: Action.SET_WINNERS,
          payload: res
        }));
    }

    this.props.dispatch(asyncAction);
  }

  dispatchStageWin = () => {
    this.props.dispatch({
      type: Action.SET_STAGE,
      payload: Stage.WIN,
    });
  }

  render() {
    const { difficulties, currentMode } = this.props.store;
    const { field } = difficulties![currentMode!];
    const size = `${100 / field}%`;

    // Рендер
    return (
      <div className='grid'>
        {this.grid.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className='container'
            style={{
              height: size,
              width: '100%',
              border: 'solid whitesmoke 1px'
            }}
          >
            {row.map((color, colorIndex) => (
              <div
                key={colorIndex}
                onClick={color === Color.BLUE ? this.onClick : null!}
                style={{
                  height: '100%',
                  width: size,
                  backgroundColor: color,
                  border: 'solid whitesmoke 1px'
                }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default connect(
  state => ({ store: state }),
  dispatch => ({ dispatch }),
)(Grid as any);