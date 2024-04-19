let downloadLink, pngDataUrl;
document.getElementById('svgFileInput').addEventListener('change', handleFile);

function handleFile(event) {
    event.preventDefault()
    const fileInput = event.target;
    const svgPreview = document.getElementById('svgPreview');

    if (fileInput.files.length > 0) {
        convertButton.style.pointerEvents = 'all';

        const svgFile = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const svgContent = e.target.result;
            // Display the SVG image preview
            svgPreview.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="max-width:200px">' + svgContent + '</svg><p id="previewName" >' + svgFile.name + '<br/>' + parseFloat(svgFile.size / 1024).toFixed(2) + "KB" + '</p>';
        };

        reader.readAsText(svgFile);
    }
}
function reset() {
    svgPreview.innerHTML = `<img src="CloudUploading.webp"
        onclick="svgFileInput.click()"
        alt="SVG Preview">
    <p style="color: #4f4c5e;">
        Click Here to Upload SVG
    </p>`;
    svgFileInput.value = null;
    downloadButton.style.display = 'none';
    convertButton.style.display = "inline";
    convertButton.style.pointerEvents = 'none';

}
function convertToPNG() {
    const svgPreview = document.getElementById('svgPreview');
    const svgElement = svgPreview.querySelector('svg');

    if (svgElement) {
        // Create a temporary canvas for drawing
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Set canvas dimensions to match the SVG image
        canvas.width = svgElement.clientWidth;
        canvas.height = svgElement.clientHeight;
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const img = new Image();
        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);

        img.onload = function () {
            context.drawImage(img, 0, 0, svgElement.clientWidth, svgElement.clientHeight);

            // Convert canvas to PNG data URL
            pngDataUrl = canvas.toDataURL('image/png');

            // Create a temporary download link
            downloadLink = document.createElement('a');
            downloadLink.href = pngDataUrl;
            downloadLink.download = 'converted_image.png';
        };

        convertButton.innerText = "Converting...";
        setTimeout(() => {
            convertButton.style.display = 'none';
            downloadButton.style.display = "inline";
            convertButton.innerText = "Convert";
            previewName.innerText = downloadLink.download + '\n' + parseFloat(((pngDataUrl.length * 3) / 4) / 1024).toFixed(2) + "KB"


        }, 1000);

    } else {
        alert('Please select an SVG file and preview it before converting.');
    }
}
function downloadPNG() {
    downloadLink.click();
    downloadButton.style.display = 'none';
    convertButton.style.display = "inline";
}