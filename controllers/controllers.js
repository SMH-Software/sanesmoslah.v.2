import nodemailer from 'nodemailer'
import Admin from '../models/admin.js'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
dotenv.config()

const JWT_SECRET = "jryqjt572ejyrkthrhtrj@#/rhngetngihi452*/869qengb@#enhnojhgug"

export const getIndex = (req, res) => {
    if(req.session.success){
        res.locals.success = req.session.success
        req.session.success = undefined
    }
    res.render('index')
}

export const getSanes = (req, res) => {
    res.render('sanes')
}

export const getAssainisement = (req, res) => {
    res.render('assainissement')
}

export const getNettoyage = (req, res) => {
    res.render('nettoyage')
}

export const getProfessionnel = (req, res) => {
   if(req.session.success){
       res.locals.success = req.session.success
       req.session.success = undefined
   }
    res.render('devis-professionnel') 
}

export const getParticulier = (req, res) => {
    if(req.session.success){
        res.locals.success = req.session.success
        req.session.success = undefined
    }
    res.render('devis-particulier') 
}

export const getBlog = (req, res) => {
    res.render('blog')
}

export const getFaq = (req, res) => {
    res.render('faq')
}

export const getContact = (req, res) => {
    if(req.session.success){
        res.locals.success = req.session.success
        req.session.success = undefined
    }
    res.render('contact')
}

export const getEspacePro = (req, res) => {
    res.render('espace-pro')
}

export const postDevisprofessionnel =  (req, res) => {

  
    
    const informations = `<h1>DEVIS PROFESSIONNEL</h1>
                            <hr>
                            <h4>Nom : ${req.body.nom }</h4>
                            <h4>Prénom : ${req.body.prenom }</h4>
                            <hr>
                            <h4>Adresse : ${req.body.adresse }</h4>
                            <h4>Code Postal : ${req.body.codepostal }</h4>
                            <h4>Ville : ${req.body.ville }</h4>
                            <h4>Téléphone : ${req.body.telephone }</h4>
                            <hr>
                            <h4>Traitement : ${req.body.traitement }</h4>
                            <h4>Nombre de chambre : ${req.body.chambre }</h4>
                            <hr>
                            <h3>Message : </h3> ${req.body.message }`
    /*const informations = 
          "Nom : " + req.body.nom + "\n" +
          "Prenom : " + req.body.prenom + "\n" +
          "Adresse : " + req.body.adresse + "\n" +
          "Code Postal : " + req.body.codepostal + "\n" +
          "Ville : " + req.body.ville + "\n" +
          "Téléphone : " + req.body.telephone + "\n" +
          "Traitement : " + req.body.traitement + "\n" +
          "Nombre de chambre : " + req.body.chambre + "\n\n" +
          "Message : " + req.body.message
       */ 
   
    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        auth:{
            user: process.env.USER,
            pass: process.env.PASS
        },
        tls:{
            rejectUnauthorized: false
        }
    })

    const mailOptions = {
        from: process.env.USER,
        to: process.env.DESTINATE,
        subject: process.env.SUBJECT,
        html: informations,
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if(err){
            console.log(err)
        }else{

            req.session.success = "Votre dévis à bien été soumis"
            res.redirect('/devis-professionnel')
       }
    
    })

}

export const postDevisparticulier = (req, res) => {

   
    
    const informations = `<h1>DEVIS PARTICULIER</h1>
                            <hr>
                            <h4>Nom : ${req.body.nom }</h4>
                            <h4>Prénom : ${req.body.prenom }</h4>
                            <hr>
                            <h4>Adresse : ${req.body.adresse }</h4>
                            <h4>Code Postal : ${req.body.codepostal }</h4>
                            <h4>Ville : ${req.body.ville }</h4>
                            <h4>Téléphone : ${req.body.telephone }</h4>
                            <hr>
                            <h4>Traitement : ${req.body.traitement }</h4>
                            <hr>
                            <h3>Message : </h3> ${req.body.message }`
    
   
    const transporter = nodemailer.createTransport({ 
        service: process.env.SERVICE,
        auth:{
            user: process.env.USER,
            pass: process.env.PASS
        },
        tls:{
            rejectUnauthorized: false
        }
    })

    const mailOptions = {
        from: process.env.USER,
        to: process.env.DESTINATE,
        subject: process.env.SUBJECT,
        html: informations
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if(err){
            console.log(err)
        }else{

            req.session.success = "Votre dévis à bien été soumis"
            res.redirect('/devis-particulier')
       }
    
    })

}

export const postNewsletter = (req, res) => {

  const informations = `<h1>NOUVELLE INSCRIPTION A LA NEWSLETTER</h1>
                            <hr>
                            <h3>Inscrit : ${req.body.email }</h3>
                            <hr>`
     
      
    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        auth:{
            user: process.env.USER,
            pass: process.env.PASS
        },
        tls:{
            rejectUnauthorized: false
        }
    })

    const mailOptions = {
        from: process.env.USER,
        to: process.env.DESTINATE,
        subject: process.env.SUBJECT,
        html: informations
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if(err){
            console.log(err)
        }else{

            req.session.success = "Inscription à notre Newsletter réussie ! "
            res.redirect('/')
       }
    
    })

}


export const postContact = (req, res) => {

    const informations = `<h1>${req.body.nom }  vous à contacté </h1>
                              <hr>
                              <h3>E-mail : ${req.body.email }</h3>
                              <hr>
                              <h3>Message :</h3>${req.body.message }
                              `
       
        
      const transporter = nodemailer.createTransport({
          service: process.env.SERVICE,
          auth:{
              user: process.env.USER,
              pass: process.env.PASS
          },
          tls:{
              rejectUnauthorized: false
          }
      })
  
      const mailOptions = {
          from: process.env.USER,
          to: process.env.DESTINATE,
          subject: process.env.SUBJECT,
          html: informations
      }
  
      transporter.sendMail(mailOptions, (err, data) => {
          if(err){
              console.log(err)
          }else{
  
              req.session.success = "Votre message à bien été envoyé !"
              res.redirect('/contact')
         }
      
      })
  
}

export const postAdmin = async (req, res) => {
    const { login, passe } = req.body
    const password = await bcrypt.hash(passe, 10)

    const admin = new Admin({
        login: login,
        password: password
    })

    await admin.save()
    console.log("Admin ajouté avec succès !")
    res.redirect('/espace-pro')
   
}

export const ConnectAdmin = async (req, res) => {
    const { login, passe } = req.body
    const user = await Admin.findOne({ login }).lean()

    if(await bcrypt.compare(passe, user.password)){
        
        const token = jwt.sign({
            id: user._id,
            username: user.login
        }, JWT_SECRET )

        return res.json({ status: 'ok', data: token })
    }else{
        return res.redirect('/espace-pro')
    }
}



