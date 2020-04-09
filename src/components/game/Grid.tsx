import React, { useState, useRef } from 'react';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { Action } from '../../redux';
import * as T from "../../types";
import { isEqualsArrays, getRandomBetween } from '../../helpers';
import { fetchWrapper } from '../../helpers';
import { GAME_WINNERS_URL } from '../../App';



enum Color {
  DEFAULT = 'transparent',
  BLUE = 'blue',
  GREEN = 'green',
  RED = 'red',
};

enum GameStage {
  NEW,
  CLICK,
  TIMER,
  WIN
};


function Grid() {

  console.log('render Grid')


  // Данные из redux
  const difficulties = useSelector<T.State, T.State['difficulties']>(state => state.difficulties)!;
  const currentMode = useSelector<T.State, T.State['currentMode']>(state => state.currentMode)!;
  const playerName = useSelector<T.State, T.State['playerName']>(state => state.playerName);
  const isPlaying = useSelector<T.State, T.State['isPlaying']>(state => state.isPlaying);
  const dispatch = useDispatch();

  // Данные из локального стейта
  const [gameStage, setGameStage] = useState(GameStage.NEW);

  // Реф для хранения текущих данных
  const game = useRef() as any as React.MutableRefObject<T.Game>;

  // Рабочие константы
  const { field, delay } = difficulties[currentMode];

  // Управляющая логика
  if (isPlaying) {

    switch (gameStage) {

      case GameStage.NEW:
        newGame();
        selectRandomCell();
        fillSelectedCell(Color.BLUE);
        startTimer();
        break;

      case GameStage.CLICK:
        clearTimer();
        playerScoreIncrement();
        checkWinners();
        fillSelectedCell(Color.GREEN);
        selectRandomCell();
        fillSelectedCell(Color.BLUE);
        startTimer();
        break;

      case GameStage.TIMER:
        clearTimer();
        computerScoreIncrement();
        checkWinners();
        fillSelectedCell(Color.RED);
        selectRandomCell();
        fillSelectedCell(Color.BLUE);
        startTimer();
        break;

      case GameStage.WIN:
        clearTimer();
        break;

      default:
        throw new Error(`Unknown game event: ${gameStage}`);
    }

  } else {

    if (gameStage !== GameStage.NEW) {
      setGameStage(GameStage.NEW);
    }

    if (!game.current) {
      newGame();
    }
  }

  // Функция создающая объект для хранения данных в реф
  function newGame() {
    game.current = {
      score: [0, 0],
      timerId: null,
      cell: [0, 0],
      grid: new Array(field)
        .fill(null)
        .map(el => new Array(field).fill(Color.DEFAULT)),
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

  // Функция таймера
  function timerFn() {
    setGameStage(GameStage.TIMER);
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
      setGameStage(GameStage.CLICK);
    }
  }

  // Управляющие функции
  function startTimer() {
    if (delay) {
      game.current.timerId = window.setTimeout(timerFn, delay);
    }
    /*DEBUG*/else console.log('startTimer')
  }

  function clearTimer() {
    if (game.current.timerId) {
      window.clearTimeout(game.current.timerId);
    }
    /*DEBUG*/else console.log('clearTimer')
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

  function playerScoreIncrement() {
    ++game.current.score[0];
  }

  function computerScoreIncrement() {
    ++game.current.score[1];
  }

  function checkWinners() {

    const array = game.current.score;
    const length = array.length;

    for (let index = 0; index < length; ++index) {
      const result = array[index];
      const filledPart = result / field * 100;

      if (filledPart <= 50) continue;

      const winner = { date: new Date().toString() } as T.Winner;
      switch (index) {
        case 0:
          winner.winner = playerName || '';
          break
        case 1:
          winner.winner = 'computer';
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
      setGameStage(GameStage.WIN);

      // Выход, возможно до завершения цикла
      return;
    }
  }

  // Render
  const size = `${100 / field}%`;
  return (
    <div className='grid'>
      {(game.current.grid).map((row, rowIndex) => (
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
              onClick={onClick.bind([rowIndex, colorIndex])}
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

export default Grid;



