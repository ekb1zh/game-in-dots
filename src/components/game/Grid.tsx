import React, { useState, useRef, useMemo, useEffect } from 'react';
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
  const isPlaying = useSelector<T.State, T.State['isPlaying']>(state => state.isPlaying);
  const difficulties = useSelector<T.State, T.State['difficulties']>(state => state.difficulties);
  const currentMode = useSelector<T.State, T.State['currentMode']>(state => state.currentMode);
  const playerName = useSelector<T.State, T.State['playerName']>(state => state.playerName);

  // Данные из локального стейта
  const [gameEvent, setGameEvent] = useState<GameEvent | null>(null);

  // Данные не вызывающие перерендер
  const memo = useMemo(newGame, []); // оптимизация, чтобы не создавать лишние объекты с массивами
  const game = useRef(memo);

  // Рабочие константы
  const difficulty = difficulties && currentMode
    ? difficulties[currentMode]
    : null;

  // Реакция на изменение
  useEffect(() => {
    // unfilledCells = (() => {
    //   const array: Array<T.Coordinate> = [];
    //   for (let row = 0; row < field; ++row) {
    //     for (let col = 0; col < field; ++col) {
    //       array.push([row, col]);
    //     }
    //   }
    //   return array;
  }, [])




  if (!difficulty) return null;





  // Функция создающая объект для хранения данных как реф
  function newGame() {
    return {
      timerId: null as number | null,
      grid: [[null]] as T.Grid,
      cell: [0, 0] as T.Coordinate,
      score: [0, 0] as T.Score,
      unfilledCells: [[0, 0]] as Array<T.Coordinate> // !!!!!!!!! должно быть условие которое потом увеличит этот массив
    };
  }

  // Функция таймера
  function timerFn() {
    setGameEvent(GameEvent.TIMER);
  }

  // Функция для обработки кликов
  function onClick(
    this: T.Coordinate,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    const currentCell = game.current.cell;

    if (!currentCell) {
      throw new Error('Coordinate must be');
    }

    if (isEqualsArrays(currentCell, this)) {
      setGameEvent(GameEvent.CLICK);
    }
  }

  // Управляющие функции
  function startTimer() {
    if (difficulty && difficulty.delay) {
      game.current.timerId = window.setTimeout(timerFn, difficulty.delay);
    }
    /*DEBUG*/else throw new Error();
  }

  function clearTimer() {
    if (game.current.timerId) {
      window.clearTimeout(game.current.timerId);
    }
    /*DEBUG*/else throw new Error();
    game.current.timerId = null;
  }

  function selectRandomCell() {
    // Выбор случайной ячейки
    const randomIndex = getRandomBetween(0, game.current.unfilledCells.length);
    game.current.cell = game.current.unfilledCells[randomIndex];

    // Удаление выбранной ячейки
    game.current.unfilledCells.splice(randomIndex, 1);
  }

  function fillSelectedCell(color: Color) {
    const [row, col] = game.current.cell;
    game.current.grid[row][col] = color;
  }

  function checkWinners() {

    const array = game.current.score;
    const length = array.length;

    for (let index = 0; index < length; ++index) {
      const { field } = difficulty!; // !!!!!!!!!!!!!!!!! выше есть проверка
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
        // ???????????????????????
        // break;
        throw new Error();

      default:
        throw new Error(`Unknown game event: ${gameEvent}`);
    }

    checkWinners();

  } else {
    game.current = newGame();
  }



  return (
    <div>
      {(game.current.grid).map((row, rowIndex) => (
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



