import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, FileText, Edit, Trash2 } from 'lucide-react'

export default function BrochureList() {
  const [brochures] = useState([
    {
      id: '1',
      name: 'RV Showcase Brochure',
      description: 'Premium RV collection brochure',
      createdAt: '2024-01-15',
      status: 'published'
    },
    {
      id: '2',
      name: 'Manufactured Home Guide',
      description: 'Complete manufactured home catalog',
      createdAt: '2024-01-10',
      status: 'draft'
    }
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Brochures</h1>
          <p className="text-muted-foreground">
            Create and manage marketing brochures
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Brochure
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {brochures.map((brochure) => (
          <Card key={brochure.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg">{brochure.name}</CardTitle>
              <CardDescription>{brochure.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Created {brochure.createdAt}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${
                  brochure.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {brochure.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}