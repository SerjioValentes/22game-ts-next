const dependenceInputFields = {
  applications: ['firstShows', 'firstCv1'],
  sells: ['firstCv2', 'firstShows', 'firstCv1'],
  oncePayment: ['firstCv2', 'firstShows', 'firstCv1', 'firstBill'],
  sellsApplication: ['sellFunsellCV1nel_01_CV1', 'sellShows'],
  sellsAmount: ['sellCV1', 'sellShows', 'sellCV2'],
  clients: ['sellCV1', 'sellShows', 'sellCV2', 'sellCV3'],
  earning: ['эsellBill', 'sellBill', 'sellRegularPay', 'sellConstClients', 'sellCV1', 'sellShows', 'sellCV2'],
  totalInProfit: ['varSells', 'varCosts', 'varMarketing', 'varTaxes', 'firstRevenue'],
  totalConst: ['constCreditPay', 'constFotOwner', 'constFot', 'constCreditAll'],
};
export default dependenceInputFields;
