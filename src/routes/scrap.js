"use strict";

import Express from 'express'
import { karirpadRoute } from './scrap-karirpad.js'

let router = Express.Router()

router.use('/karirpad', karirpadRoute);

export { router as scrapRoute }
