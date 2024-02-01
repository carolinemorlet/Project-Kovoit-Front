function formatURL(inputURL) {
  if (!inputURL.startsWith('http://') && !inputURL.startsWith('https://')) {
    return 'http://' + inputURL;
  }

  return inputURL;
}


