import { prepareCompiler as originalPrepareCompiler } from '../../src/compiler/PrepareCompiler';

export const prepareCompiler = (content, options) => originalPrepareCompiler({
  localPath: () => __dirname,
  dataSchemaFiles: () => Promise.resolve([
    { fileName: 'main.js', content: Array.isArray(content) ? content.join('\r\n') : content }
  ])
}, { adapter: 'postgres', ...options });

export const prepareYamlCompiler = (content, yamlExtension, options = {}) => {
  let files = [];
  
  if (Array.isArray(content)) {
    files = content;
  } else {
    files.push({
      fileName: yamlExtension ? 'main.yaml' : 'main.yml',
      content
    });
  }
  
  return originalPrepareCompiler({
    localPath: () => __dirname,
    dataSchemaFiles: () => Promise.resolve(files)
  }, { adapter: 'postgres', ...options });
};

export const prepareCube = (cubeName, cube, options) => {
  const fileName = `${cubeName}.js`;
  const content = `cube(${JSON.stringify(cubeName)}, ${JSON.stringify(cube).replace(/"([^"]+)":/g, '$1:')});`;

  return originalPrepareCompiler({
    localPath: () => __dirname,
    dataSchemaFiles: () => Promise.resolve([{ fileName, content }])
  }, { adapter: 'postgres', ...options });
};
