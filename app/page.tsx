import Link from 'next/link'

export default function Home() {
  return (
    <section className='py-24'>
    <div className='container'>
      <div className='mx-auto max-w-2xl py-32'>
        <div className='hidden sm:mb-8 sm:flex sm:justify-center'>
          <div className='relative rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
            Jump right in
            <Link href='/chat' className='font-semibold text-emerald-600 pl-1'>
              <span aria-hidden='true' className='absolute inset-0' />
               Start chatting <span aria-hidden='true'>&rarr;</span>
            </Link>
          </div>
        </div>
        <div className='text-center'>
          <h1 className='text-4xl font-bold tracking-tight sm:text-6xl'>
            Realtime chat and video
          </h1>
          <p className='mt-6 text-lg leading-8 text-muted-foreground'>
            Stay connected with seamless real-time messaging and high-quality video calls. Our platform offers instant communication, 
            secure video conferencing, and a user-friendly experience — all in one place.
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <Link
              href='/chat'
              className='rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600'
            >
              Get started
            </Link>
            <Link href='/' className='text-sm font-semibold leading-6'>
              Learn more <span aria-hidden='true'>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
