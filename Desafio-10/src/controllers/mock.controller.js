import MockManager from "../dao/managers/MockManager.js";

export const PostMockProducts = async (req, res) => {
  
  //Cantidad de productos a generar
  const quantity = 2
  
    try {
        const products = new MockManager();  
        const response = await products.PostMockProducts(quantity)         
        if(response.message === 'Ok'){
            res.send({status: 'success', payload: response})
        } else {
            res.status(400).json(response)
        }
    } catch (error) {
        res.status(400).json({message: `No podemos generar los productos - ${error}`})
    }
}
