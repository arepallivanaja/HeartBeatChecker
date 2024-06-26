//Using type Script 

import * as fs from 'fs';

import { DateTime } from 'luxon';

interface HeartRateMeasurement {

beatsPerMinute: number;

timestamps: {

startTime: string;

endTime: string;

};

}

interface OutputEntry {

date: string;

min: number;

max: number;

median: number;

latestDataTimestamp: string;

}

// Read data from heartrate.json

const rawData: HeartRateMeasurement[] = JSON.parse(fs.readFileSync('heartrate.json', 'utf8'));

// Process the data and calculate statistics

const outputData: OutputEntry[] = [];

for (const measurement of rawData) {

const bpm = measurement.beatsPerMinute;

const startDateTime = DateTime.fromISO(measurement.timestamps.startTime);

const endDateTime = DateTime.fromISO(measurement.timestamps.endTime);

// Extract date

const date = startDateTime.toISODate();

// Calculate statistics

const minBpm = Math.min(...bpmValues);

const maxBpm = Math.max(...bpmValues);

const medianBpm = calculateMedian(bpmValues);

// Function to calculate median

function calculateMedian(values: number[]): number {

const sortedValues = values.sort((a, b) => a - b);

const length = sortedValues.length;

if (length % 2 === 0) {

const middle = length / 2;

return (sortedValues[middle - 1] + sortedValues[middle]) / 2;

} else {

const middle = Math.floor(length / 2);

return sortedValues[middle];

}

}

const latestDataTimestamp = measurement.timestamps.endTime;

// Format the output

const outputEntry: OutputEntry = {

date,

min: minBpm,

max: maxBpm,

median: medianBpm,

latestDataTimestamp,

};

outputData.push(outputEntry);

}

// Write the output to output.json

fs.writeFileSync('output.json', JSON.stringify(outputData, null, 2));

console.log('Output successfully written to output.json');
