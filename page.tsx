'use client'

import { useState, useMemo, useEffect } from 'react'
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter, ZAxis } from 'recharts'
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const jobTrendsData = [
  {
    "Region": "Eastern Asia and Oceania",
    "JobTitle": "Information Security Analyst",
    "Trend": "Aging workforce",
    "Suggestion": "Invest in automation and reskilling",
    "DetailedSuggestion": "1. Implement mentorship programs to transfer knowledge from experienced workers to younger employees.\n2. Invest in AI-powered security tools to augment human capabilities.\n3. Develop partnerships with educational institutions to create tailored cybersecurity programs.\n4. Offer flexible work arrangements to retain older workers while attracting younger talent.\n5. Create a continuous learning culture with regular upskilling opportunities in emerging technologies.",
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
    ],
    "SkillImportance": 85,
    "MarketDemand": 78
  },
  {
    "Region": "Eastern Asia and Oceania",
    "JobTitle": "Data Analyst",
    "Trend": "Increased AI adoption",
    "Suggestion": "Focus on AI/ML skillsets and ethical considerations",
    "DetailedSuggestion": "1. Develop training programs focused on AI and machine learning techniques.\n2. Incorporate ethical AI considerations into data analysis workflows.\n3. Encourage cross-functional collaboration between data analysts and AI specialists.\n4. Invest in tools that facilitate explainable AI to enhance trust in data-driven decisions.\n5. Establish guidelines for responsible AI use in data analysis projects.",
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
    ],
    "SkillImportance": 90,
    "MarketDemand": 85
  },
  {
    "Region": "South-Eastern Asia",
    "JobTitle": "AI Specialist",
    "Trend": "Advances in technology",
    "Suggestion": "Upskill workforce, transition employees to emerging roles",
    "DetailedSuggestion": "1. Create a comprehensive AI skills roadmap for different roles within the organization.\n2. Establish partnerships with leading AI research institutions and companies.\n3. Implement an internal AI project incubator to foster innovation and hands-on learning.\n4. Develop a talent pipeline through AI bootcamps and apprenticeship programs.\n5. Encourage employees to obtain relevant AI certifications and provide support for continuous learning.",
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
    ],
    "SkillImportance": 95,
    "MarketDemand": 92
  },
  {
    "Region": "South-Eastern Asia",
    "JobTitle": "Sustainability Specialist",
    "Trend": "Climate mitigation",
    "Suggestion": "Scale reskilling efforts and align with green initiatives",
    "DetailedSuggestion": "1. Develop a comprehensive sustainability curriculum covering topics like carbon footprint reduction, renewable energy, and circular economy principles.\n2. Establish partnerships with environmental organizations to provide hands-on experience and mentorship.\n3. Implement sustainability challenges and hackathons to encourage innovative solutions.\n4. Create a green skills certification program to recognize and incentivize sustainability expertise.\n5. Integrate sustainability considerations into all business functions and decision-making processes.",
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
    ],
    "SkillImportance": 80,
    "MarketDemand": 75
  },
  {
    "Region": "Central Asia and Southern Asia",
    "JobTitle": "Big Data Specialist",
    "Trend": "Increased digital access",
    "Suggestion": "Tap into diverse talent pools and adopt skills-based hiring",
    "DetailedSuggestion": "1. Establish partnerships with universities and coding bootcamps to create tailored big data curricula.\n2. Implement a skills-based hiring approach, focusing on practical abilities rather than traditional qualifications.\n3. Create an internal big data academy to continuously upskill employees across different departments.\n4. Develop mentorship programs pairing experienced big data specialists with emerging talent.\n5. Encourage participation in big data competitions and open-source projects to showcase skills and attract diverse talent.",
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
    ],
    "SkillImportance": 88,
    "MarketDemand": 82
  },
  {
    "Region": "Middle East and Northern Africa",
    "JobTitle": "AI and Big Data Specialist",
    "Trend": "Digitalization and automation",
    "Suggestion": "Accelerate workforce upskilling and focus on emerging technologies",
    "DetailedSuggestion": "1. Develop a comprehensive AI and Big Data upskilling program for existing employees.\n2. Establish partnerships with global tech companies to provide cutting-edge training and certifications.\n3. Create an innovation lab focused on AI and Big Data applications in local industries.\n4. Implement a rotational program allowing employees to gain experience in different AI and Big Data projects.\n5. Host regular tech talks and workshops featuring industry experts to keep the workforce updated on emerging trends.",
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
    ],
    "SkillImportance": 92,
    "MarketDemand": 88
  },
  {
    "Region": "Sub-Saharan Africa",
    "JobTitle": "Diversity Specialist",
    "Trend": "Labour and social issues",
    "Suggestion": "Invest in workforce diversity and equity programs",
    "DetailedSuggestion": "1. Develop a comprehensive diversity, equity, and inclusion (DEI) strategy tailored to the local context.\n2. Implement unconscious bias training programs for all employees, especially those in leadership positions.\n3. Establish partnerships with local community organizations to create pathways for underrepresented groups.\n4. Create mentorship and sponsorship programs to support career advancement for diverse employees.\n5. Regularly conduct pay equity audits and implement transparent compensation practices.",
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
    ],
    "SkillImportance": 75,
    "MarketDemand": 70
  }
]

