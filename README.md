Check this component before use this template

- components/organism/HeaderWrapper/index.tsx

***before deploy
------> /app/layout.tsx




This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


*** Warning: Prop `htmlFor` did not match. Server: ":R79krbcq:" Client: ":Rt6jddj9:"
=======>>>RESOLVE
degrade next version to nextjs 13.4.7.


-----

const User = {
    mainData: {
        name: '',
        id: '',
        registerDate: '',
    },
    closedRooms: [
        ...closedRoom,
        {
            roomName: '',
        }
    ],
    openRooms: [
        ...openRoom,
        {
            roomName: '',
            accessToken: '',
        }
    ],
    dataofAllGames: [...previosGame, {
    data: {
        roomName: '',
        tokenAccess: '',
        allRounds: [
            ...allRounds,
            {
                date: '',
                data: {
                    savedNotes: [],
                    round: 0,
                    firstShows=firstFun_Shows: '',
                    firstCv1=firstFun_CV1: '',
                    firstApplications=firstFun_Applications: '',
                    firstCv2=firstFun_CV2: '',
                    firstSells=firstFun_Sells: '',
                    firstBill=firstFun_MedBill: '',
                    firstRevenue= firstFun_OnceRevenue: '',
                    firstSpends=firstFun_VariableCosts: '',
                    firstProfit=firstFun_Profit: '',
                    sellShows=sellFunnel_01_Shows: '',
                    sellCV1=sellFunnel_01_CV1: '',
                    sellApplications=sellFunnel_01_Applications: '',
                    sellCV2=sellFunnel_01_CV2: '',
                    sellSells=sellFunnel_01_Sells: '',
                    sellCV3=sellFunnel_02_CV3: '',
                    sellConstClients=sellFunnel_02_ConstantClients: '',
                    sellTotalSells=sellFunnel_02_TotalSells: '',
                    sellRegularPay=sellFunnel_02_RegularPayClients: 0,
                    sellBill=sellFunnel_03_MedBill: '',
                    sellRevenue=sellFunnel_03_Revenue: '',
                    varSells=variableCosts_Sells: '',
                    varCosts=variableCosts_Exec: '',
                    varMarketing=variableCosts_Marketing: '',
                    varTaxes=  variableCosts_Taxes: '',
                    varTotalPercent=  variableCosts_TotalPercent: '',
                    varTotalCosts=  variableCosts_TotalCosts: '',
                    constFotOwner=  constantCosts_FotOwner: '',
                    constFot=  constantCosts_Fot: '',
                    constCreditAll=  constantCosts_CreditAll: '',
                    constCreditPay=  constantCosts_CreditPay: '',
                    constTotalCosts=  constantCosts_TotalCosts: '',
                    mainCosts=  mainCostsField_Costs: '',
                    PercentClearProfit=  mainCostsField_CoeffClearProfit: '',
                    mainClearProfit=  mainCostsField_ClearProfit: '',
                    mainMoneyFor=  mainCostsField_MoneyFor: '',
                    mainPersonalCapital=  mainCostsField_PersonalCapital: '',
            }
                cardList: [
                    ...cardList,
                    eachCard: {
                        cardTitle: '',
                        cardDescription: '',
                        otherOptions: '',
                        eachCardId: '',
                        amount: '',
                    }
                ],
            }
        ],
    }}],

}

<!-- Как Будет заканчиваться ход? -->

const mainData = {
    Users: Users.push(User),
    rooms: {
        openRooms: [
            {
                roomName: '',
                accessToken: '',
                usersAccess: Users.push(User),
            }
        ],
        closedRooms: [
            {
                roomName: '',
                accessToken: '',
                usersAccess: Users.push(User),
            }
        ]
    }
}




<!-- valuesConsts: {
            firstShows=firstFun_Shows: '',
            firstCv1=firstFun_CV1: '',
            firstApplications=firstFun_Applications: '',
            firstCv2=firstFun_CV2: '',
            firstSells=firstFun_Sells: '',
            firstBill=firstFun_MedBill: '',
            firstRevenue= firstFun_OnceRevenue: '',
            firstSpends=firstFun_VariableCosts: '',
            firstProfit=firstFun_Profit: '',
            sellShows=sellFunnel_01_Shows: '',
            sellCV1=sellFunnel_01_CV1: '',
            sellApplications=sellFunnel_01_Applications: '',
            sellCV2=sellFunnel_01_CV2: '',
            sellSells=sellFunnel_01_Sells: '',
            sellCV3=sellFunnel_02_CV3: '',
            sellConstClients=sellFunnel_02_ConstantClients: '',
            sellTotalSells=sellFunnel_02_TotalSells: '',
            sellRegularPay=sellFunnel_02_RegularPayClients: 0,
            sellBill=sellFunnel_03_MedBill: '',
            sellRevenue=sellFunnel_03_Revenue: '',
            varSells=variableCosts_Sells: '',
            varCosts=variableCosts_Exec: '',
            varMarketing=variableCosts_Marketing: '',
            varTaxes=  variableCosts_Taxes: '',
            varTotalPercent=  variableCosts_TotalPercent: '',
            varTotalCosts=  variableCosts_TotalCosts: '',
            constFotOwner=  constantCosts_FotOwner: '',
            constFot=  constantCosts_Fot: '',
            constCreditAll=  constantCosts_CreditAll: '',
            constCreditPay=  constantCosts_CreditPay: '',
            constTotalCosts=  constantCosts_TotalCosts: '',
            mainCosts=  mainCostsField_Costs: '',
            PercentClearProfit=  mainCostsField_CoeffClearProfit: '',
            maainClearProfit=  mainCostsField_ClearProfit: '',
            mainMoneyFor=  mainCostsField_MoneyFor: '',
            mainPersonalCapital=  mainCostsField_PersonalCapital: '',
        }, -->