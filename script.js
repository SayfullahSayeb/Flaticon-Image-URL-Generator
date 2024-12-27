document.getElementById('generate-btn').addEventListener('click', function () {
  const pageUrl = document.getElementById('page-url').value.trim();
  const imageSize = document.getElementById('image-size').value;
  const errorMessage = document.getElementById('error-message');

  errorMessage.style.display = 'none';
  if (!pageUrl) {
    errorMessage.textContent = 'Please enter a valid URL.';
    errorMessage.style.display = 'block';
    return;
  }

  const match = pageUrl.match(/_(\d+)/);
  if (match) {
    const iconId = match[1];
    const folderPath = iconId.substring(0, iconId.length - 3);
    const imageUrl = `https://cdn-icons-png.flaticon.com/${imageSize}/${folderPath}/${iconId}.png`;

    const resultContainer = document.getElementById('result-container');
    document.getElementById('result-url').value = imageUrl;
    resultContainer.style.display = 'flex';

    const openBtn = document.getElementById('open-btn');
    openBtn.onclick = () => window.open(imageUrl, '_blank');
  } else {
    errorMessage.textContent = 'Invalid URL format. Ensure the URL contains a numeric ID after "_".';
    errorMessage.style.display = 'block';
  }
});

document.getElementById('copy-btn').addEventListener('click', function () {
  const resultUrl = document.getElementById('result-url');
  resultUrl.select();
  resultUrl.setSelectionRange(0, 99999);
  document.execCommand('copy');

  const copiedMessage = document.getElementById('copied-message');
  copiedMessage.style.display = 'block';
  setTimeout(() => {
    copiedMessage.style.display = 'none';
  }, 2000);
});
