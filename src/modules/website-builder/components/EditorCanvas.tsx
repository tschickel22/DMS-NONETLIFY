import React from 'react'
import { Site, Page } from '../types'

interface EditorCanvasProps {
  site: Site
  currentPage: Page | null
  previewMode: 'desktop' | 'tablet' | 'mobile'
}

export default function EditorCanvas({ site, currentPage, previewMode }: EditorCanvasProps) {
  if (!currentPage) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <div className="text-4xl mb-4">📄</div>
          <p>Select a page to start editing</p>
        </div>
      </div>
    )
  }

  const renderBlock = (block: any) => {
    const primaryColor = site.brand?.color || site.theme?.primaryColor || '#3b82f6'

    switch (block.type) {
      case 'hero':
        return (
          <div key={block.id} className="relative bg-gray-900 text-white p-8 text-center">
            <h1 className="text-4xl font-bold mb-4">{block.content.title || 'Hero Title'}</h1>
            <p className="text-xl mb-6">{block.content.subtitle || 'Hero subtitle'}</p>
            <button 
              className="px-6 py-3 rounded-lg font-semibold"
              style={{ backgroundColor: primaryColor }}
            >
              {block.content.ctaText || 'Call to Action'}
            </button>
          </div>
        )

      case 'text':
        return (
          <div key={block.id} className="p-8">
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: block.content.html || block.content.text || '<p>Text content</p>' }}
            />
          </div>
        )

      case 'image':
        return (
          <div key={block.id} className="p-8 text-center">
            <img 
              src={block.content.src || 'https://via.placeholder.com/600x300'} 
              alt={block.content.alt || ''} 
              className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
            />
            {block.content.caption && (
              <p className="mt-4 text-gray-600 text-sm">{block.content.caption}</p>
            )}
          </div>
        )

      default:
        return (
          <div key={block.id} className="p-4 bg-yellow-50 border border-yellow-200">
            <p className="text-center text-yellow-800">
              Block type: {block.type}
            </p>
          </div>
        )
    }
  }

  const sortedBlocks = [...(currentPage.blocks || [])].sort((a, b) => (a.order || 0) - (b.order || 0))

  return (
    <div className="h-full overflow-y-auto">
      <div className="min-h-full bg-white">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-xl font-bold" style={{ color: site.theme?.primaryColor }}>
                {site.name}
              </span>
            </div>
            <div className="flex space-x-4">
              {site.pages.map(page => (
                <button
                  key={page.id}
                  className={`px-3 py-2 text-sm font-medium ${
                    page.id === currentPage.id ? 'border-b-2' : ''
                  }`}
                  style={{ 
                    borderColor: page.id === currentPage.id ? site.theme?.primaryColor : 'transparent'
                  }}
                >
                  {page.title}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main>
          {sortedBlocks.map(renderBlock)}
        </main>
      </div>
    </div>
  )
}