import Image from 'next/image';
import React from 'react'

const page = () => {
  return (
    <section className='h-[92vh] w-full bg-muted flex flex-col items-center'>
        <div className='max-w-lg'>
            <Image src="/unauthorized.jpg" alt='unauthorized' fill />
        </div>
    </section>
  )
}

export default page;