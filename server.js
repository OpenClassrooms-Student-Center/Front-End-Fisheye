const express = require('express');
const path = require('path');
const glob = require('glob');

const getServedJavaScriptFile = () => {
  const [servedJavaScriptPath] = glob.sync('scripts/compiled/*.js', {});
  return servedJavaScriptPath;
};

/*getServedJavaScriptFile().then(file => {
  //console.log(file);
});*/

const app = express();

app.use(
  '*/assets',
  express.static(path.join(__dirname, 'assets'), { redirect: false })
);
app.use(
  '*/css',
  express.static(path.join(__dirname, 'css'), { redirect: false })
);
app.use(
  '*/data',
  express.static(path.join(__dirname, 'data'), { redirect: false })
);
app.use(
  '*/scripts',
  express.static(path.join(__dirname, 'scripts'), { redirect: false })
);

app.get('/*', (req, res) => {
  const title =
    req.url === '/'
      ? 'Fisheye'
      : req.url.slice(0, 13) === '/photographer'
      ? `Photographe ${req.url.slice(14)}`
      : 'Not Found';
  res.render(path.resolve(__dirname, 'index.ejs'), {
    title: title,
    javascriptFilePath: getServedJavaScriptFile(),
  });
});

app.listen(process.env.PORT || 33468, () => {
  console.log(`Server running on port ${process.env.PORT || 33468}`);
});
