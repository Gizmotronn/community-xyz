import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChartComponent } from "@/components/ui/pie-chart"

const feeSplit = [
  { label: "Community Member", value: 40 },
  { label: "Local DAO Reserve", value: 25 },
  { label: "Onboarding Org", value: 15 },
  { label: "Health Protocol Treasury", value: 20 },
]

export default function FeeSplitPage() {
  return (
    <div className="min-h-screen py-8">
      <h2 className="font-heading text-3xl mb-8 gradient-text text-center">Fee Split Mechanism</h2>
      <Card className="web3-glow mx-auto max-w-xl">
        <CardHeader>
          <CardTitle>Fee Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <PieChartComponent data={feeSplit} />
          <ul className="mt-6 space-y-2">
            {feeSplit.map(f => (
              <li key={f.label} className="flex justify-between">
                <span>{f.label}</span>
                <span className="font-bold">{f.value}%</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
