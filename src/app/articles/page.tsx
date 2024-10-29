import { ArticleTable } from "@/ui/view"

export default function Articles() {
  return (
    <main className='space-y-7'>
      <h1 className='text-heading_md text-black'>All Posts</h1>
      <ArticleTable />
    </main>
  )
}
