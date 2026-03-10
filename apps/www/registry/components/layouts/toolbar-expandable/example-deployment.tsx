"use client"

import {
  CheckCircle,
  Code,
  Database,
  Palette,
  Rocket,
  Settings,
  Upload,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import ToolbarExpandable from "./component"

const deploymentSteps = [
  {
    id: "setup",
    title: "Project Setup",
    description:
      "Initialize your project with the required dependencies and configuration.",
    icon: Settings,
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="project-name" className="text-sm font-medium block">
            Project Name
          </label>
          <input
            id="project-name"
            placeholder="my-awesome-app"
            className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium block">Framework</label>
          <select className="w-full h-10 px-3 border border-border rounded-md bg-background text-sm">
            <option>Next.js</option>
            <option>React</option>
            <option>Vue.js</option>
          </select>
        </div>
        <Button className="w-full">
          <Code className="w-4 h-4 mr-2" />
          Initialize Project
        </Button>
      </div>
    ),
  },
  {
    id: "configure",
    title: "Configuration",
    description:
      "Set up environment variables and project settings for optimal performance.",
    icon: Database,
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="api-key" className="text-sm font-medium block">
            API Key
          </label>
          <input
            id="api-key"
            type="password"
            placeholder="Enter your API key"
            className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="database-url" className="text-sm font-medium block">
            Database URL
          </label>
          <input
            id="database-url"
            placeholder="postgresql://..."
            className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
        <Button variant="outline" className="w-full bg-transparent">
          <Settings className="w-4 h-4 mr-2" />
          Save Configuration
        </Button>
      </div>
    ),
  },
  {
    id: "customize",
    title: "Customize Design",
    description:
      "Personalize your application's appearance and branding elements.",
    icon: Palette,
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium block">Primary Color</label>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-md border-2 border-blue-600"></div>
              <div className="w-8 h-8 bg-green-500 rounded-md"></div>
              <div className="w-8 h-8 bg-purple-500 rounded-md"></div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium block">Theme</label>
            <select className="w-full h-10 px-3 border border-border rounded-md bg-background text-sm">
              <option>Light</option>
              <option>Dark</option>
              <option>Auto</option>
            </select>
          </div>
        </div>
        <Button variant="outline" className="w-full bg-transparent">
          <Palette className="w-4 h-4 mr-2" />
          Apply Theme
        </Button>
      </div>
    ),
  },
  {
    id: "upload",
    title: "Upload Assets",
    description:
      "Upload your project files, images, and other assets to the platform.",
    icon: Upload,
    content: (
      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-600 mb-2">
            Drag and drop files here
          </p>
          <Button variant="outline" size="sm">
            Choose Files
          </Button>
        </div>
        <Button className="w-full">
          <Upload className="w-4 h-4 mr-2" />
          Upload Assets
        </Button>
      </div>
    ),
  },
  {
    id: "deploy",
    title: "Deploy",
    description:
      "Deploy your application to production with automatic scaling and monitoring.",
    icon: Rocket,
    content: (
      <div className="space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-800">Ready to Deploy</span>
          </div>
          <p className="text-sm text-green-700">
            All checks passed. Your application is ready for production
            deployment.
          </p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium block">
            Deployment Region
          </label>
          <select className="w-full h-10 px-3 border border-border rounded-md bg-background text-sm">
            <option>US East (Virginia)</option>
            <option>US West (California)</option>
            <option>Europe (Frankfurt)</option>
            <option>Asia Pacific (Singapore)</option>
          </select>
        </div>
        <Button className="w-full bg-green-600 hover:bg-green-700">
          <Rocket className="w-4 h-4 mr-2" />
          Deploy to Production
        </Button>
      </div>
    ),
  },
]

export default function ToolbarExpandableDeployment() {
  return (
    <div className="max-w-2xl mx-auto">
      <ToolbarExpandable steps={deploymentSteps} />
    </div>
  )
}
