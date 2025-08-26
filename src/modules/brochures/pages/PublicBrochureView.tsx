import React from 'react'
import { useParams } from 'react-router-dom'

export default function PublicBrochureView() {
  const { publicId } = useParams()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Public Brochure View</h1>
          <p className="text-muted-foreground">
            Brochure ID: {publicId}
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Brochure viewer coming soon
          </p>
        </div>
      </div>
    </div>
  )
}