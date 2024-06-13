interface IParams {
    productId?: string
}


const Product = ({ params}: {params: IParams}) => {
  return (
    <div>Product Page</div>
  )
}

export default Product