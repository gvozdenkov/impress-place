import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'js-yaml';
import fs from 'fs';

var docRouter = Router();

var openApiSpecRu = YAML.load(fs.readFileSync('docs/openapi.rus.yaml', 'utf-8'));
var openApiSpecEn = YAML.load(fs.readFileSync('docs/openapi.eng.yaml', 'utf-8'));

// @ts-ignore
docRouter.use('/en', swaggerUi.serveFiles(openApiSpecEn, {}), swaggerUi.setup(openApiSpecEn));
// @ts-ignore
docRouter.use('/ru', swaggerUi.serveFiles(openApiSpecRu, {}), swaggerUi.setup(openApiSpecRu));

export { docRouter };
