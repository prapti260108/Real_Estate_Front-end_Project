"use client"

import { useState, useEffect, useCallback } from "react"
import { Calculator, Banknote, Percent, CalendarDays } from "lucide-react"

const Label = ({ htmlFor, className, children }) => (
  <label htmlFor={htmlFor} className={className}>
    {children}
  </label>
)

const InputField = ({ icon, label, id, value, onChange, min, max, step, helpText }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <Label htmlFor={id} className="flex items-center gap-2 font-medium text-black">
        {icon}
        {label}
      </Label>
      <input
        id={id}
        type="number"
        value={value}
        onChange={onChange}
        className="w-2/5 rounded-md border border-black bg-white px-3 py-2 text-right text-black font-mono focus:border-black focus:ring-black"
      />
    </div>
    <input
      type="range"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
      className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer range-thumb"
    />
    <p className="text-xs text-black">{helpText}</p>
  </div>
)

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState("500000")
  const [interestRate, setInterestRate] = useState("7.5")
  const [loanTenure, setLoanTenure] = useState("20")

  const [monthlyEMI, setMonthlyEMI] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)

  const calculateEMI = useCallback(() => {
    const principal = parseFloat(loanAmount) || 0
    const rate = parseFloat(interestRate) || 0
    const tenure = parseFloat(loanTenure) || 0

    if (principal > 0 && rate > 0 && tenure > 0) {
      const monthlyRate = rate / 12 / 100
      const numberOfPayments = tenure * 12

      const emi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

      const totalAmount = emi * numberOfPayments
      const totalInterestAmount = totalAmount - principal

      setMonthlyEMI(emi)
      setTotalInterest(totalInterestAmount)
      setTotalPayment(totalAmount)
    } else {
      setMonthlyEMI(0)
      setTotalInterest(0)
      setTotalPayment(0)
    }
  }, [loanAmount, interestRate, loanTenure])

  useEffect(() => {
    const handler = setTimeout(() => {
      calculateEMI()
    }, 500)
    return () => clearTimeout(handler)
  }, [loanAmount, interestRate, loanTenure, calculateEMI])

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)

  const principalPercentage = (parseFloat(loanAmount) / totalPayment) * 100 || 0
  const interestPercentage = (totalInterest / totalPayment) * 100 || 0

  return (
    <section className="w-full bg-white text-black py-16 md:py-24 font-sans">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white border-2 border-black rounded-full mb-4">
            <Calculator className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Loan EMI Calculator</h1>
          <p className="text-lg text-black max-w-3xl mx-auto">
            Calculate your monthly EMI and plan your real estate investment with our easy-to-use loan calculator
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-black shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Loan Parameters</h2>
            <div className="space-y-8">
              <InputField
                icon={<Banknote className="w-5 h-5" />}
                label="Loan Amount (₹)"
                id="loan-amount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                min="10000"
                max="20000000"
                step="10000"
                helpText="Enter the total loan amount you need."
              />
              <InputField
                icon={<Percent className="w-5 h-5" />}
                label="Annual Interest Rate (%)"
                id="interest-rate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                min="1"
                max="20"
                step="0.1"
                helpText="Enter the annual interest rate."
              />
              <InputField
                icon={<CalendarDays className="w-5 h-5" />}
                label="Loan Tenure (Years)"
                id="loan-tenure"
                value={loanTenure}
                onChange={(e) => setLoanTenure(e.target.value)}
                min="1"
                max="30"
                step="1"
                helpText="Enter the loan repayment period in years."
              />
            </div>
          </div>

          <div className="lg:col-span-3 bg-white p-8 rounded-2xl border border-black shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Your Loan Summary</h2>

            <div className="bg-white p-6 rounded-xl mb-6 border border-black">
              <p className="text-sm mb-1">Monthly Payment (EMI)</p>
              <p className="text-4xl md:text-5xl font-bold tracking-tight">
                {formatCurrency(monthlyEMI)}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl border border-black">
                <p className="text-sm mb-1">Total Interest Payable</p>
                <p className="text-2xl font-semibold">{formatCurrency(totalInterest)}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-black">
                <p className="text-sm mb-1">Total Payment</p>
                <p className="text-2xl font-semibold">{formatCurrency(totalPayment)}</p>
              </div>
            </div>

            {monthlyEMI > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Payment Breakdown</h3>
                <div className="w-full bg-black rounded-full h-6 flex overflow-hidden border border-black">
                  <div
                    className="bg-black h-full flex items-center justify-center text-xs font-bold text-white transition-all duration-500"
                    style={{ width: `${principalPercentage}%` }}
                  >
                    {principalPercentage > 15 && `Principal`}
                  </div>
                  <div
                    className="bg-white h-full flex items-center justify-center text-xs font-bold text-black transition-all duration-500"
                    style={{ width: `${interestPercentage}%` }}
                  >
                    {interestPercentage > 15 && `Interest`}
                  </div>
                </div>
                <div className="flex justify-between text-sm mt-2 px-1">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-black"></span>
                    Principal: {formatCurrency(parseFloat(loanAmount))} ({principalPercentage.toFixed(1)}%)
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-white border border-black"></span>
                    Interest: {formatCurrency(totalInterest)} ({interestPercentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-xs text-black max-w-xl mx-auto">
            Disclaimer: This calculator provides an estimate for illustrative purposes only. The actual EMI may vary
            based on the final terms and conditions offered by your financial institution.
          </p>
        </div>
      </div>

      <style jsx>{`
        .range-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: black;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
        }
        .range-thumb::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: black;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
        }
        .range-thumb::-webkit-slider-thumb:hover {
          background: #333;
        }
      `}</style>
    </section>
  )
}
