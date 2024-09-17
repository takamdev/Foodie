
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from 'sonner'
import emailjs from '@emailjs/browser'
import { useState } from "react"
const schema = yup
  .object({
    nom: yup.string().required("ce champ est oubligatoire"),
    sujet:yup.string().required("ce champ est oubligatoire"),
    message:yup.string().required("ce champ est oubligatoire")
  })
  .required()


function Contact() {
  const [send, setSend]= useState(true)
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) =>{
    setSend(false)
    var templateParams = {
      nom:data.nom,
      sujet:data.sujet,
      message:data.message
    };
    
    emailjs.send('service_3g963ee','template_v6vxfok', templateParams ,'ZM_hUk1I2FumtCzBZ').then(
      () => {
        console.log('SUCCESS!');
        setSend(true)
        reset()
        toast.success('merci de votre confiance !!',{
          className:"text-success fs-4"
        })
      },
      (error) => {
        console.log('FAILED...', error);
      },
    );
  }

  return (
    <section className='container mt-5' style={{height:"78vh"}}>
    <p className=' text-center fw-bold fs-2'>Contact Us</p>
       <article className='row mt-3 mb-3'>
        <div className="col-sm-12 col-md-6 col-lg-6">
        <iframe className="w-100 h-100"  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3980.100344972524!2d9.762821074975237!3d3.999789695973972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1svillage%20borne%2010%20douala!5e0!3m2!1sfr!2scm!4v1713201119757!5m2!1sfr!2scm" allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6">
          <form onSubmit={handleSubmit(onSubmit)} className='w-100'>
            <label className='mt-2' htmlFor="nom">Nom</label>
            <input {...register("nom")} type="text" id='nom' className='form-control mt-2' />
            <p className='text-danger'>{errors.nom?.message}</p>
            <label className='mt-2' htmlFor="sujet">Sujet</label>
            <input {...register("sujet")}  type="text" id='Sujet' className='form-control mt-2' />
            <p className='text-danger'>{errors.sujet?.message}</p>
            <label className='mt-2' htmlFor="message">Message</label>
            <textarea {...register("message")} className='form-control mt-2 mb-4' id="message" cols="30" rows="3"></textarea>
            <p className='text-danger'>{errors.message?.message}</p>
            <button type='submit' className={`btn btn-secondary w-100 ${!send && "disabled"}`}>
            <span className={`fs-5 ${!send && "d-none"}`}>Envoyer</span>
            <span  className={`spinner-border ${send && "d-none"}`} aria-hidden="true"></span>
            </button>
          </form>
        </div>
       </article>
    </section>
  )
}



export default Contact
