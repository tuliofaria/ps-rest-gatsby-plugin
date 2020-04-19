module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-github-repos',
      options: {
        repos: [
          {
            username: 'tuliofaria',
            token: '<<github personal token>>'
          }
        ]
      }
    }
  ]
}
