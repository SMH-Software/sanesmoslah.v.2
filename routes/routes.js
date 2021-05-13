import express from 'express'
import { getIndex, getSanes, getAssainisement, getNettoyage, getProfessionnel, getParticulier, getBlog, getFaq, getContact, postDevisprofessionnel, postDevisparticulier, postNewsletter,
    postContact, getEspacePro, postAdmin, ConnectAdmin } from '../controllers/controllers.js'

const router = express.Router()

router.get('/', getIndex)
router.get('/sanes', getSanes)
router.get('/assainissement', getAssainisement)
router.get('/nettoyage', getNettoyage)
router.get('/devis-professionnel', getProfessionnel)
router.get('/devis-particulier', getParticulier)
router.get('/blog', getBlog)
router.get('/faq', getFaq)
router.get('/contact', getContact)
router.get('/espace-pro', getEspacePro)
router.post('/envoidevisprofessionnel', postDevisprofessionnel)
router.post('/envoi-devis-particulier', postDevisparticulier)
router.post('/newsletter', postNewsletter)
router.post('/sendcontact', postContact)
router.post('/admin', postAdmin)
router.post('/adminconnect', ConnectAdmin)

export default router  