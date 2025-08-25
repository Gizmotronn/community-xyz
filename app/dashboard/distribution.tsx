import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function getNextDistribution() {
  // Example: next distribution in 3 days, 4 hours, 12 minutes
  return { days: 3, hours: 4, minutes: 12 }
}

export default function DistributionPage() {
  const next = getNextDistribution()
  return (
    <div className="min-h-screen py-8">
      <h2 className="font-heading text-3xl mb-8 gradient-text text-center">Next Fund Distribution</h2>
      <Card className="web3-glow mx-auto max-w-xl">
        <CardHeader>
          <CardTitle>Time Remaining</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-2 text-center">
            {next.days}d {next.hours}h {next.minutes}m
          </div>
          <div className="text-muted-foreground text-center">
            Funds are distributed to communities based on incentives, interviews, user growth, and more.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
