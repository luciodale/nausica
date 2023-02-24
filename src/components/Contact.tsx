import classNames from 'classnames'
import { useState } from 'preact/hooks'
import { Loader } from './Loader'

const inputClass =
  'p-3 text-black rounded-lg bg-transparent border border-tortora-600 focus:border-tortora-900 focus:outline-double focus:outline-tortora-900'

export function Contact() {
  const [formState, setFormState] = useState<
    'isLoading' | 'isError' | 'isSuccess' | 'isIdle'
  >('isIdle')

  const [message, setMessage] = useState<FormDataEntryValue>()

  async function submitContactForm(evt) {
    evt.preventDefault()
    const formData = new FormData(evt.target)
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
      const data = await res.json()
      setFormState('isSuccess')
    } catch (err) {
      setFormState('isError')
      setMessage(obj.message)
      console.log(err)
    }
  }

  const subject = 'Contact Form Nausica'

  const loadingComponent = (
    <div className='flex justify-center items-center h-40'>
      <Loader />
    </div>
  )

  const successComponent = (
    <div className='flex justify-center text-2xl text-center text-black items-center h-40'>
      Grazie per il messaggio! Ti risponderemo a breve.
    </div>
  )

  const errorComponent = (
    <div className='flex justify-center text-2xl text-center text-black items-center h-40'>
      <div>
        Mmm.. qualcosa è andato storto! Mandaci un messaggio su{' '}
        <a
          className='underline'
          href={`mailto:nausicabeach@gmail.com?subject=${subject}&body=${message}`}
        >
          nausicabeach@gmail.com
        </a>
      </div>
    </div>
  )

  return (
    <>
      <div className='bg-tortora-200 py-10 px-4 sm:px-0 flex justify-center'>
        <div className='w-full sm:w-[500px]'>
          <div
            id='contact-us'
            className='scroll-mt-14 text-3xl font-light text-tortora-900 text-center pb-6'
          >
            Contattaci
          </div>

          {formState === 'isLoading' && loadingComponent}
          {formState === 'isSuccess' && successComponent}
          {formState === 'isError' && errorComponent}
          {formState === 'isIdle' && (
            <form onSubmit={submitContactForm} className='flex flex-col gap-4'>
              <input type='hidden' name='subject' value={subject} />
              <input
                type='hidden'
                name='access_key'
                value='ea213c46-9bae-48a2-9244-fcc92aba24b2'
              />
              <div class='flex flex-col md:flex-row gap-4'>
                <input
                  name='name'
                  placeholder='Nome'
                  required
                  className={classNames('w-full md:w-1/2', inputClass)}
                />
                <input
                  name='email'
                  required
                  type='email'
                  placeholder='Email'
                  className={classNames('w-full md:w-1/2', inputClass)}
                />
              </div>
              <textarea
                name='message'
                placeholder='Messaggio'
                rows={3}
                required
                className={classNames('w-full', inputClass)}
              />

              <button
                type='submit'
                className='uppercase rounded-lg p-4 text-sm font-extrabold text-tortora-200 bg-tortora-500 border border-tortora-900 hover:shadow-lg'
              >
                Invia messaggio
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
