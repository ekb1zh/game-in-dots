import React, { useState, useRef, useMemo } from 'react';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { Action } from '../../redux';
import * as T from "../../types";
import { isEqualsArrays, getRandomBetween } from '../../helpers';
import { fetchWrapper } from '../../helpers';
import { GAME_WINNERS_URL } from '../../App';



enum Color {
  BLUE = 'blue',
  GREEN = 'green',
  RED = 'red',
};

enum GameEvent {
  CLICK,
  TIMER,
  WIN
};


function Grid() {

  console.log('render Grid')

  const dispatch = useDispatch();

  // Данные из redux
  const difficulties = useSelector<T.State, T.State['difficulties']>(state => state.difficulties);
  const currentMode = useSelector<T.State, T.State['currentMode']>(state => state.currentMode);
  const isPlaying = useSelector<T.State, T.State['isPlaying']>(state => state.isPlaying);
  const playerName = useSelector<T.State, T.State['playerName']>(state => state.playerName);

  // Данные из локального стейта
  const [gameEvent, setGameEvent] = useState<GameEvent | null>(null);







  // Рабочие константы
  const difficulty = difficulties && currentMode
    ? difficulties[currentMode]
    : null;

  const { field = 1, delay = null } = difficulty || {};






  // Рефы
  // const timerId = useRef<number | null>(null);
  // const grid = useRef<T.Grid>([[null]]);
  // const cell = useRef<T.Coordinate>([0, 0]);
  // const score = useRef<T.Score>([0, 0]);
  // const unfilledCells = useRef<Array<T.Coordinate>>((() => {
  //   const array: Array<T.Coordinate> = [];
  //   for (let row = 0; row < field; ++row) {
  //     for (let col = 0; col < field; ++col) {
  //       array.push([row, col]);
  //     }
  //   }
  //   return array;
  // })());





  function newGame() {
    return {
      timerId: null as number | null,
      grid: [[null]] as T.Grid,
      cell: [0, 0] as T.Coordinate,
      score: [0, 0] as T.Score,
      unfilledCells: (() => {
        const array: Array<T.Coordinate> = [];
        for (let row = 0; row < field; ++row) {
          for (let col = 0; col < field; ++col) {
            array.push([row, col]);
          }
        }
        return array;
      })(),
    };
  }

  const memo = useMemo(newGame, [gameEvent]);

  const game = useRef(memo);









  // Функция таймера
  function timerFn() {
    setGameEvent(GameEvent.TIMER);
  }

  // Функция для обработки кликов
  function onClick(
    this: T.Coordinate,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    const currentCell = cell.current;

    if (!currentCell) {
      throw new Error('Coordinate must be');
    }

    if (isEqualsArrays(currentCell, this)) {
      setGameEvent(GameEvent.CLICK);
    }
  }

  // Управляющие функции
  function startTimer() {
    if (delay) {
      timerId.current = window.setTimeout(timerFn, delay);
    }
    /*DEBUG*/else throw new Error();
  }

  function clearTimer() {
    if (timerId.current) {
      window.clearTimeout(timerId.current);
    }
    /*DEBUG*/else throw new Error();
    timerId.current = null;
  }

  function selectRandomCell() {
    // Выбор случайной ячейки
    const randomIndex = getRandomBetween(0, unfilledCells.current.length);
    cell.current = unfilledCells.current[randomIndex];
    // Удаление выбранной ячейки
    unfilledCells.current.splice(randomIndex, 1);
  }

  function fillSelectedCell(color: Color) {
    const [row, col] = cell.current;
    grid.current[row][col] = color;
  }

  function checkWinners() {

    const array = score.current;
    const length = array.length;

    for (let index = 0; index < length; ++index) {
      const result = array[index];
      const filledPart = result / field * 100;

      if (filledPart <= 50) continue;

      const winner = { date: new Date().toString() } as T.Winner;
      switch (index) {
        case 0:
          winner.winner = playerName!; // !!!!!!!!!!!!!! тут имя должно быть
          break
        case 1:
          winner.winner = 'Computer';
          break;
        default:
          throw new Error(`Error index: ${index}`);
      }

      // Отправка данных на сервер и обновление рейтинга победителей
      type AsyncAction = ThunkAction<void, T.State, undefined, AnyAction>;
      const asyncAction: AsyncAction = (dispatch, getState) => {

        const postParams = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(winner)
        };

        fetchWrapper(GAME_WINNERS_URL, postParams)
          .then(res => dispatch({
            type: Action.SET_WINNERS,
            payload: res
          }));
      }

      dispatch(asyncAction);

      // Смена события
      setGameEvent(GameEvent.WIN);

      // Выход, возможно до завершения цикла
      return;
    }
  }










  // // !!!! Скорее всего при нажатии на play again нужно будет просто 
  // // сделать демонтаж, и монтаж нового компонента !!!

  // function clearGrid() {
  //   grid.current = [[null]];
  // }

  // function clearCell() {
  //   cell.current = [0, 0];
  // }

  // function clearUnfilledCells() {
  //   const value: Array<T.Coordinate> = [];
  //   for (let row = 0; row < field; ++row) {
  //     for (let col = 0; col < field; ++col) {
  //       value.push([row, col]);
  //     }
  //   }
  //   unfilledCells.current = value;
  // }

  // function clearScore() {
  //   score.current = [0, 0];
  // }

  // function clearAll() {
  //   setGameEvent(null);
  //   clearTimer();
  //   clearGrid();
  //   clearCell();
  //   clearUnfilledCells();
  //   clearScore();
  // }













  // Управляющая логика
  if (isPlaying) {

    switch (gameEvent) {

      case GameEvent.CLICK:
        clearTimer();
        fillSelectedCell(Color.GREEN);
        selectRandomCell();
        fillSelectedCell(Color.BLUE);
        startTimer();
        break;

      case GameEvent.TIMER:
        clearTimer();
        fillSelectedCell(Color.RED);
        selectRandomCell();
        fillSelectedCell(Color.BLUE);
        startTimer();
        break;

      case GameEvent.WIN:
        clearTimer();
        break;

      case null:
        // ???
        // break;
        throw new Error();

      default:
        throw new Error(`Unknown game event: ${gameEvent}`);
    }

    checkWinners();

  } else {
    clearAll();
  }



  return (
    <div>
      {(grid.current).map((row, rowIndex) => (
        <div className='row'>
          {row.map((color, colorIndex) => (
            <div
              className={color!} // !!!! по идее класс с null просто не отрисуется
              onClick={onClick.bind([rowIndex, colorIndex])}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;



