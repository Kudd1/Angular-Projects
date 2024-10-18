import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: 'calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  displayValue: string = '0';
  operation: string = '';
  firstOperand: number | null = null;
  operator: string | null = null;
  waitingForSecondOperand: boolean = false;

  appendNumber(number: number) {
    if (this.waitingForSecondOperand) {
      this.displayValue = String(number);
      this.waitingForSecondOperand = false;
    } else {
      this.displayValue = this.displayValue === '0' ? String(number) : this.displayValue + String(number);
    }
  }

  appendDecimal() {
    if (!this.displayValue.includes('.')) {
      this.displayValue += '.';
    }
  }

  addOperation(nextOperator: string) {
    const inputValue = parseFloat(this.displayValue);
    if (this.operator && this.waitingForSecondOperand) {
      this.operator = nextOperator;
      return;
    }
    if (this.firstOperand === null) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.calculate(this.firstOperand, inputValue, this.operator);
      this.displayValue = String(result);
      this.firstOperand = result;
    }
    this.operator = nextOperator;
    this.waitingForSecondOperand = true;
  }

  calculateResult() {
    const secondOperand = parseFloat(this.displayValue);
    if (this.firstOperand === null || this.operator === null) return;
    const result = this.calculate(this.firstOperand, secondOperand, this.operator);
    this.displayValue = String(result);
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }

  clear() {
    this.displayValue = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }

  calculate(firstOperand: number, secondOperand: number, operator: string): number {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '×':
        return firstOperand * secondOperand;
      case '÷':
        return secondOperand !== 0 ? firstOperand / secondOperand : NaN;
      case '%':
        return (firstOperand * secondOperand) / 100;
      default:
        return secondOperand;
    }
  }
}
