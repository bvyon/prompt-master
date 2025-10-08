const ghpages = require('gh-pages');

ghpages.publish(
  'build',
  {
    branch: 'gh-pages',
    repo: 'https://github.com/yourusername/prompt-optimizer-pro.git',
    user: {
      name: 'GitHub Actions',
      email: 'actions@github.com'
    },
    dotfiles: true
  },
  () => {
    console.log('Deploy Complete!');
  }
);