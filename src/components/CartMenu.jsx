


function CardMenu({menu,click}) {
  return (
   <>
   <img width={10000} height={150} role='button' onClick={click} className='rounded-circle w-100' src={`/${menu.menu_image}`} alt="image" />
   <p className='text-center'>{menu.menu_name}</p>
   </>
  )
}

export default CardMenu