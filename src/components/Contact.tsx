import classNames from 'classnames'
import { useState } from 'preact/hooks'
import { Loader } from './Loader'

type FormState = 'isLoading' | 'isError' | 'isSuccess' | 'isIdle'

export function Contact() {
  const [formState, setFormState] = useState<FormState>('isIdle')
  const [message, setMessage] = useState<FormDataEntryValue>()

  async function submitContactForm(evt: Event) {
    evt.preventDefault()
    const form = evt.target as HTMLFormElement
    const formData = new FormData(form)
    const entries = formData.entries()
    const obj = Object.fromEntries(entries)

    const values = JSON.stringify(obj)

    const req = fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: values
    })
    setFormState('isLoading')

    try {
      const res = await req
      await res.json()
      setFormState('isSuccess')
    } catch (err) {
      setFormState('isError')
      setMessage(obj.message)
      console.log(err)
    }
  }

  const subject = 'Contact Form Nausica'

  return (
    <section className='section-padding bg-sand-100'>
      <div className='container-narrow'>
        {/* Header */}
        <div className='text-center mb-16'>
          <span className='text-ocean-600 text-sm font-medium tracking-widest uppercase'>
            Scrivici
          </span>
          <h2 
            id='contact-us' 
            className='scroll-mt-24 mt-4 text-ink-900 justify-center'
          >
            Contattaci
          </h2>
          <div className='divider mt-6' />
          <p className='mt-6 text-ink-600 max-w-md mx-auto'>
            Hai domande o vuoi prenotare? Siamo qui per aiutarti.
          </p>
        </div>

        {/* Form Container */}
        <div className='max-w-xl mx-auto'>
          {formState === 'isLoading' && (
            <div className='flex justify-center items-center h-64'>
              <Loader />
            </div>
          )}

          {formState === 'isSuccess' && (
            <div className='text-center py-16'>
              <div className='w-16 h-16 mx-auto mb-6 rounded-full bg-ocean-100 flex items-center justify-center'>
                <svg 
                  xmlns='http://www.w3.org/2000/svg' 
                  className='w-8 h-8 text-ocean-600'
                  fill='none'
                  viewBox='0 0 24 24' 
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                </svg>
              </div>
              <h3 className='text-2xl text-ink-900 mb-2 justify-center'>Messaggio inviato!</h3>
              <p className='text-ink-600'>Ti risponderemo a breve.</p>
            </div>
          )}

          {formState === 'isError' && (
            <div className='text-center py-16'>
              <div className='w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center'>
                <svg 
                  xmlns='http://www.w3.org/2000/svg' 
                  className='w-8 h-8 text-red-600'
                  fill='none'
                  viewBox='0 0 24 24' 
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                </svg>
              </div>
              <h3 className='text-2xl text-ink-900 mb-2 justify-center'>Qualcosa è andato storto</h3>
              <p className='text-ink-600 mb-4'>
                Per favore, scrivici direttamente a{' '}
                <a
                  className='text-ocean-600 hover:text-ocean-700 underline underline-offset-2'
                  href={`mailto:nausicabeach@gmail.com?subject=${subject}&body=${message}`}
                >
                  nausicabeach@gmail.com
                </a>
              </p>
            </div>
          )}

          {formState === 'isIdle' && (
            <form onSubmit={submitContactForm} className='space-y-6'>
              <input type='hidden' name='subject' value={subject} />
              <input
                type='hidden'
                name='access_key'
                value='ea213c46-9bae-48a2-9244-fcc92aba24b2'
              />
              
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label 
                    htmlFor='name' 
                    className='block text-sm font-medium text-ink-700'
                  >
                    Nome
                  </label>
                  <input
                    id='name'
                    name='name'
                    type='text'
                    required
                    placeholder='Il tuo nome'
                    className='input-elegant'
                  />
                </div>
                <div className='space-y-2'>
                  <label 
                    htmlFor='email' 
                    className='block text-sm font-medium text-ink-700'
                  >
                    Email
                  </label>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    required
                    placeholder='La tua email'
                    className='input-elegant'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label 
                  htmlFor='message' 
                  className='block text-sm font-medium text-ink-700'
                >
                  Messaggio
                </label>
                <textarea
                  id='message'
                  name='message'
                  rows={5}
                  required
                  placeholder='Come possiamo aiutarti?'
                  className='input-elegant resize-none'
                />
              </div>

              <button
                type='submit'
                className='btn-primary w-full'
              >
                Invia messaggio
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
