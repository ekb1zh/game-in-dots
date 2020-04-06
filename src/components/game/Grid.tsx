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


function Grid() {

  console.log('render Grid')

  const dispatch = useDispatch();

  // Данные из redux
  const difficulties = useSelector<T.State, T.State['difficulties']>(state => state.difficulties);
  const currentMode = useSelector<T.State, T.State['currentMode']>(state => state.currentMode);
  const isPlaying = useSelector<T.State, T.State['isPlaying']>(state => state.isPlaying);

  // Рабочие константы
  const difficulty = difficulties && currentMode
    ? difficulties[currentMode]
    : null;

  // Создание сетки
  const [grid, setGrid] = useState<Grid | null>(null);

  // Создание массива с координатами незаполненных ячеек
  const unfilledCells = useRef((() => {
    const array: Array<Coordinate> = [];
    for (let row = 0; row < field; ++row) {
      for (let col = 0; col < field; ++col) {
        array.push([row, col]);
      }
    }
    return array;
  })());

  // Реакция на кнопку Play
  const currentCoordinate = useRef<Coordinate>();
  const timerId = useRef<number>();

  useEffect(() => {

    if (isPlaying) {

      // Выбор и запись случайной ячейки
      const randomIndex = getRandomBetween(0, unfilledCells.current.length);
      currentCoordinate.current = unfilledCells.current[randomIndex];

      // Создание новой сетки
      const newGrid = new Array(field)
        .fill(null)
        .map(el => new Array(field).fill(null)) as Grid

      // Запись цвета в сетку
      const [row, col] = currentCoordinate.current;
      newGrid[row][col] = colors.blue;

      // Запись сетки в стейт
      setGrid(newGrid);

      // Запуск таймера
      timerId.current = window.setTimeout(timerFn, delay!);

    } else {

      // Сброс таймера
      window.clearTimeout(timerId.current)

      // Очистка сетки
      setGrid(null)
    }

  }, [isPlaying]);




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

    // Сброс таймера
    window.clearTimeout(timerId.current);

    // Запись сетки в стейт
    setGrid(prevGrid => {

      const newGrid = [...prevGrid];

      // Запись цвета в сетку
      {
        const [row, col] = currentCoordinate.current;
        newGrid[row][col] = colors.green;
      }

      // Выбор и запись случайной ячейки
      const randomIndex = getRandomBetween(0, unfilledCells.current.length);
      currentCoordinate.current = unfilledCells.current[randomIndex];

      // Запись цвета в сетку
      const [row, col] = currentCoordinate.current;
      newGrid[row][col] = colors.blue;

      return newGrid;
    });

    // Запуск нового таймера
    timerId.current = window.setTimeout(timerFn, delay!);
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



