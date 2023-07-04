/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
// Import required modules
const fs = require('fs');
const download = require('image-downloader');
const axios = require('axios');
const path = require('path');
const { SingleBar } = require('cli-progress');
const logger = require('./App/log');

// API URL for card information
const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

// Folder path to save downloaded images
const folder = path.join(__dirname, 'card_images');

// Function to download images
async function downloadImages() {
  createFolderIfNotExists(folder);
  try {
    // Fetch card information from the API
    const response = await axios.get(apiUrl);
    const { data } = response.data;

    // Get total number of images
    const totalImages = getTotalImages(data);

    // Create a progress bar with the total number of images
    const progressBar = new SingleBar({
      format: 'Progress [{bar}] {percentage}% | ETA: {eta_formatted} | {value}/{total}',
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true,
    });
    progressBar.start(totalImages, 0); // Start the progress bar

    let downloadedImages = 0;

    // Iterate over each card in the data
    for (let i = 0; i < data.length; i++) {
      const card = data[i];

      // Check if the card has images
      if (card.card_images && card.card_images.length > 0) {
        // Iterate over each image of the card
        for (let j = 0; j < card.card_images.length; j++) {
          const imgObj = card.card_images[j];
          if (imgObj.image_url) {
            const imageUrl = imgObj.image_url;
            const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
            const imagePath = path.join(folder, fileName);

            // Check if the image file already exists
            if (!fs.existsSync(imagePath)) {
              // Download the image and wait for it to complete
              await downloadImage(imageUrl, imagePath);
              downloadedImages++;

              // Update the progress bar
              progressBar.update(downloadedImages);
              await wait(250);
            } else {
              downloadedImages++;
              progressBar.update(downloadedImages);
            }
          }
        }
      }
    }

    progressBar.stop();
    logger.log('Yu-Gi-Oh! images database is up to date!');
  } catch (error) {
    logger.error('Error occurred while downloading images:', error);
  }
}

// Function to download an image from a given URL and save it to a file
async function downloadImage(url, filePath) {
  try {
    await download.image({
      url,
      dest: filePath,
    });
  } catch (error) {
    logger.error(`Error downloading ${url}:`, error);
  }
}

// Function to create a folder if it doesn't exist
function createFolderIfNotExists(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
}

// Function to wait for a specified number of milliseconds
// eslint-disable-next-line no-promise-executor-return
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to get the total number of images
function getTotalImages(data) {
  let totalImages = 0;
  for (let i = 0; i < data.length; i++) {
    const card = data[i];
    if (card.card_images && card.card_images.length > 0) {
      totalImages += card.card_images.length;
    }
  }
  return totalImages;
}

// Call the downloadImages function to start the image download process
downloadImages();