const jobTitles = Array.from(new Set(jobTrendsData.map(item => item.JobTitle)))
const trends = Array.from(new Set(jobTrendsData.map(item => item.Trend)))

export default function Page() {
  const [selectedJobTitle, setSelectedJobTitle] = useState('all')
  const [selectedTrend, setSelectedTrend] = useState('all')
  const [selectedJob, setSelectedJob] = useState(null)

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

  const skillVsDemandData = useMemo(() => {
    return filteredData.map(item => ({
      name: item.JobTitle,
      skillImportance: item.SkillImportance,
      marketDemand: item.MarketDemand,
      region: item.Region,
    }))
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Job Growth and Displacement</CardTitle>
            <CardDescription>
              Projected changes in employment from 2025 to 2030
              {selectedJobTitle !== 'all' && ` for ${selectedJobTitle}`}
              {selectedTrend !== 'all' && ` related to ${selectedTrend}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
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
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="99%" height="100%">
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

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Emerging Job Roles by Region</CardTitle>
            <CardDescription>
              Distribution of emerging job roles across different regions
            </CardDescription>
          </CardHeader>
          <div className="emerging-jobs-chart">
          <CardContent className="w-full">
            <ChartContainer
              config={{
                count: {
                  label: 'Number of Emerging Roles',
                  color: 'hsl(var(--chart-3))',
                },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={jobRolesByRegionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
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
          </div>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Skill Importance vs Market Demand</CardTitle>
            <CardDescription>
              Comparison of skill importance and market demand for different job roles
            </CardDescription>
          </CardHeader>
          <div className="emerging-jobs-chart">
          <CardContent className="w-full">
            <ChartContainer
              config={jobTitles.reduce((acc, title, index) => ({
                ...acc,
                [title]: {
                  label: title,
                  color: `hsl(${(index * 60) % 360}, 50%, 70%)`,
                },
              }), {})}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" dataKey="skillImportance" name="Skill Importance" unit="%" />
                  <YAxis type="number" dataKey="marketDemand" name="Market Demand" unit="%" />
                  <ChartTooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent />} />
                  <Legend />
                  {jobTitles.map((title, index) => (
                    <Scatter
                      key={title}
                      name={title}
                      data={skillVsDemandData.filter((item) => item.name === title)}
                      fill={`hsl(${(index * 60) % 360}, 50%, 70%)`}
                    />
                  ))}
                </ScatterChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
          </div>
        </Card>
      </div>

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
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.Region}</TableCell>
                  <TableCell>{item.JobTitle}</TableCell>
                  <TableCell>{item.Trend}</TableCell>
                  <TableCell>{item.Suggestion}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          className="custom-button"
                          onClick={() => setSelectedJob(item)}
                        >
                          View Details
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                          <DialogTitle>{selectedJob?.JobTitle}</DialogTitle>
                          <DialogDescription>{selectedJob?.Region}</DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <Table>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">Trend</TableCell>
                                <TableCell>{selectedJob?.Trend}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Detailed Suggestion</TableCell>
                                <TableCell className="whitespace-pre-line">{selectedJob?.DetailedSuggestion}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

