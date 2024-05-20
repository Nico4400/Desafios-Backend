import { productModel } from '../models/product.model.js';
import { Faker, es} from '@faker-js/faker'


const faker = new Faker({
    locale: es
})

export class MockManager {

    async PostMockProducts(quantity){
        try {               
            if (quantity) {
                let prod = []
                for(let i=0; i <quantity; i++){
                    console.log("N",i+1)
                    let product = {
                        title: faker.commerce.productName(),
                        description: faker.commerce.productName(),
                        code: faker.string.alphanumeric({length: 10}).toUpperCase(),
                        price: faker.number.int({min: 0, max: 200}),
                        status: faker.datatype.boolean(0.85),
                        stock: faker.number.int({min: 0, max: 200}),
                        category: faker.commerce.department(),
                        thumbnail: faker.image.url()
                    }
                    const added = await productModel.create(product);
                    console.log("Agregados",added)
                    prod.push(added)
                }
                return {message: 'Ok', rdo:prod}
            }
        } catch (error) {
            return {message: `Error Mock Products - ${error}`}
        }
    }
}

export default MockManager
