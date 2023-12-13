import { typescript } from 'projen';
import {NodePackageManager} from "projen/lib/javascript";
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'drizzle-turso-reproduction',
  projenrcTs: true,

  tsconfig: {
    compilerOptions: {
      skipLibCheck: true,
      resolveJsonModule: true,
      module: 'commonjs',
      allowJs: true,
    },
    include: [
      'src/**/*.ts',
      'src/**/*.js',
      'src/**/*.json',
    ],
    exclude: [
      'node_modules',
      'dist',
      'src/**/.graphql',
    ],
  },

  packageManager: NodePackageManager.NPM,
  jest: true,

  gitignore: [
    '_secrets',
    '**/one_time.ts',
    '*_one_time*',
    '.env',
  ],

  deps: [
    'drizzle-kit',
    'drizzle-orm',
    '@libsql/client',
    'drizzle-zod@',
  ],
  devDeps: [
    'tsx',
    'ts-node',
    'dotenv',
  ],
});

project.setScript(
    'generate',
    'drizzle-kit generate:sqlite --out ./src/drizzle/migrations --breakpoints --schema=./src/drizzle/schema.ts'
);

project.setScript(
    'migrate',
    'ts-node ./src/drizzle/migrate.ts'
);

project.synth();