import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux';
import * as T from "../../types";
import { isEqualsArrays, getRandomBetween } from '../../helpers';



type Coordinate = [number, number];
type Grid = Array<Array<string>>;

const colors = Object.freeze({
  blue: 'blue',
  green: 'green',
  red: 'red',
});

const enum Stage {
  GAME_START,
  GAME_END,
  GAME_ABORT,
  
  PLAYER_SUCCESS,
  PLAYER_TIME_OVER
}


function Grid() {

  console.log('render Grid')

  const dispatch = useDispatch();

  // Данные из redux
  const difficulties = useSelector<T.State, T.State['difficulties']>(state => state.difficulties);
  const currentMode = useSelector<T.State, T.State['currentMode']>(state => state.currentMode);
  const isPlaying = useSelector<T.State, T.State['isPlaying']>(state => state.isPlaying);

  // Данные из локального стейта
  const [grid, setGrid] = useState<Grid | null>(null);
  // const [currentColor, setCurrentColor] = useState<string | null>(null);
  const [currentStage, setCurrentStage] = useState(Stage.GAME_START);

  // Рабочие константы
  const currentDifficulty = difficulties && currentMode
    ? difficulties[currentMode]
    : null;

  const { field = 1, delay = null } = currentDifficulty || {};

  // Рефы
  const currentCoordinate = useRef<Coordinate>();
  const timerId = useRef<number>();
  const unfilledCells = useRef((() => {
    const array: Array<Coordinate> = [];
    for (let row = 0; row < field; ++row) {
      for (let col = 0; col < field; ++col) {
        array.push([row, col]);
      }
    }
    return array;
  })());










  // Реакция на смену данных
  useEffect(() => {

    // Сброс таймера
    if (timerId.current) {
      window.clearTimeout(timerId.current);
    }

    // Перезапись сетки
    setGrid(!isPlaying
      ? null
      : prevGrid => {

        const newGrid = prevGrid
          ? [...prevGrid]
          : new Array(field)
            .fill(null)
            .map(el => new Array(field).fill(null)) as Grid;

        // Запись текущего цвета в текущую ячейку
        {
          const [row, col] = currentCoordinate.current;
          newGrid[row][col] = currentColor;
        }

        // Выбор новой случайной ячейки
        const randomIndex = getRandomBetween(0, unfilledCells.current.length);
        currentCoordinate.current = unfilledCells.current[randomIndex];

        // Удаление ячейки из масссива незаполненных
        // !!!!!!!!!!!!!!!!!

        // Запись синего цвета в новую ячейку
        {
          const [row, col] = currentCoordinate.current;
          newGrid[row][col] = colors.blue;
        }

        return newGrid;
      }
    );

    // Перезапись цвета 
    setCurrentColor(...)

    // Запуск нового таймера
    if(delay) {
      timerId.current = window.setTimeout(timerFn, delay);
    }

  }, [isPlaying, currentColor]);


















  // Функция таймера
  function timerFn() {


  }




  // Перехватчик кликов
  function onClick(
    this: Coordinate,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {

    // Если координаты не совпали, то ничего не делать
    if (!isEqualsArrays(currentCoordinate.current, this)) {
      return;
    }


  }





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











  return !currentDifficulty ? null : (
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



