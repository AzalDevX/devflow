import { useState } from "react"

interface Comment {
  id: string
  author: string
  content: string
  date: string
}

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: "Anonymous",
      content: newComment,
      date: new Date().toISOString(),
    }

    setComments([...comments, comment])
    setNewComment("")
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded-lg dark:border-gray-700 dark:bg-gray-800"
          placeholder="Add a comment..."
          rows={3}
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
          Post Comment
        </button>
      </form>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 border rounded-lg dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{comment.author}</span>
              <time className="text-sm text-gray-500">{new Date(comment.date).toLocaleDateString()}</time>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

