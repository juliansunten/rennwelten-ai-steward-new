module.exports = {
    packagerConfig: {
        asar: true,
        icon: './dist/favicon',
        setupIcon: './dist/favicon'
    },
    rebuildConfig: {},
    makers: [
        {
            name: '@asappz/rennwelten-ai-steward',
            config: {
                name: "rennwelten-ai-steward",
                description: "A smart Tool that supports Sim Racing Stewards during the stewarding process",
                authors: "Asappz UG (Haftungsbeschränkt) Julian Sunten <js@asappz.com>",
            },
        },
    ],
    publishers: [
        {
            name: '@electron-forge/publisher-github',
            config: {
                repository: {
                    owner: 'asappz',
                    name: 'rennwelten-ai-steward'
                },
                authToken: "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",
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
