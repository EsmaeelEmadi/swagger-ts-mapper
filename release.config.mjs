// @type {import('semantic-release').GlobalConfig}
export default {
    branches: [
        "main",
        {
            name: "beta",
            prerelease: true,
        },
    ],
    plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        [
            "@semantic-release/changelog",
            {
                changelogFile: "CHANGELOG.md",
            },
        ],
        "@semantic-release/npm",
        "@semantic-release/github",
        [
            "@semantic-release/git",
            {
                assets: ["CHANGELOG.md", "dist/**"],
                message:
                    "chore(release): set `package.json` to ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
            },
        ],
    ],
    git: {
        commitMessage: "chore(release): cut the v${version} release",
        push: false,
    },
    hooks: {
        "after:bump": ["npm run build"],
        "after:release": "git push origin HEAD",
    },
};
