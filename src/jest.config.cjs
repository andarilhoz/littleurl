module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.js'],
    transform: {},
    collectCoverage: true,
    coverageDirectory: "../coverage",
    collectCoverageFrom:[
        "**/*.js",
        "!model/*",
        "!app.js",
        "!index.js",
        "!public/**"
    ]
}