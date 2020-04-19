const axios = require('axios')

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  // dados
  const dataPromises = configOptions.repos.map(authRepo => {
    const { username, token } = authRepo
    return axios.get('https://api.github.com/user/repos', {
      auth: {
        username,
        password: token
      }
    })
  })
  const allData = await Promise.all(dataPromises)

  // criar internamente gatsby
  configOptions.repos.forEach((authRepo, index) => {
    const data = allData[index].data
    const { username } = authRepo
    const { createNode } = actions
    data.forEach(repo => {
      const nodeId = createNodeId('gatsby-source-github-repos-' + repo.id)
      const nodeData = {
        id: nodeId,
        parent: null,
        repo,
        children: [],
        internal: {
          type: 'GithubRepo' + username,
          contentDigest: createContentDigest(repo)
        }
      }
      createNode(nodeData)
    })
  })
}
