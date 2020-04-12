import React from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { Action } from '../redux';
import * as T from "../types";
import { fetchWrapper, getRandomBetween } from '../helpers';
import { GAME_WINNERS_URL, GameStage, Color } from '../index';


/*
  Ошибки:
    1. При первом таймауте не происходит перехода к след ячейфке,
    в т.ч. заливки текущей и переход к новой.
    При этом если хотябы один раз таймер сработал, то при клике пользователя 
    зальётся две ячейки
    2. Математика в счёте, у компанормально, у плейера не очень.
    2. Бросаются ошибки при очистке таймеров - это и есть проблемы в общей логике программы!!
*/


type Props = Readonly<{
  store: T.State
  dispatch: any
}>

class Grid extends React.Component<Props> {

  private timerId: number | null;
  private cell: T.Coordinate | null;
  private isStarted: boolean;
  private grid: T.Grid;
  private unfilledCells: Array<T.Coordinate>;

  constructor(readonly props: Props) {

    super(props);

    this.getNewGrid = this.getNewGrid.bind(this);
    this.getNewUnfilledCells = this.getNewUnfilledCells.bind(this);

    this.timer = this.timer.bind(this)

    const { difficulties, currentMode } = this.props.store;
    const { field } = difficulties![currentMode!];

    this.timerId = null;
    this.cell = [0, 0];
    this.isStarted = false;

    this.grid = this.getNewGrid(field);
    this.unfilledCells = this.getNewUnfilledCells(field);
  }

  shouldComponentUpdate(newProps: Props) {
    debugger

    const { difficulties, currentMode } = newProps.store;
    const { field } = difficulties![currentMode!];

    const isFieldEquals =
      field === this.props.store.difficulties![this.props.store.currentMode!].field;

    // Если размеры сетки изменились, обновить сетку
    if (!isFieldEquals) {
      this.grid = this.getNewGrid(field);
      this.unfilledCells = this.getNewUnfilledCells(field);
    }

    // Первый запуск таймера
    const { stage } = newProps.store;
    if (!this.isStarted && stage === GameStage.PLAYING) {
      this.selectRandomCell();
      this.fillSelectedCell(Color.BLUE);
      this.startTimer();
      this.isStarted = true;
    }

    // Всегда true
    return true;
  }

  componentWillUnmount() {
    // Отписка от таймера
    this.clearTimer();
    console.log('unmounted')
  }

  getNewGrid = (size: number) => {
    return new Array(size)
      .fill(null)
      .map(el => new Array(size).fill(Color.DEFAULT)) as Array<Array<string>>;
  }

  getNewUnfilledCells = (size: number) => {
    const array: Array<T.Coordinate> = [];
    for (let row = 0; row < size; ++row) {
      for (let col = 0; col < size; ++col) {
        array.push([row, col]);
      }
    }
    return array;
  }

  timer = () => {
    console.log('timer')
    debugger

    // Фиксация текущих результатов
    this.clearTimer();
    this.fillSelectedCell(Color.RED);
    debugger

    // Если победителя пока нет, то игра продолжается
    if (!this.hasWinner()) {
      this.selectRandomCell();
      this.fillSelectedCell(Color.BLUE);
      this.startTimer();
    }

    // Изменение игрового счёта и перерендер
    this.computerScoreIncrement();
  }

  // Функция для обработки кликов
  onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    debugger

    // Фиксация текущих результатов
    this.clearTimer();
    this.fillSelectedCell(Color.GREEN);

    // Если победителя пока нет, то игра продолжается
    if (!this.hasWinner()) {
      this.selectRandomCell();
      this.fillSelectedCell(Color.BLUE);
      this.startTimer();
    }

    // Изменение игрового счёта и перерендер
    this.playerScoreIncrement();
  }

  startTimer = () => {
    debugger

    const { difficulties, currentMode } = this.props.store;
    const { delay } = difficulties![currentMode!];
    if (delay) {
      if (typeof this.timerId === 'number') {
        console.error(new Error());
        this.clearTimer();
      }
      this.timerId = window.setTimeout(this.timer, delay);
    }
  }

  clearTimer = () => {
    debugger

    if (typeof this.timerId === 'number') {
      window.clearTimeout(this.timerId);
      this.timerId = null;
      return;
    }
    console.error(new Error());
  }

  selectRandomCell = () => {
    debugger

    // Если ячейки закончились, то будет null
    if (!this.unfilledCells.length) {
      this.cell = null;
    }

    // Выбор случайной ячейки
    const randomIndex = getRandomBetween(0, this.unfilledCells.length);
    this.cell = this.unfilledCells[randomIndex];

    // Удаление выбранной ячейки
    this.unfilledCells.splice(randomIndex, 1);
  }

  fillSelectedCell = (color: Color) => {
    debugger

    // Если ячейки закончили, то будет null
    if (this.cell) {
      const [row, col] = this.cell;
      this.grid[row][col] = color;
      console.log(this.grid[row][col], row, col, color)
    }
  }

  playerScoreIncrement = () => {
    debugger

    type SyncAction = ThunkAction<void, T.State, undefined, AnyAction>;
    const syncAction: SyncAction = (dispatch, getState) => {
      const newScore = [...getState().score];
      ++newScore[0]; // player +1
      dispatch({
        type: Action.SET_SCORE,
        payload: newScore,
      });
    }

    this.props.dispatch(syncAction);
  }

  computerScoreIncrement = () => {
    debugger

    type SyncAction = ThunkAction<void, T.State, undefined, AnyAction>;
    const syncAction: SyncAction = (dispatch, getState) => {
      const newScore = [...getState().score];
      ++newScore[1]; // computer +1
      dispatch({
        type: Action.SET_SCORE,
        payload: newScore,
      });
    }

    this.props.dispatch(syncAction);
  }

  hasWinner = () => {
    debugger

    const { difficulties, currentMode, playerName, stage } = this.props.store;
    const { field } = difficulties![currentMode!];
    const { score } = this.props.store;
    const { dispatch } = this.props;

    if (stage === GameStage.WIN) return true;

    for (let index = 0, length = score.length; index < length; ++index) {
      const resultAbsolute = score[index];
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

        dispatch(asyncAction);

        // Смена стадии игры
        dispatch({
          type: Action.SET_STAGE,
          payload: GameStage.WIN,
        });

        // Выход до завершения цикла
        return true;
      }
    }

    return false;
  }


  render() {
    debugger

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