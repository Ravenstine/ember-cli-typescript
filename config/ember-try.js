module.exports = {
  useYarn: true,
  command: 'ember test && yarn nodetest',
  scenarios: [
    {
      name: 'defaults',
      npm: {
        devDependencies: {},
      },
    },
    {
      name: 'ember-cli-release',
      npm: {
        devDependencies: {
          'ember-cli': 'latest',
        },
      },
    },
    {
      name: 'ember-cli-beta',
      npm: {
        devDependencies: {
          'ember-cli': 'beta',
        },
      },
    },
  ],
};
