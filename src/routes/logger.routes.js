import { Router } from "express";
import logger from "../utils/logger.js";

const router = Router();

router.get('/loggerTest', (req, res) => {
    logger.debug('Mensaje de nivel debug');
    logger.http('Mensaje de nivel http');
    logger.info('Mensaje de nivel info');
    logger.warn('Mensaje de nivel warning');
    logger.error('Mensaje de nivel error');
    logger.log('fatal', 'Mensaje de nivel fatal');  // Configura `fatal` si lo necesitas

    res.send('Logs de prueba generados');
});

export default router;