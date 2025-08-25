import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const communities = [
  { name: "Lung Cancer", members: 1200, posts: 340, avgPoints: 120, avgPosts: 3, raised: 120000, interviews: 45, incentives: ["Interviews", "Referrals", "Signups", "Drug Trials"] },
  { name: "Diabetes", members: 2100, posts: 410, avgPoints: 98, avgPosts: 2, raised: 95000, interviews: 38, incentives: ["Interviews", "Referrals", "Signups", "Fitness Challenges"] },
  { name: "Arthritis", members: 800, posts: 220, avgPoints: 110, avgPosts: 2, raised: 60000, interviews: 22, incentives: ["Interviews", "Referrals", "Signups", "Pain Management"] },
  { name: "Breast Cancer", members: 1500, posts: 370, avgPoints: 130, avgPosts: 3, raised: 140000, interviews: 50, incentives: ["Interviews", "Referrals", "Signups", "Awareness"] },
  { name: "Heart Disease", members: 1700, posts: 320, avgPoints: 115, avgPosts: 2, raised: 110000, interviews: 40, incentives: ["Interviews", "Referrals", "Signups", "Cardio Programs"] },
  { name: "Asthma", members: 900, posts: 180, avgPoints: 90, avgPosts: 2, raised: 50000, interviews: 18, incentives: ["Interviews", "Referrals", "Signups", "Breathing Workshops"] },
  { name: "Alzheimer's", members: 600, posts: 140, avgPoints: 80, avgPosts: 1, raised: 40000, interviews: 12, incentives: ["Interviews", "Referrals", "Signups", "Memory Care"] },
  { name: "Parkinson's", members: 500, posts: 110, avgPoints: 75, avgPosts: 1, raised: 35000, interviews: 10, incentives: ["Interviews", "Referrals", "Signups", "Mobility Support"] },
  { name: "Multiple Sclerosis", members: 700, posts: 160, avgPoints: 85, avgPosts: 2, raised: 45000, interviews: 15, incentives: ["Interviews", "Referrals", "Signups", "Therapy"] },
  { name: "Epilepsy", members: 400, posts: 90, avgPoints: 70, avgPosts: 1, raised: 25000, interviews: 8, incentives: ["Interviews", "Referrals", "Signups", "Seizure Tracking"] },
  { name: "Crohn's Disease", members: 650, posts: 130, avgPoints: 80, avgPosts: 1, raised: 30000, interviews: 11, incentives: ["Interviews", "Referrals", "Signups", "Diet Support"] },
  { name: "Cystic Fibrosis", members: 350, posts: 70, avgPoints: 65, avgPosts: 1, raised: 20000, interviews: 6, incentives: ["Interviews", "Referrals", "Signups", "Caregiver Support"] },
  { name: "Sickle Cell", members: 300, posts: 60, avgPoints: 60, avgPosts: 1, raised: 15000, interviews: 5, incentives: ["Interviews", "Referrals", "Signups", "Pain Relief"] },
  { name: "HIV/AIDS", members: 1000, posts: 210, avgPoints: 95, avgPosts: 2, raised: 70000, interviews: 20, incentives: ["Interviews", "Referrals", "Signups", "Awareness"] },
  { name: "Autism", members: 1200, posts: 250, avgPoints: 100, avgPosts: 2, raised: 80000, interviews: 25, incentives: ["Interviews", "Referrals", "Signups", "Education"] },
  { name: "Depression", members: 1800, posts: 390, avgPoints: 105, avgPosts: 2, raised: 100000, interviews: 35, incentives: ["Interviews", "Referrals", "Signups", "Therapy"] },
  { name: "Anxiety", members: 1600, posts: 350, avgPoints: 102, avgPosts: 2, raised: 95000, interviews: 32, incentives: ["Interviews", "Referrals", "Signups", "Mindfulness"] },
  { name: "Obesity", members: 1400, posts: 300, avgPoints: 99, avgPosts: 2, raised: 90000, interviews: 28, incentives: ["Interviews", "Referrals", "Signups", "Fitness"] },
  { name: "Stroke", members: 800, posts: 170, avgPoints: 88, avgPosts: 1, raised: 60000, interviews: 14, incentives: ["Interviews", "Referrals", "Signups", "Rehab"] },
  { name: "COVID-19", members: 2200, posts: 480, avgPoints: 125, avgPosts: 3, raised: 150000, interviews: 55, incentives: ["Interviews", "Referrals", "Signups", "Awareness"] },
]

export default function CommunitiesPage() {
  return (
    <div className="min-h-screen py-8">
      <h2 className="font-heading text-3xl mb-8 gradient-text text-center">Health Communities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {communities.map((c) => (
          <Card key={c.name} className="web3-glow">
            <CardHeader>
              <CardTitle className="font-heading text-xl gradient-text">{c.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Members</span>
                <Badge variant="secondary">{c.members}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Posts</span>
                <Badge variant="secondary">{c.posts}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Avg Points/User</span>
                <Badge variant="secondary">{c.avgPoints}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Avg Posts/User</span>
                <Badge variant="secondary">{c.avgPosts}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Raised</span>
                <Badge variant="secondary">${c.raised.toLocaleString()}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Interviews</span>
                <Badge variant="secondary">{c.interviews}</Badge>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {c.incentives.map((i) => (
                  <Badge key={i} variant="outline">{i}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


