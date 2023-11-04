const dependenceInputFields = {
  applications: ['firstFun_Shows', 'firstFun_CV1'],
  sells: ['firstFun_CV2', 'firstFun_Shows', 'firstFun_CV1'],
  oncePayment: ['firstFun_CV2', 'firstFun_Shows', 'firstFun_CV1', 'firstFun_MedBill'],
  sellsApplication: ['sellFunnel_01_CV1', 'sellFunnel_01_Shows'],
  sellsAmount: ['sellFunnel_01_CV1', 'sellFunnel_01_Shows', 'sellFunnel_01_CV2'],
  clients: ['sellFunnel_01_CV1', 'sellFunnel_01_Shows', 'sellFunnel_01_CV2', 'sellFunnel_02_CV3'],
  earning: ['эsellFunnel_03_MedBill', 'sellFunnel_03_MedBill', 'sellFunnel_02_RegularPayClients', 'sellFunnel_02_ConstantClients', 'sellFunnel_01_CV1', 'sellFunnel_01_Shows', 'sellFunnel_01_CV2'],
  totalInProfit: ['variableCosts_Sells', 'variableCosts_Exec', 'variableCosts_Marketing', 'variableCosts_Taxes', 'firstFun_OnceRevenue'],
  totalConst: ['constantCosts_CreditPay', 'constantCosts_FotOwner', 'constantCosts_Fot', 'constantCosts_CreditAll'],
};
export default dependenceInputFields;
