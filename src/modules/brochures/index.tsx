import React from 'react'
import { Routes, Route } from 'react-router-dom'
import BrochureList from './pages/BrochureList'
import BrochureTemplateEditor from './pages/BrochureTemplateEditor'
import PublicBrochureView from './pages/PublicBrochureView'

export { default as BrochureList } from './pages/BrochureList'
export { default as BrochureTemplateEditor } from './pages/BrochureTemplateEditor'
export { default as PublicBrochureView } from './pages/PublicBrochureView'

export default function BrochuresModule() {
  return (
    <Routes>
      <Route path="/" element={<BrochureList />} />
      <Route path="/templates/new" element={<BrochureTemplateEditor />} />
      <Route path="/templates/:id/edit" element={<BrochureTemplateEditor />} />
    </Routes>
  )
}