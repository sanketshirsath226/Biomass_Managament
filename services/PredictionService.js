import * as tf from '@tensorflow/tfjs';

const model = await tf.loadGraphModel('file:///path/to/model.json');

export const predictBiomassAvailability = async (data) => {
  const prediction = model.predict(data);
  return prediction.dataSync();
};