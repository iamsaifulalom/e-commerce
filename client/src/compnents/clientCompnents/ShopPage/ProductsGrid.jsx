export default function ProductsGrid({ style, children, ...props }) {
  return (
    <div
      {...props}
      style={style}
      className='grid gap-3 mt-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
      {children}
    </div>
  )
}
