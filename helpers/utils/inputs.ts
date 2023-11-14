const inputList = {
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
      label: 'Заявки',
      functionConst: 'firstApplications',
      disabled: true,
      inputProps: '',
    },
    {
      label: 'CV2',
      functionConst: 'firstCv2',
      disabled: false,
      inputProps: '%',
    },
    {
      label: 'Продажи',
      functionConst: 'firstSells',
      disabled: true,
      inputProps: '',
    },
    {
      label: 'Средний чек',
      functionConst: 'firstBill',
      disabled: false,
      inputProps: 'P',
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
      label: 'Заявки',
      functionConst: 'sellApplications',
      disabled: true,
      inputProps: '',
    },
    {
      label: 'CV2',
      functionConst: 'sellCV2',
      disabled: false,
      inputProps: '%',
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
      label: 'CV3',
      functionConst: 'sellCV3',
      disabled: false,
      inputProps: '%',
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
  ],
  sellFunnel_03: [
    {
      label: 'Средний чек',
      functionConst: 'sellBill',
      disabled: false,
      inputProps: 'P',
    },
    {
      label: 'Выручка',
      functionConst: 'sellRevenue',
      disabled: true,
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
    {
      label: 'Кредит платеж',
      functionConst: 'constCreditPay',
      disabled: true,
      inputProps: '',
    },
    {
      label: 'Доп поле',
      functionConst: 'constAddField',
      disabled: false,
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
      label: 'Коэфф ЧП',
      functionConst: 'percentClearProfit',
      disabled: false,
      inputProps: '',
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
export default inputList;
