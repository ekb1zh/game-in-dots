import React, { useRef, useEffect } from 'react';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { Action } from '../redux';
import * as T from "../types";
import { fetchWrapper, getRandomBetween } from '../helpers';
import { GAME_WINNERS_URL, GameStage, Color } from '../index';



function Grid() {

  // Данные из redux
  const difficulties = useSelector<T.State, T.State['difficulties']>(state => state.difficulties);
  const currentMode = useSelector<T.State, T.State['currentMode']>(state => state.currentMode);
  const playerName = useSelector<T.State, T.State['playerName']>(state => state.playerName);
  const stage = useSelector<T.State, T.State['stage']>(state => state.stage);
  const score = useSelector<T.State, T.State['score']>(state => state.score);
  const dispatch = useDispatch();

  // Реф для хранения текущих данных без перерендеров
  const game = useRef() as any as React.MutableRefObject<T.Game>;

  // Обязательные данные
  if (!difficulties || !currentMode) {
    return null;
  }
  const { field, delay } = difficulties[currentMode];

  // Управляющая логика (остальное в обработчиках)
  switch (stage) {
    case GameStage.SETTING:
      clearTimer();
      newGame();
      break;
    case GameStage.PLAYING:
      if (!game.current.isStarted) {
        nextCell();
        game.current.isStarted = true;
      }
      break;
    case GameStage.WIN:
      clearTimer();
      break;
    default:
      throw new Error();
  }

  // Функция создающая объект для хранения данных в реф
  function newGame() {
    game.current = {
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
      isStarted: false,
    };
  }

  // Функция таймера
  function timerFn() {

    // Фиксация текущих результатов
    clearTimer();
    computerScoreIncrement();
    fillSelectedCell(Color.RED);

    // Если победителя пока нет, то игра продолжается
    if (!hasWinner()) {
      nextCell();
    }
  }

  // Функция для обработки кликов (всегда для синей ячейки)
  function onClick(
    this: T.Coordinate,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {

    // Фиксация текущих результатов
    clearTimer();
    playerScoreIncrement();
    fillSelectedCell(Color.GREEN);

    // Если победителя пока нет, то игра продолжается
    if (!hasWinner()) {
      nextCell();
    }
  }

  // Управляющие функции
  function nextCell() {
    selectRandomCell();
    fillSelectedCell(Color.BLUE);
    // startTimer();
  }

  function startTimer() {
    if (delay) {

      if (game.current.timerId) {
        clearTimer();
        console.error(new Error());
      }

      game.current.timerId = window.setTimeout(timerFn, delay);
    }
  }

  function clearTimer() {
    if (game.current && game.current.timerId) {
      window.clearTimeout(game.current.timerId);
      game.current.timerId = null;
    }
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
    type SyncAction = ThunkAction<void, T.State, undefined, AnyAction>;
    const syncAction: SyncAction = (dispatch, getState) => {
      const newScore = [...getState().score];
      ++newScore[0]; // player +1
      dispatch({
        type: Action.SET_SCORE,
        payload: newScore,
      });
    }

    dispatch(syncAction);
  }

  function computerScoreIncrement() {
    type SyncAction = ThunkAction<void, T.State, undefined, AnyAction>;
    const syncAction: SyncAction = (dispatch, getState) => {
      const newScore = [...getState().score];
      ++newScore[1]; // computer +1
      dispatch({
        type: Action.SET_SCORE,
        payload: newScore,
      });
    }

    dispatch(syncAction);
  }

  function hasWinner() {

    if (stage === GameStage.WIN) return true;

    for (let index = 0, length = score.length; index < length; ++index) {
      const resultAbsolute = score[index] + 1; // +1 т.к. этот метод вызывается до того как redux сможет выполнить инкремент
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
              onClick={color === Color.BLUE ? onClick.bind([rowIndex, colorIndex]) : null!}
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


