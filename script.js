function generateImageUrl() {
  const pageUrl = document.getElementById('page-url').value.trim();
  const imageSize = document.getElementById('image-size').value;
  const errorMessage = document.getElementById('error-message');
  const resultContainer = document.getElementById('result-container');
  
  errorMessage.style.display = 'none';
  if (!pageUrl) {
    resultContainer.style.display = 'none';
    return;
  }

  const match = pageUrl.match(/_(\d+)/);
  if (match) {
    const iconId = match[1];
    const folderPath = iconId.substring(0, iconId.length - 3);
    const imageUrl = `https://cdn-icons-png.flaticon.com/${imageSize}/${folderPath}/${iconId}.png`;

    document.getElementById('result-url').value = imageUrl;
    resultContainer.style.display = 'flex';

    const openBtn = document.getElementById('open-btn');
    openBtn.onclick = () => window.open(imageUrl, '_blank');

    const downloadBtn = document.getElementById('download-btn');
    downloadBtn.onclick = async () => {
      try {
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `flaticon_${iconId}_${imageSize}px.png`;
        anchor.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading the image:', error);
      }
    };
  } else {
    errorMessage.textContent = 'Invalid URL format. Ensure the URL contains a numeric ID after "_".';
    errorMessage.style.display = 'block';
    resultContainer.style.display = 'none';
  }
}

// Listen for changes on the URL input and dropdown
document.getElementById('page-url').addEventListener('input', generateImageUrl);
document.getElementById('image-size').addEventListener('change', generateImageUrl);

// Copy button functionality
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
