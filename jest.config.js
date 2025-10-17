/** @type {import('jest').Config} */
module.exports = {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.[tj]sx?$": "babel-jest",
    },
    transformIgnorePatterns: [
        // 👇 Tell Jest to transform ESM packages like react-router-dom
        "node_modules/(?!(react-router|react-router-dom)/)",
    ],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
