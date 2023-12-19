import axios from 'axios';

const GOOGLE_VISION_API_URL = 'https://vision.googleapis.com/v1/images:annotate';
const API_KEY = 'AIzaSyBcGxMUY7SpNPN313Th4t__BqZaOVZo56U';

export const analyzeImage = async (base64Image) => {
  // base64 인코딩된 이미지에서 'data:image/jpeg;base64,' 접두사 제거
  const formattedImage = base64Image.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');

  const requestBody = {
    requests: [
      {
        image: {
          content: formattedImage
        },
        features: [
            { 
                type: 'LABEL_DETECTION',
                maxResults: 5,
            } // 여기에 필요한 기능을 추가하세요.
        ]
      }
    ]
  };

  try {
    const response = await axios.post(`${GOOGLE_VISION_API_URL}?key=${API_KEY}`, requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Google Vision API Error:', error);
    throw error;
  }
};
