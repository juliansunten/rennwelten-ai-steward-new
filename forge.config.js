module.exports = {
    packagerConfig: {
        asar: true,
        icon: './dist/favicon',
        setupIcon: './dist/favicon'
    },
    rebuildConfig: {},
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {
                name: "rennwelten-ai-steward",
            },
        },
    ],
    publishers: [
        {
            name: '@electron-forge/publisher-github',
            config: {
                repository: {
                    owner: 'juliansunten',
                    name: 'rennwelten-ai-steward'
                },
                prerelease: true,
            }
        }
    ],
    plugins: [
        {
            name: '@electron-forge/plugin-auto-unpack-natives',
            config: {},
        },
    ],
};
