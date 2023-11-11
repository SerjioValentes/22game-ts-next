export interface EachInput {
  label: string;
  functionConst: string;
  disabled: boolean;
  inputProps: string;
}
export interface InputList {
  firstFunnel: EachInput[];
  sellFunnel_01: EachInput[];
  sellFunnel_02: EachInput[];
  sellFunnel_03: EachInput[];
  variableCosts: EachInput[];
  constantCosts: EachInput[];
  mainCostsField: EachInput[];
}

export const inputList: InputList = {
  firstFunnel: [
    {
      label: 'Показы',
      functionConst: 'firstShows',
      disabled: false,
      inputProps: '',
    },
    {
      label: 'CV1',
      functionConst: 'firstCv1',
      disabled: false,
      inputProps: '%',
    },
    {
      label: 'CV2',
      functionConst: 'firstCv2',
      disabled: false,
      inputProps: '%',
    },
    {
      label: 'Средний чек',
      functionConst: 'firstBill',
      disabled: false,
      inputProps: 'P',
    },
  ],
  sellFunnel_01: [
    {
      label: 'Показы',
      functionConst: 'sellShows',
      disabled: false,
      inputProps: '',
    },
    {
      label: 'CV1',
      functionConst: 'sellCV1',
      disabled: false,
      inputProps: '%',
    },

    {
      label: 'CV2',
      functionConst: 'sellCV2',
      disabled: false,
      inputProps: '%',
    },
  ],
  sellFunnel_02: [
    {
      label: 'CV3',
      functionConst: 'sellCV3',
      disabled: false,
      inputProps: '%',
    },
  ],
  sellFunnel_03: [
    {
      label: 'Средний чек',
      functionConst: 'sellBill',
      disabled: false,
      inputProps: 'P',
    },
  ],
  variableCosts: [
    {
      label: 'Продажи',
      functionConst: 'varSells',
      disabled: false,
      inputProps: '%',
    },
    {
      label: 'Исполнение обязательств',
      functionConst: 'varCosts',
      disabled: false,
      inputProps: '%',
    },
    {
      label: 'Маркетинг',
      functionConst: 'varMarketing',
      disabled: false,
      inputProps: '%',
    },
    {
      label: 'Налоги',
      functionConst: 'varTaxes',
      disabled: false,
      inputProps: '%',
    },
  ],
  constantCosts: [
    {
      label: 'Фот собственника',
      functionConst: 'constFotOwner',
      disabled: false,
      inputProps: '',
    },
    {
      label: 'Фот',
      functionConst: 'constFot',
      disabled: false,
      inputProps: '',
    },
    {
      label: 'Кредит всего',
      functionConst: 'constCreditAll',
      disabled: false,
      inputProps: '',
    },
  ],
  mainCostsField: [
    {
      label: 'Коэфф ЧП',
      functionConst: 'PercentClearProfit',
      disabled: false,
      inputProps: '',
    },
  ],
};

export const inputListDisabled: any = {
  firstFunnel: [
    {
      label: 'Заявки',
      functionConst: 'firstApplications',
      disabled: true,
      inputProps: '',
    },
    {
      label: 'Продажи',
      functionConst: 'firstSells',
      disabled: true,
      inputProps: '',
    },
    {
      label: 'Выручка',
      functionConst: 'firstRevenue',
      disabled: true,
      inputProps: 'P',
    },
    {
      label: 'Переменные расходы',
      functionConst: 'firstSpends',
      disabled: true,
      inputProps: 'P',
    },
    {
      label: 'Прибыль',
      functionConst: 'firstProfit',
      disabled: true,
      inputProps: 'P',
    },
  ],
  sellFunnel_01: [
    {
      label: 'Заявки',
      functionConst: 'sellApplications',
      disabled: true,
      inputProps: '',
    },
    {
      label: 'Продажи (шт)',
      functionConst: 'sellSells',
      disabled: true,
      inputProps: '',
    },
  ],
  sellFunnel_02: [
    {
      label: 'Постоянные клиенты',
      functionConst: 'sellConstClients',
      disabled: true,
      inputProps: '',
    },
    {
      label: 'Клиенты (платят регулярно)',
      functionConst: 'sellRegularPay',
      disabled: true,
      inputProps: '',
    },
  ],
  sellFunnel_03: [
    {
      label: 'Выручка',
      functionConst: 'sellRevenue',
      disabled: true,
      inputProps: 'P',
    },
  ],
  variableCosts: [
    {
      label: 'Итого от выручки',
      functionConst: 'varTotalPercent',
      disabled: true,
      inputProps: '%',
    },
    {
      label: 'Итого',
      functionConst: 'varTotalCosts',
      disabled: true,
      inputProps: '',
    },
  ],
  constantCosts: [
    {
      label: 'Кредит платеж',
      functionConst: 'constCreditPay',
      disabled: true,
      inputProps: '',
    },
    {
      label: 'Итого',
      functionConst: 'constTotalCosts',
      disabled: true,
      inputProps: 'P',
    },
  ],
  mainCostsField: [
    {
      label: 'Расходы',
      functionConst: 'mainCosts',
      disabled: true,
      inputProps: 'P',
    },
    {
      label: 'Чистая прибыль',
      functionConst: 'mainClearProfit',
      disabled: true,
      inputProps: 'P',
    },
    {
      label: 'Денег на Расч/Счет',
      functionConst: 'mainMoneyFor',
      disabled: true,
      inputProps: 'P',
    },
  ],
};

