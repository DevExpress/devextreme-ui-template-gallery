module.exports = {
  "root": true,
  "ignorePatterns": [
    "projects/**/*"
  ],
  'plugins': ['@typescript-eslint'],
  'parser': '@typescript-eslint/parser',
  "overrides": [
    {
      "files": [
        "*.ts"
      ],
      "parserOptions": {
        "tsconfigRootDir": __dirname,
        "project": [
          "./tsconfig.json"
        ],
        "createDefaultProgram": true
      },
      "extends": [
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates"
      ],
      "rules": {
        "@typescript-eslint/member-ordering": [
          "error",
          {
            "default": {
              "memberTypes": [
                "public-decorated-field",
                "protected-decorated-field",
                "private-decorated-field",
                "public-decorated-method",
                "protected-decorated-method",
                "private-decorated-method",
                "field",
                "constructor",
                "static-method",
                "instance-method",
                "abstract-method"
              ]
            }
          }
        ]
      }
    },
    {
      "files": [
        "*.html"
      ],
      "extends": [
        "plugin:@angular-eslint/template/recommended"
      ],
      "rules": {}
    }
  ]
}
