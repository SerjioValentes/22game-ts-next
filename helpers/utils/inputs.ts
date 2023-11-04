const inputList = {
  firstFunnel: [
    {
      label: 'Показы',
      functionConst: 'firstFun_Shows',
      disabled: false,
      inputProps: '',
    },
    {
      label: 'CV1',
      functionConst: 'firstFun_CV1',
      disabled: false,
      inputProps: '%',
    },
    {
      label: 'Заявки',
      functionConst: 'firstFun_Applications',
      disabled: true,
      inputProps: '',
    },
    {
      label: 'CV2',
      functionConst: 'firstFun_CV2',
      disabled: false,
      inputProps: '%',
    },
    {
      label: 'Продажи',
      functionConst: 'firstFun_Sells',
      disabled: true,
      inputProps: '',
    },
    {
      label: 'Средний чек',
      functionConst: 'firstFun_MedBill',
      disabled: false,
      inputProps: 'P',
    },
    {
      label: 'Разовая выручка',
      functionConst: 'firstFun_OnceRevenue',
      disabled: true,
      inputProps: 'P',
    },
    {
      label: 'Переменные расходы',
      functionConst: 'firstFun_VariableCosts',
      disabled: true,
      inputProps: 'P',
    },
    {
      label: 'Прибыль',
      functionConst: 'firstFun_Profit',
      disabled: true,
      inputProps: 'P',
    },
  ],
  sellFunnel_01: [
    {
      label: 'Показы',
      functionConst: 'sellFunnel_01_Shows',
      disabled: false,
      inputProps: '',
    },
    {
      label: 'CV1',
      functionConst: 'sellFunnel_01_CV1',
      disabled: false,
      inputProps: '%',
    },
    {
      label: 'Заявки',
      functionConst: 'sellFunnel_01_Applications',
      disabled: true,
      inputProps: '',
    },
    {
      label: 'CV2',
      functionConst: 'sellFunnel_01_CV2',
      disabled: false,
      inputProps: '%',
    },
    {
      label: 'Продажи (шт)',
      functionConst: 'sellFunnel_01_Sells',
      disabled: true,
      inputProps: '',
    },
  ],
  sellFunnel_02: [
    {
      label: 'CV3',
      functionConst: 'sellFunnel_02_CV3',
      disabled: false,
      inputProps: '%',
    },
    {
      label: 'Постоянные клиенты',
      functionConst: 'sellFunnel_02_ConstantClients',
      disabled: true,
      inputProps: '',
    },
    {
      label: 'Клиенты (платят регулярно)',
      functionConst: 'sellFunnel_02_RegularPayClients',
      disabled: true,
      inputProps: '',
    },
  ],
  sellFunnel_03: [
    {
      label: 'Средний чек',
      functionConst: 'sellFunnel_03_MedBill',
      disabled: false,
      inputProps: 'P',
    },
    {
      label: 'Выручка',
      functionConst: 'sellFunnel_03_Revenue',
      disabled: true,
      inputProps: 'P',
    },
  ],
  variableCosts: [
    {
      label: 'Продажи',
      functionConst: 'variableCosts_Sells',
      disabled: false,
      inputProps: '%',
    },
    {
      label: 'Исполнение обязательств',
      functionConst: 'variableCosts_Exec',
      disabled: false,
      inputProps: '%',
    },
    {
      label: 'Маркетинг',
      functionConst: 'variableCosts_Marketing',
      disabled: false,
      inputProps: '%',
    },
    {
      label: 'Налоги',
      functionConst: 'variableCosts_Taxes',
      disabled: false,
      inputProps: '%',
    },
    {
      label: 'Итого % от выручки',
      functionConst: 'variableCosts_TotalPercent',
      disabled: true,
      inputProps: '%',
    },
    {
      label: 'Итого переменные',
      functionConst: 'variableCosts_TotalCosts',
      disabled: true,
      inputProps: '',
    },
  ],
  constantCosts: [
    {
      label: 'Фот собственника',
      functionConst: 'constantCosts_FotOwner',
      disabled: false,
      inputProps: '',
    },
    {
      label: 'Фот',
      functionConst: 'constantCosts_Fot',
      disabled: false,
      inputProps: '',
    },
    {
      label: 'Кредит всего',
      functionConst: 'constantCosts_CreditAll',
      disabled: false,
      inputProps: '',
    },
    {
      label: 'Кредит платеж',
      functionConst: 'constantCosts_CreditPay',
      disabled: true,
      inputProps: '',
    },
    {
      label: 'Итого постоянный',
      functionConst: 'constantCosts_TotalCosts',
      disabled: true,
      inputProps: 'P',
    },
  ],
  mainCostsField: [
    {
      label: 'Расходы',
      functionConst: 'mainCostsField_Costs',
      disabled: true,
      inputProps: 'P',
    },
    {
      label: 'Коэфф ЧП',
      functionConst: 'mainCostsField_CoeffClearProfit',
      disabled: false,
      inputProps: '',
    },
    {
      label: 'Чистая прибыль',
      functionConst: 'mainCostsField_ClearProfit',
      disabled: true,
      inputProps: 'P',
    },
    {
      label: 'Денег на Расч/Счет',
      functionConst: 'mainCostsField_MoneyFor',
      disabled: true,
      inputProps: 'P',
    },
  ],
};
export default inputList;
