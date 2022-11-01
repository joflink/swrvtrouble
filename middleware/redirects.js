export default function (req, res, next) {
  const redirects = [{ from: '/', to: '/login' }]

  const redirect = redirects.find((r) => r.from === req.url)

  if (redirect) {
    res.writeHead(302, { Location: redirect.to })
    res.end()
  } else {
    next()
  }
}
