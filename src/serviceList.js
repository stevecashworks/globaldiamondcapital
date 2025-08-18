
const getServiceList=(isLogged)=>{

return   [
    {
      title: `Medical Support`,
    href: isLogged?"/dashboard/medicalsupport":"/medicalsupport",
  },
  {
    title: " COVID 19 Benefits",
    href: isLogged? "/dashboard/covid":"/COVID19Benefits",
  },

  {
    title: "Investment plans",
    subs: [
      "Real estates",
      "fixed deposit",
      "crypto currency",
      "medical",
      "cannabis",
      "retirement",
      "truck",
      "crude oil",
    ],
    href: isLogged?"/invest":"/register",
  },

  {
    title: "Essential Health Benefits",
    href: "/healthBenefits",
  },

  {
    title: "Health Insurance",
    href: isLogged?"/dashboard/insurance":"/healthinsurance",
  },
  
  {
    title: "Cash contribution",
    href: isLogged?"/dashboard/contribution":"/cashcontribution",
  },
  {
    title: "travel & expense",
    href:isLogged? "/dashboard/trips":"/travelandexpense",
  },
  
  "Agricultural investment",
  
  "Automobile  multinvestment",
  
  "Travel and expense (T&E)    management/business travel allowance or business travel compensation provider.(Reimbursed expenses,Flat travel allowance etc.)",
];

// Everyone must register with id
}

export default getServiceList;
