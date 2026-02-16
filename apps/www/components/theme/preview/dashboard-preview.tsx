'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LayoutDashboard,
  Users,
  Activity,
  TrendingUp,
  Search,
  Bell,
  Settings,
} from 'lucide-react';

export function DashboardPreview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's your overview.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-10" />
        </div>
        <Button>Search</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Your monthly performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Revenue</span>
                <span className="font-medium">72%</span>
              </div>
              <Progress value={72} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Users</span>
                <span className="font-medium">58%</span>
              </div>
              <Progress value={58} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Conversion</span>
                <span className="font-medium">85%</span>
              </div>
              <Progress value={85} />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>You have 3 new notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: 'New sale', description: 'Just now', badge: 'Success' },
              { title: 'User signup', description: '5 minutes ago', badge: 'Info' },
              { title: 'Server alert', description: '10 minutes ago', badge: 'Warning' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <Badge variant="secondary">{item.badge}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 pt-4">
              <p className="text-sm text-muted-foreground">
                View your key performance indicators and metrics at a glance.
              </p>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4 pt-4">
              <p className="text-sm text-muted-foreground">
                Deep dive into your analytics and user behavior patterns.
              </p>
            </TabsContent>
            <TabsContent value="reports" className="space-y-4 pt-4">
              <p className="text-sm text-muted-foreground">
                Generate and download comprehensive reports.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
