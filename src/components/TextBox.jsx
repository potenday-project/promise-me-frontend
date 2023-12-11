function TextBox ({ summary, content }) {
  
  return (
    <div className="bg-blue-50 border -border--grey300 rounded-lg p-4">
      <p className="text-headline4 mb-2">{summary}</p>
      <p className="text-body3">{content}</p>
    </div>
  )
}

export default TextBox;