import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../../redux';
import * as T from "../../types";
import { isEqualsArrays, getRandomBetween } from '../../helpers';
import { fetchWrapper } from '../../helpers';
import { GAME_WINNERS_URL } from '../../App';


const enum Color {
  BLUE = 'blue',
  GREEN = 'green',
  RED = 'red',
};

const enum GameEvent {
  PLAYER_SUCCESS,
  PLAYER_TIME_OVER
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
  const grid = useRef<T.Grid>();
  const cell = useRef<T.Coordinate>();
  const timerId = useRef<number>();
  const unfilledCells = useRef<Array<T.Coordinate>>();
  const score = useRef<T.Score>();

  // Функция таймера
  function timerFn() {
    setGameEvent(GameEvent.PLAYER_TIME_OVER);
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
      setGameEvent(GameEvent.PLAYER_SUCCESS);
    }
  }

  // Пакет управляющих функций
  function clearTimer() {
    if (timerId.current) {
      window.clearTimeout(timerId.current);
    }
  }

  function startTimer() {
    if (delay) {
      timerId.current = window.setTimeout(timerFn, delay);
    }
  }

  function defineUnfilledCells() {
    const array: Array<T.Coordinate> = [];
    for (let row = 0; row < field; ++row) {
      for (let col = 0; col < field; ++col) {
        array.push([row, col]);
      }
    }
    unfilledCells.current = array;
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

  function crearAll() {
    setGameEvent(null);
    grid.current = undefined;
    cell.current = undefined;
    timerId.current = undefined;
    unfilledCells.current = undefined;
    score.current = undefined;
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
          winner.winner = playerName;
          break
        case 1:
          winner.winner = 'Computer';
          break;
        default:
          throw new Error(`Error index: ${index}`);
      }

      // Отправка данных на сервер
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
            type: Actions.SET_WINNERS,
            payload: res
          }));
      }

      dispatch(asyncAction);

      // Выход без завершения цикла
      return;
    }
  }

  // Управляющая логика






  /*
    isPlay === true
      выбор новой ячейки
      запись цвета в новую ячейку
      запуск нового таймера

    isPlay === false
      сброс старого таймера
      очистка всего

    клик
      координаты === совпали
        сброс старого таймера
        запись ЗЕЛЕНОГО цвета в старую ячейку
        выбор новой ячейки
        запись СИНЕГО цвета в новую ячейку
        запуск нового таймера

      координаты === не совпали
        ничего не делать

    окончание таймера
      сброс старого таймера
      выбор новой ячейки
      запись КРАСНОГО цвета в старую ячейку
      запись СИНЕГО цвета в новую ячейку
      запуск нового таймера
    
    когда у кого-то заполненные > 50% ячеек
      отправить результаты на сервер
      тут же перезапросить и отобразить
  */









  // Реакция на смену данных
  useEffect(() => {






    // Стадии 
    // switch (currentStage) {

    //   case Stage.GAME_END:
    //     break;

    //   case Stage.GAME_START: {
    //     break;
    //   }


    //   case Stage.PLAYER_SUCCESS: {
    //     break;
    //   }

    //   case Stage.PLAYER_TIME_OVER: {
    //     break;
    //   }

    //   default:
    //     throw new Error(`Unknown stage: ${currentStage}`);
    // }






    if (isPlaying) {




    } else {

    }





    // Перезапись сетки
    setGrid(!isPlaying
      ? null
      : prevGrid => {

        const newGrid = prevGrid
          ? [...prevGrid]
          : new Array(field)
            .fill(null)
            .map(el => new Array(field).fill(null)) as T.Grid;

        // Запись текущего цвета в текущую ячейку
        {
          const [row, col] = cell.current;
          newGrid[row][col] = currentColor;
        }

        // Выбор новой случайной ячейки

        // Удаление ячейки из масссива незаполненных
        // !!!!!!!!!!!!!!!!!

        // Запись синего цвета в новую ячейку
        {
          const [row, col] = cell.current;
          newGrid[row][col] = Color.BLUE;
        }

        return newGrid;
      }
    );

  }, [isPlaying, gameEvent]);





























  return !difficulty ? null : (
    <div>
      {grid.map((row, rowIndex) => (
        <div className='row'>
          {row.map((color, colorIndex) => (
            <div
              className={color}
              onClick={onClick.bind([rowIndex, colorIndex])}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;



