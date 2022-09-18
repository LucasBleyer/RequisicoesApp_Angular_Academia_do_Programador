import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import * as moment from "moment";

export function dataFuturaValidador(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    const dataInserida = moment(control.value);
    const hoje = moment();

    const dataInseridaEhMaiorQueHoje: boolean = dataInserida.isAfter(hoje);

    return dataInseridaEhMaiorQueHoje ? { datafutura: true } : null;
  }
}
