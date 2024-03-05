import pino from 'pino';
import path from 'path';
import fs from 'fs';
import pretty from 'pino-pretty';
import { fileURLToPath } from 'url';

var dirname = path.dirname(fileURLToPath(import.meta.url));

var streams = [
  { stream: pretty() },
  {
    stream: fs.createWriteStream(`${dirname}/request.log`),
  },
  { level: 'error', stream: fs.createWriteStream(`${dirname}/error.log`) },
];

export var logger = pino(
  {
    level: 'debug',
    base: undefined,
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  pino.multistream(streams),
);
