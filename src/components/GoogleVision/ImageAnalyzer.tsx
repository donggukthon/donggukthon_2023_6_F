import React, { useEffect, useState } from 'react';
import { analyzeImage } from './GoogleVisionAPI';

const ImageAnalyzer = ({ imageUrl, onDetectionResult }) => {
    const [analysisResult, setAnalysisResult] = useState(null);

    useEffect(() => {
        const convertBlobUrlToBase64 = (blobUrl) => {
            return fetch(blobUrl)
                .then(response => response.blob())
                .then(blob => new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                }));
        };

        const analyze = async () => {
            try {
                const base64Image = await convertBlobUrlToBase64(imageUrl);
                const result = await analyzeImage(base64Image);
                const labels = result.responses[0].labelAnnotations.map(label => label.description);
                setAnalysisResult(labels);
                onDetectionResult(labels);
            } catch (err) {
                alert(`분석 중 에러가 발생했습니다: ${err.message}`);
            }
        };

        if (imageUrl) {
            analyze();
        }
    }, [imageUrl]);

    if (!analysisResult) {
        return <>분석 중...</>;
    }

    return (
        <></>
    );
};

export default ImageAnalyzer;
