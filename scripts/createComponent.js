// Create the following structure in the project:
// src/components/componentName/ComponentName.tsx
// src/components/componentName/componentName.module.css

import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentNames = process.argv.slice(2);

componentNames.forEach((componentName) => {
    const componentNameCapitalized = componentName.charAt(0).toUpperCase() + componentName.slice(1);

    const componentPath = path.join(__dirname, '..', 'src', 'components', componentName);
    const componentFile = path.join(componentPath, `${componentNameCapitalized}.tsx`);
    const componentCssFile = path.join(componentPath, `${componentName}.module.css`);

    fs.mkdirSync(componentPath);
    fs.writeFileSync(componentFile, `import styles from './${componentName}.module.css';

// TYPES
import { ${componentNameCapitalized}Props } from '@/types/${componentNameCapitalized}Types';

export default function ${componentNameCapitalized}({}: ${componentNameCapitalized}Props) {
    return (
        <div>
            ${componentNameCapitalized}
        </div>
    );
};
`);
    fs.writeFileSync(componentCssFile, ``);

    console.log(`${componentNameCapitalized} Component created successfully!`);
});