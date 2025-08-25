"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { getContractEvents, addContractEvent, ContractEvent } from "../components/contract-storage"

const contractCode = `// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract CommunityReserve {\n    address public owner;\n    mapping(address => uint256) public balances;\n    event Invest(address indexed user, uint256 amount);\n    event Distribute(address indexed community, uint256 amount);\n\n    constructor() {\n        owner = msg.sender;\n    }\n\n    function invest() public payable {\n        balances[msg.sender] += msg.value;\n        emit Invest(msg.sender, msg.value);\n    }\n\n    function distribute(address community, uint256 amount) public {\n        require(msg.sender == owner, \"Only owner\");\n        require(address(this).balance >= amount, \"Insufficient reserve\");\n        payable(community).transfer(amount);\n        emit Distribute(community, amount);\n    }\n}`

export default function ContractPage() {
  const [events, setEvents] = useState<ContractEvent[]>(getContractEvents())

  function handleInvest() {
    addContractEvent({ id: events.length + 1, type: 'Invest', user: '0xuser...', amount: 10000, date: new Date().toISOString().slice(0,10) })
    setEvents(getContractEvents())
  }
  function handleDistribute() {
    addContractEvent({ id: events.length + 1, type: 'Distribute', user: '0xadmin...', community: 'Lung Cancer', amount: 5000, date: new Date().toISOString().slice(0,10) })
    setEvents(getContractEvents())
  }

  return (
    <div className="min-h-screen py-8">
      <h2 className="font-heading text-3xl mb-8 gradient-text text-center">Smart Contract</h2>
      <Card className="web3-glow">
        <CardHeader>
          <CardTitle>Community Reserve Contract</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-background text-foreground p-4 rounded-lg overflow-x-auto text-xs md:text-sm mb-4 border border-border">
            {contractCode}
          </pre>
          <div className="flex gap-4 mb-6">
            <Button variant="outline" onClick={handleInvest}>Invest</Button>
            <Button variant="outline" onClick={handleDistribute}>Distribute</Button>
          </div>
          <div>
            <h3 className="font-heading text-lg mb-2">Contract Events</h3>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2">Date</th>
                  <th className="py-2">Type</th>
                  <th className="py-2">User</th>
                  <th className="py-2">Community</th>
                  <th className="py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {events.map(ev => (
                  <tr key={ev.id} className="border-b border-border">
                    <td className="py-2">{ev.date}</td>
                    <td className="py-2">{ev.type}</td>
                    <td className="py-2">{ev.user}</td>
                    <td className="py-2">{ev.community || '-'}</td>
                    <td className="py-2">${ev.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

