const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');

// Configure Nunjucks
const env = nunjucks.configure(['src/templates', 'src'], { autoescape: true });

// Template data
const templateData = {
  title: 'Bootstrap 5 Task',
  description: 'Modern responsive website using Bootstrap 5',
  author: 'Task 2 Intern'
};

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Process templates
const templates = [
  { input: 'src/index.html', output: 'dist/index.html' },
  { input: 'src/about.html', output: 'dist/about.html' },
  { input: 'src/contact.html', output: 'dist/contact.html' }
];

templates.forEach(template => {
  try {
    const content = fs.readFileSync(template.input, 'utf8');
    const rendered = nunjucks.renderString(content, templateData);
    fs.writeFileSync(template.output, rendered);
    console.log(`✓ Built ${template.output}`);
  } catch (error) {
    console.error(`✗ Error building ${template.input}:`, error.message);
  }
});

console.log('Build completed!');