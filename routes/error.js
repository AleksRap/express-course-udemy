import { Router } from 'express';
import { PAGE_CONSTANTS } from '../constants/pageVariables.js';

export const errorRouter = Router();

errorRouter.get('/', (req, res) => {
  res.render('404', PAGE_CONSTANTS.error);
})
