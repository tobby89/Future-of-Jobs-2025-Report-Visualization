'use client'

import { useState, useMemo, useEffect } from 'react'
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const jobTrendsData = [
  {
    "Region": "Eastern Asia and Oceania",
    "JobTitle": "Information Security Analyst",
    "Trend": "Aging workforce",
    "Suggestion": "Invest in automation and reskilling",
    "JobGrowth": [
      { year: 2025, value: 2.5 },
      { year: 2026, value: 3.1 },
      { year: 2027, value: 3.8 },
      { year: 2028, value: 4.5 },
      { year: 2029, value: 5.2 },
      { year: 2030, value: 6.0 },
    ],
    "JobDisplacement": [
      { year: 2025, value: 1.2 },
      { year: 2026, value: 1.5 },
      { year: 2027, value: 1.8 },
      { year: 2028, value: 2.1 },
      { year: 2029, value: 2.4 },
      { year: 2030, value: 2.7 },
    ]
  },
  {
    "Region": "Eastern Asia and Oceania",
    "JobTitle": "Data Analyst",
    "Trend": "Increased AI adoption",
    "Suggestion": "Focus on AI/ML skillsets and ethical considerations",
    "JobGrowth": [
      { year: 2025, value: 3.0 },
      { year: 2026, value: 3.7 },
      { year: 2027, value: 4.5 },
      { year: 2028, value: 5.4 },
      { year: 2029, value: 6.4 },
      { year: 2030, value: 7.5 },
    ],
    "JobDisplacement": [
      { year: 2025, value: 1.0 },
      { year: 2026, value: 1.2 },
      { year: 2027, value: 1.4 },
      { year: 2028, value: 1.6 },
      { year: 2029, value: 1.8 },
      { year: 2030, value: 2.0 },
    ]
  },
  {
    "Region": "South-Eastern Asia",
    "JobTitle": "AI Specialist",
    "Trend": "Advances in technology",
    "Suggestion": "Upskill workforce, transition employees to emerging roles",
    "JobGrowth": [
      { year: 2025, value: 3.5 },
      { year: 2026, value: 4.4 },
      { year: 2027, value: 5.5 },
      { year: 2028, value: 6.8 },
      { year: 2029, value: 8.3 },
      { year: 2030, value: 10.0 },
    ],
    "JobDisplacement": [
      { year: 2025, value: 0.8 },
      { year: 2026, value: 0.9 },
      { year: 2027, value: 1.0 },
      { year: 2028, value: 1.1 },
      { year: 2029, value: 1.2 },
      { year: 2030, value: 1.3 },
    ]
  },
  {
    "Region": "South-Eastern Asia",
    "JobTitle": "Sustainability Specialist",
    "Trend": "Climate mitigation",
    "Suggestion": "Scale reskilling efforts and align with green initiatives",
    "JobGrowth": [
      { year: 2025, value: 2.8 },
      { year: 2026, value: 3.4 },
      { year: 2027, value: 4.1 },
      { year: 2028, value: 4.9 },
      { year: 2029, value: 5.8 },
      { year: 2030, value: 6.8 },
    ],
    "JobDisplacement": [
      { year: 2025, value: 1.1 },
      { year: 2026, value: 1.3 },
      { year: 2027, value: 1.5 },
      { year: 2028, value: 1.7 },
      { year: 2029, value: 1.9 },
      { year: 2030, value: 2.1 },
    ]
  },
  {
    "Region": "Central Asia and Southern Asia",
    "JobTitle": "Big Data Specialist",
    "Trend": "Increased digital access",
    "Suggestion": "Tap into diverse talent pools and adopt skills-based hiring",
    "JobGrowth": [
      { year: 2025, value: 3.2 },
      { year: 2026, value: 4.0 },
      { year: 2027, value: 5.0 },
      { year: 2028, value: 6.2 },
      { year: 2029, value: 7.6 },
      { year: 2030, value: 9.2 },
    ],
    "JobDisplacement": [
      { year: 2025, value: 0.9 },
      { year: 2026, value: 1.0 },
      { year: 2027, value: 1.1 },
      { year: 2028, value: 1.2 },
      { year: 2029, value: 1.3 },
      { year: 2030, value: 1.4 },
    ]
  },
  {
    "Region": "Middle East and Northern Africa",
    "JobTitle": "AI and Big Data Specialist",
    "Trend": "Digitalization and automation",
    "Suggestion": "Accelerate workforce upskilling and focus on emerging technologies",
    "JobGrowth": [
      { year: 2025, value: 3.3 },
      { year: 2026, value: 4.2 },
      { year: 2027, value: 5.3 },
      { year: 2028, value: 6.6 },
      { year: 2029, value: 8.1 },
      { year: 2030, value: 9.8 },
    ],
    "JobDisplacement": [
      { year: 2025, value: 0.7 },
      { year: 2026, value: 0.8 },
      { year: 2027, value: 0.9 },
      { year: 2028, value: 1.0 },
      { year: 2029, value: 1.1 },
      { year: 2030, value: 1.2 },
    ]
  },
  {
    "Region": "Sub-Saharan Africa",
    "JobTitle": "Diversity Specialist",
    "Trend": "Labour and social issues",
    "Suggestion": "Invest in workforce diversity and equity programs",
    "JobGrowth": [
      { year: 2025, value: 2.0 },
      { year: 2026, value: 2.4 },
      { year: 2027, value: 2.9 },
      { year: 2028, value: 3.5 },
      { year: 2029, value: 4.2 },
      { year: 2030, value: 5.0 },
    ],
    "JobDisplacement": [
      { year: 2025, value: 1.5 },
      { year: 2026, value: 1.7 },
      { year: 2027, value: 1.9 },
      { year: 2028, value: 2.1 },
      { year: 2029, value: 2.3 },
      { year: 2030, value: 2.5 },
    ]
  }
]

