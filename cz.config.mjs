/** @type {import('cz-git').UserConfig['prompt']} */
export default {
    alias: { fd: "docs: fix typos" },
    messages: {
        type: "Select the type of change that you're committing:",
        scope: "Denote the SCOPE of this change (optional):",
        customScope: "Denote the SCOPE of this change:",
        subject: "Write a SHORT, IMPERATIVE tense description of the change:\n",
        body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
        breaking:
            'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
        footerPrefixesSelect:
            "Select the ISSUES type of changeList by this change (optional):",
        customFooterPrefix: "Input ISSUES prefix:",
        footer: "List any ISSUES by this change. E.g.: #31, #34:\n",
        generatingByAI: "Generating your AI commit subject...",
        generatedSelectByAI: "Select suitable subject by AI generated:",
        confirmCommit:
            "Are you sure you want to proceed with the commit above?",
    },
    types: [
        {
            value: "feat",
            name: "feat: A new feature",
        },
        {
            value: "fix",
            name: "fix: A bug fix",
        },
        {
            value: "docs",
            name: "docs: Documentation changes",
        },
        {
            value: "style",
            name: "style: Code style changes (formatting, etc)",
        },
        {
            value: "refactor",
            name: "refactor: Code refactoring",
        },
        {
            value: "test",
            name: "test: Adding or updating tests",
        },
        {
            value: "chore",
            name: "chore: Maintenance or tooling",
        },
    ],
    useEmoji: false,
    useAI: false,
    aiNumber: 1,
    themeColorCode: "",
    scopes: [
        {
            name: "core",
        },
        {
            name: "config",
        },
        {
            name: "deps",
        },
        {
            name: "scripts",
        },
        {
            name: "setup",
        },
        {
            name: "docs",
        },
        {
            name: "build",
        },
        {
            name: "ci",
        },
        {
            name: "testing",
        },
        {
            name: "refactor",
        },
    ],
    allowCustomScopes: false,
    allowEmptyScopes: false,
    customScopesAlign: "bottom",
    customScopesAlias: "custom",
    emptyScopesAlias: "empty",
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    allowBreakingChanges: ["feat", "fix"],
    breaklineNumber: 100,
    breaklineChar: "|",
    skipQuestions: [],
    issuePrefixes: [
        { value: "closed", name: "closed: ISSUES has been processed" },
    ],
    customIssuePrefixAlign: "top",
    emptyIssuePrefixAlias: "skip",
    customIssuePrefixAlias: "custom",
    allowCustomIssuePrefix: true,
    allowEmptyIssuePrefix: true,
    confirmColorize: true,
    maxHeaderLength: Number.POSITIVE_INFINITY,
    maxSubjectLength: Number.POSITIVE_INFINITY,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: "",
    defaultIssues: "",
    defaultScope: "",
    defaultSubject: "",
};
