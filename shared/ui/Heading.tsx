'use client'

interface IHeading {
  title: string
  subtitle?: string
  center?: boolean
}

const Heading: React.FC<IHeading> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className="text-2xl font-bold text-black dark:text-white">{title}</div>
      <div className="font-light text-neutral-500 mt-2">{subtitle}</div>
    </div>
  )
}

export default Heading
