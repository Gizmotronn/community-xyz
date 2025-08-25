"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { getTransactions, addTransaction, Transaction } from "../components/transaction-storage"

export default function TransactionsPage() {
  const [txs, setTxs] = useState<Transaction[]>(getTransactions())

  function handleAddInvest() {
    addTransaction({ id: txs.length + 1, type: "Invest", group: "Diabetes", amount: 10000, date: new Date().toISOString().slice(0,10), info: "User invested in Diabetes community" })
    setTxs(getTransactions())
  }
  function handleAddDistribute() {
    addTransaction({ id: txs.length + 1, type: "Distribute", group: "Lung Cancer", amount: 5000, date: new Date().toISOString().slice(0,10), info: "Funds distributed to Lung Cancer community" })
    setTxs(getTransactions())
  }

  return (
    <div className="min-h-screen py-8">
      <h2 className="font-heading text-3xl mb-8 gradient-text text-center">Transactions</h2>
      <Card className="web3-glow">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <button className="px-4 py-2 rounded bg-secondary text-secondary-foreground font-semibold" onClick={handleAddInvest}>Add Invest</button>
            <button className="px-4 py-2 rounded bg-accent text-accent-foreground font-semibold" onClick={handleAddDistribute}>Add Distribute</button>
          </div>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2">Date</th>
                <th className="py-2">Type</th>
                <th className="py-2">Group</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Info</th>
              </tr>
            </thead>
            <tbody>
              {txs.map(tx => (
                <tr key={tx.id} className="border-b border-border">
                  <td className="py-2">{tx.date}</td>
                  <td className="py-2"><Badge variant={tx.type === "Invest" ? "secondary" : "outline"}>{tx.type}</Badge></td>
                  <td className="py-2">{tx.group}</td>
                  <td className="py-2">${tx.amount.toLocaleString()}</td>
                  <td className="py-2">{tx.info}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

