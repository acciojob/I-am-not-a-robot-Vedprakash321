const images = document.querySelectorAll('.img');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const para = document.getElementById('para');

let selectedImages = [];
let isVerifyButtonVisible = false;

function shuffleImages() {
    const imageUrls = [
        "https://picsum.photos/id/237/200/300",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/200/300?grayscale",
        "https://picsum.photos/200/300/",
        "https://picsum.photos/200/300.jpg"
    ];

    // Duplicate one of the images randomly
    const randomIndex = Math.floor(Math.random() * 5);
    imageUrls.push(imageUrls[randomIndex]);

    // Shuffle the image URLs
    const shuffledImages = imageUrls.sort(() => Math.random() - 0.5);

    images.forEach((img, index) => {
        img.src = shuffledImages[index];
        img.classList.remove('selected');
    });

    // Reset state
    selectedImages = [];
    isVerifyButtonVisible = false;
    verifyButton.style.display = 'none';
    para.textContent = '';
}

function handleImageClick(event) {
    const clickedImage = event.target;

    // If the same image is clicked twice, do nothing
    if (selectedImages.includes(clickedImage)) {
        return;
    }

    clickedImage.classList.add('selected');
    selectedImages.push(clickedImage);

    if (selectedImages.length === 2) {
        isVerifyButtonVisible = true;
        verifyButton.style.display = 'block';
    }

    if (selectedImages.length > 2) {
        selectedImages.shift().classList.remove('selected');
    }
}

function handleVerifyClick() {
    if (selectedImages[0].src === selectedImages[1].src) {
        para.textContent = 'You are a human. Congratulations!';
    } else {
        para.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
    }

    // Hide verify button
    verifyButton.style.display = 'none';
}

function handleResetClick() {
    shuffleImages();
    para.textContent = '';
    verifyButton.style.display = 'none';
}

images.forEach(img => img.addEventListener('click', handleImageClick));
verifyButton.addEventListener('click', handleVerifyClick);
resetButton.addEventListener('click', handleResetClick);

// Initial shuffle on page load
shuffleImages();
