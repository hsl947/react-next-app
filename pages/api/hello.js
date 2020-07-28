// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// 访问 /api/hello 试试
export default (req, res) => {
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
