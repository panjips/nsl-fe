import fs from "fs";
import path from "path";

// Get module name from command line arguments
const args = process.argv.slice(2);
const moduleName = args[0];
const basePath = args[1] || "src/modules";

if (!moduleName) {
  console.error(
    "Please provide a module name, e.g., node generate-module.js feature-product"
  );
  process.exit(1);
}

// Convert module name to different formats
const kebabCase = moduleName;
const pascalCase = kebabCase
  .split("-")
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join("");
const camelCase = pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);

// Create directory structure
const moduleDir = path.join(process.cwd(), basePath, kebabCase);
const dirs = ["", "components", "data", "domain", "hooks", "pages", "stores"];

console.log(`Creating module: ${moduleName}`);

// Create directories
dirs.forEach((dir) => {
  const dirPath = path.join(moduleDir, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
});

// Create index files
const indexFiles = {
  "": `// export * from "./components";
// export * from "./data";
// export * from "./domain";
// export * from "./pages";
// export * from "./stores";
// export * from "./hooks";
`,
  components: `// export * from "./example-component";`,
  data: `// export * from "./example-data";`,
  domain: `// export * from "./example-domain;`,
  hooks: `// export * from "./use-example";`,
  pages: `// export * from "./example-page";`,
  stores: `// export * from "./state";
// export * from "./store";
`,
};

// Create domain entity file
const domainFile = `export interface ${pascalCase} {
  id: string;
  name: string;
  description: string;
}
`;

// Write all index files
Object.entries(indexFiles).forEach(([dir, content]) => {
  const filePath = path.join(moduleDir, dir, "index.ts");
  fs.writeFileSync(filePath, content);
  console.log(`Created file: ${filePath}`);
});

console.log(`\nModule ${moduleName} has been successfully created!`);
