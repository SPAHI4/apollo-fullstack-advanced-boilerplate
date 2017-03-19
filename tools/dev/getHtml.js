export default (assets, publicPath) => `
<html>
<title>React apollo boilerplate</title>
<body>
${Object.keys(assets).filter(key => key.split('.').pop() === 'js').map(key => `<script src="${publicPath}${key}"></script>`).join('\n')}
</body>
</html>
`;
