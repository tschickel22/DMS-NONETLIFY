import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2, Copy } from 'lucide-react'

interface PageListItem {
  id: string
  name: string
  slug: string
  isHomePage: boolean
  isPublished: boolean
  lastModified: string
  template?: string
}

interface PageListProps {
  pages: PageListItem[]
  currentPageId: string | null
  onSelectPage: (pageId: string) => void
  onCreatePage: () => void
  onEditPage: (pageId: string) => void
  onDeletePage: (pageId: string) => void
  onDuplicatePage: (pageId: string) => void
}

export default function PageList({
  pages,
  currentPageId,
  onSelectPage,
  onCreatePage,
  onEditPage,
  onDeletePage,
  onDuplicatePage
}: PageListProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Pages</CardTitle>
          <Button size="sm" onClick={onCreatePage}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {pages.map((page) => (
            <div
              key={page.id}
              className={`p-3 rounded-md border cursor-pointer transition-colors ${
                currentPageId === page.id
                  ? 'bg-primary/10 border-primary'
                  : 'hover:bg-accent'
              }`}
              onClick={() => onSelectPage(page.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{page.name}</div>
                  <div className="text-xs text-muted-foreground">/{page.slug}</div>
                  {page.isHomePage && (
                    <div className="text-xs text-blue-600 font-medium">Home Page</div>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onEditPage(page.id)
                    }}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDuplicatePage(page.id)
                    }}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  {!page.isHomePage && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeletePage(page.id)
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}