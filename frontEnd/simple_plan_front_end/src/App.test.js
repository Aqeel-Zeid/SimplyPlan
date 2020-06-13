import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

import {calculateBudget} from "./Pages/BookEventPage"


test('Calculate Event Budget with All 0 Values', () => {
  expect(calculateBudget(0, 0, 0 , 0 )).toBe(0)
})

test('Calculate Event Budget with All Positive Values', () => {
  expect(calculateBudget(100, 200, 300 , 400 )).toBe(1000)
})

test('Calculate Event Budget with Fractional Values', () => {
  expect(calculateBudget(100, 200, 0.3 , 4000.50 )).toBe(4300.80)
})