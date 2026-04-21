const requireContext = require.context('.', false, /\.(png|jpe?g|svg)$/);

const assets = requireContext.keys().reduce((assets, file) => {
  const key = file.replace('./', '').replace(/\.(png|jpe?g|svg)$/, '');
  assets[key] = requireContext(file);
  return assets;
}, {});

export default assets;
