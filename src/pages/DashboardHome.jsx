import { FileText, BookOpen, Users, TrendingUp } from 'lucide-react'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { DummyTable } from '@/components/dashboard/DummyTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Upload, Plus } from 'lucide-react'

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your study overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatsCard
          title="Total Notes"
          value="127"
          description="All your notes"
          icon={FileText}
          trend={12}
        />
        <StatsCard
          title="Subjects"
          value="8"
          description="Active subjects"
          icon={BookOpen}
          trend={2}
        />
        <StatsCard
          title="Classmates"
          value="24"
          description="Connected peers"
          icon={Users}
          trend={5}
        />
        <StatsCard
          title="This Week"
          value="15"
          description="Notes uploaded"
          icon={TrendingUp}
          trend={8}
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Note
            </Button>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Subject
            </Button>
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Invite Classmate
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Uploads Table */}
      <DummyTable />
    </div>
  )
}

