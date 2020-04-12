import React, { useRef, useEffect } from 'react';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { Action } from '../redux';
import * as T from "../types";
import { fetchWrapper, getRandomBetween } from '../helpers';
import { GAME_WINNERS_URL, GameStage, Color } from '../index';

let ref = null as any;

function Grid() {

  // debugger;
  // console.log('render Grid')

  // Данные из redux
  const state = useSelector<T.State, T.State>(state => state); // нужна ссылка на весь объект
  const dispatch = useDispatch();

  // Реф для хранения текущих данных без перерендеров
  const game = useRef() as any as React.MutableRefObject<T.Game>;

  useEffect(() => {
    console.log({'stage': state.stage})
  }, [state.stage])

  // Обязательные данные
  if (!state.difficulties || !state.currentMode) {
    return null;
  }

  // Управляющая логика (остальное в обработчиках)
  switch (state.stage) {
    case GameStage.SETTING:
      clearTimer();
      newGame();
      console.log({ 'game.current': game.current })
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

  console.log(ref === game);
  ref = game


  // Функция создающая объект для хранения данных в реф
  function newGame() {
    console.log('newGame')
    const field = state.difficulties![state.currentMode!].field; // проверка есть выше
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

    console.log('timerId', game.current.timerId)

    // Фиксация текущих результатов
    clearTimer();
    computerScoreIncrement();
    fillSelectedCell(Color.RED);

    console.log('timerFn', { score: state.score })

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
    const delay = state.difficulties![state.currentMode!].delay; // проверка есть выше
    if (delay) {

      if (game.current.timerId) {
        clearTimer();
        console.log('Внеочередная ошибка таймера')
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
      console.log('newScore[0]', newScore[0])
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
      console.log('newScore[1]', newScore[1])
      dispatch({
        type: Action.SET_SCORE,
        payload: newScore,
      });
    }

    dispatch(syncAction);
  }

  function hasWinner() {

    if (state.stage === GameStage.WIN) return true;

    const { difficulties, currentMode, playerName, score } = state;
    const { field } = difficulties![currentMode!];

    for (let index = 0, length = score.length; index < length; ++index) {
      const resultAbsolute = score[index] + 1; // +1 т.к. этот метод вызывается до того как redux смоежт выполнить инкремент
      const resultRelative = resultAbsolute / Math.pow(field, 2) * 100;
      console.log({ index, field, resultAbsolute, resultRelative })

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
  const size = `${100 / state.difficulties![state.currentMode!].field}%`; // проверка есть выше
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