const jobTitles = Array.from(new Set(jobTrendsData.map(item => item.JobTitle)))
const trends = Array.from(new Set(jobTrendsData.map(item => item.Trend)))

export default function Page() {
  const [selectedJobTitle, setSelectedJobTitle] = useState('all')
  const [selectedTrend, setSelectedTrend] = useState('all')

  const filteredData = useMemo(() => {
    return jobTrendsData.filter(item => 
      (selectedJobTitle === 'all' || item.JobTitle === selectedJobTitle) &&
      (selectedTrend === 'all' || item.Trend === selectedTrend)
    )
  }, [selectedJobTitle, selectedTrend])

  const chartData = useMemo(() => {
    const years = [2025, 2026, 2027, 2028, 2029, 2030]
    return years.map(year => ({
      year,
      jobGrowth: filteredData.reduce((sum, item) => 
        sum + (item.JobGrowth.find(y => y.year === year)?.value || 0), 0
      ),
      jobDisplacement: filteredData.reduce((sum, item) => 
        sum + (item.JobDisplacement.find(y => y.year === year)?.value || 0), 0
      ),
    }))
  }, [filteredData])

  const jobRolesByRegionData = useMemo(() => {
    const regionCounts = filteredData.reduce((acc, { Region }) => {
      acc[Region] = (acc[Region] || 0) + 1
      return acc
    }, {})
    return Object.entries(regionCounts).map(([region, count]) => ({ region, count }))
  }, [filteredData])

  useEffect(() => {
    console.log('Selected Job Title:', selectedJobTitle)
    console.log('Selected Trend:', selectedTrend)
    console.log('Filtered Data:', filteredData)
    console.log('Chart Data:', chartData)
  }, [selectedJobTitle, selectedTrend, filteredData, chartData])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Future of Jobs 2025</h1>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="jobTitle">Job Title</Label>
          <Select
            onValueChange={setSelectedJobTitle}
            value={selectedJobTitle}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Job Title" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Job Titles</SelectItem>
              {jobTitles.map((title) => (
                <SelectItem key={title} value={title}>
                  {title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="trend">Trend</Label>
          <Select
            onValueChange={setSelectedTrend}
            value={selectedTrend}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Trend" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Trends</SelectItem>
              {trends.map((trend) => (
                <SelectItem key={trend} value={trend}>
                  {trend}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Job Growth and Displacement</CardTitle>
          <CardDescription>
            Projected changes in employment from 2025 to 2030
            {selectedJobTitle !== 'all' && ` for ${selectedJobTitle}`}
            {selectedTrend !== 'all' && ` related to ${selectedTrend}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              jobGrowth: {
                label: 'Job Growth',
                color: 'hsl(var(--chart-1))',
              },
              jobDisplacement: {
                label: 'Job Displacement',
                color: 'hsl(var(--chart-2))',
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="jobGrowth"
                  stroke="var(--color-jobGrowth)"
                  name="Job Growth"
                />
                <Line
                  type="monotone"
                  dataKey="jobDisplacement"
                  stroke="var(--color-jobDisplacement)"
                  name="Job Displacement"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Emerging Job Roles by Region</CardTitle>
          <CardDescription>
            Distribution of emerging job roles across different regions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: {
                label: 'Number of Emerging Roles',
                color: 'hsl(var(--chart-3))',
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={jobRolesByRegionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="count" fill="var(--color-count)" name="Number of Emerging Roles" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Job Trends and Suggestions</CardTitle>
          <CardDescription>
            Detailed information on emerging job roles, trends, and suggestions by region
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Region</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>Suggestion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.Region}</TableCell>
                  <TableCell>{item.JobTitle}</TableCell>
                  <TableCell>{item.Trend}</TableCell>
                  <TableCell>{item.Suggestion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

