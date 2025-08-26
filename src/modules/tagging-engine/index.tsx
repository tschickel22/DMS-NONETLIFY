import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Tag, Search, Edit, Trash2 } from 'lucide-react'

interface TagItem {
  id: string
  name: string
  color: string
  description?: string
  usageCount: number
  createdAt: string
}

export default function TaggingEngine() {
  const [tags] = useState<TagItem[]>([
    {
      id: '1',
      name: 'High Priority',
      color: '#ef4444',
      description: 'High priority items requiring immediate attention',
      usageCount: 24,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Follow Up',
      color: '#f59e0b',
      description: 'Items requiring follow-up action',
      usageCount: 18,
      createdAt: '2024-01-12'
    },
    {
      id: '3',
      name: 'Completed',
      color: '#10b981',
      description: 'Completed items',
      usageCount: 156,
      createdAt: '2024-01-10'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tag.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tag Manager</h1>
          <p className="text-muted-foreground">
            Organize and manage tags across all modules
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Tag
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tags Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTags.map((tag) => (
          <Card key={tag.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: tag.color }}
                  />
                  <CardTitle className="text-lg">{tag.name}</CardTitle>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {tag.description && (
                <CardDescription>{tag.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Used {tag.usageCount} times
                </span>
                <Badge variant="outline">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag.name}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTags.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Tag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tags found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'No tags match your search' : 'Create your first tag to get started'}
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Tag
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}