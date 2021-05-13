process.env.VUE_CLI_BABEL_TARGET_NODE = true;
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;

module.exports = {
    clearMocks: true,
    // collectCoverage: true,
    // coverageDirectory: "coverage",
    testEnvironment: "jsDom",
    preset: "jest-puppeteer",
    moduleFileExtensions: ['js', 'vue','json'],
    setupFilesAfterEnv: ['./test.setup.js'],
    verbose: true,
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        "^.+\\.vue$": "vue-jest"
    }
};
