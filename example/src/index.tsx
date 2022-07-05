import React from 'react'
import { createRoot } from 'react-dom/client'
import { a } from 'use-headless'

const container = document.getElementById('app')

if (container) {
  const root = createRoot(container)
  root.render(<>{a}</>)
} else {
  throw Error('container is null')
}
