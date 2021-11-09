import { Router } from 'express';
import { PAGE_CONSTANTS } from '../constants/pageVariables.js';

export const homeRouter = Router();

homeRouter.get('/', (req, res) => {
  res.render('index', PAGE_CONSTANTS.main);
})