// sellFunnel_01
// sellFunnel_02
// sellFunnel_03
// variableCosts
// constantCosts
// mainCostsField

// --------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------

export const COPY_TEXT_FIELD: any = [
  {
    title: 'Разовая воронка',
    inputList: [
      {
        label: 'Заявки',
        functionConst: 'firstApplications',
        disabled: true,
        inputProps: '',
      },
      {
        label: 'Продажи',
        functionConst: 'firstSells',
        disabled: true,
        inputProps: '',
      },
      {
        label: 'Выручка',
        functionConst: 'firstRevenue',
        disabled: true,
        inputProps: 'P',
      },
      {
        label: 'Переменные расходы',
        functionConst: 'firstSpends',
        disabled: true,
        inputProps: 'P',
      },
      {
        label: 'Прибыль',
        functionConst: 'firstProfit',
        disabled: true,
        inputProps: 'P',
      },
    ],
  },
  {
    title: 'Воронка продаж',
    inputList: [
      {
        label: 'Заявки',
        functionConst: 'sellApplications',
        disabled: true,
        inputProps: '',
      },
      {
        label: 'Продажи (шт)',
        functionConst: 'sellSells',
        disabled: true,
        inputProps: '',
      },
      {
        label: 'Постоянные клиенты',
        functionConst: 'sellConstClients',
        disabled: true,
        inputProps: '',
      },
      {
        label: 'Клиенты (платят регулярно)',
        functionConst: 'sellRegularPay',
        disabled: true,
        inputProps: '',
      },
      {
        label: 'Выручка',
        functionConst: 'sellRevenue',
        disabled: true,
        inputProps: 'P',
      },
    ],
  },
  {
    title: 'Переменные расходы',
    inputList: [
      {
        label: 'Итого от выручки',
        functionConst: 'varTotalPercent',
        disabled: true,
        inputProps: '%',
      },
      {
        label: 'Итого',
        functionConst: 'varTotalCosts',
        disabled: true,
        inputProps: '',
      },
    ],
  },
  {
    title: 'Постоянные расходы',
    inputList: [
      {
        label: 'Кредит платеж',
        functionConst: 'constCreditPay',
        disabled: true,
        inputProps: '',
      },
      {
        label: 'Итого',
        functionConst: 'constTotalCosts',
        disabled: true,
        inputProps: 'P',
      },
    ],
  },
  {
    inputList: [
      {
        label: 'Расходы',
        functionConst: 'mainCosts',
        disabled: true,
        inputProps: 'P',
      },
      {
        label: 'Чистая прибыль',
        functionConst: 'mainClearProfit',
        disabled: true,
        inputProps: 'P',
      },
      {
        label: 'Денег на Расч/Счет',
        functionConst: 'mainMoneyFor',
        disabled: true,
        inputProps: 'P',
      },
    ],
  },
];

/// ////////////// ----------- -----------<<<<<<<<<<<<  <<<<<<<<<<<<
export const COPY_INPUTS: any = [
  {
    title: 'Разовая воронка',
    inputList: [
      {
        label: 'Показы',
        functionConst: 'firstShows',
        disabled: false,
        inputProps: '',
      },
      {
        label: 'CV1',
        functionConst: 'firstCv1',
        disabled: false,
        inputProps: '%',
      },
      {
        label: 'CV2',
        functionConst: 'firstCv2',
        disabled: false,
        inputProps: '%',
      },
      {
        label: 'Средний чек',
        functionConst: 'firstBill',
        disabled: false,
        inputProps: 'P',
      },
    ],
  },
  {
    title: 'Воронка продаж',
    inputList: [
      {
        label: 'Показы',
        functionConst: 'sellShows',
        disabled: false,
        inputProps: '',
      },
      {
        label: 'CV1',
        functionConst: 'sellCV1',
        disabled: false,
        inputProps: '%',
      },

      {
        label: 'CV2',
        functionConst: 'sellCV2',
        disabled: false,
        inputProps: '%',
      },
      {
        label: 'CV3',
        functionConst: 'sellCV3',
        disabled: false,
        inputProps: '%',
      },
      {
        label: 'Средний чек',
        functionConst: 'sellBill',
        disabled: false,
        inputProps: 'P',
      },
    ],
  },
  {
    title: 'Переменные расходы',
    inputListSec: [
      {
        label: 'Продажи',
        functionConst: 'varSells',
        disabled: false,
        inputProps: '%',
      },
      {
        label: 'Исполнение обязательств',
        functionConst: 'varCosts',
        disabled: false,
        inputProps: '%',
      },
      {
        label: 'Маркетинг',
        functionConst: 'varMarketing',
        disabled: false,
        inputProps: '%',
      },
      {
        label: 'Налоги',
        functionConst: 'varTaxes',
        disabled: false,
        inputProps: '%',
      },
    ],
  },
  {
    title: 'Постоянные расходы',
    inputListSec: [
      {
        label: 'Фот собственника',
        functionConst: 'constFotOwner',
        disabled: false,
        inputProps: '',
      },
      {
        label: 'Фот',
        functionConst: 'constFot',
        disabled: false,
        inputProps: '',
      },
      {
        label: 'Кредит всего',
        functionConst: 'constCreditAll',
        disabled: false,
        inputProps: '',
      },
    ],
  },
  {
    title: '',
    inputListSec: [
      {
        label: 'Коэфф ЧП',
        functionConst: 'PercentClearProfit',
        disabled: false,
        inputProps: '',
      },
    ],
  },
];
