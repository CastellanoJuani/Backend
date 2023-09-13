const fs = require('fs')

const path = 'Productos.json'

class ProductManager {
    constructor() {
        this.products = []
    }

    async addProduct(product) {
        try{
            const products = await this.getProducts()
            product.push(products)
            await fs.promises.writeFile(path, JSON.stringify(products))
        } catch(error){
            return error
        }
    }

    async getProducts() {
        try {
            if(fs.existsSync(path)){
                const products = await fs.promises.readFile(path, 'utf-8')
                return JSON.parse(products)
            } else{
                return []
            }
        } catch(error){
            return error
        }
    }

    async getProductsById(id) {
        const product = this.products.find(producto => producto.id == id)
        if(product) {
            return product
        }
        return "Not Found"
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = Product.incrementID()
    }

    static incrementID() {
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }
}

const product1 = new Product ("Fernet Branca", "Aperitivo", "2030", "", "F1", "20")
const product2 = new Product ("Gancia Americano", "Aperitivo", "843", "", "G1", "25")
const product3 = new Product ("Cynar", "Aperitivo", "1160", "", "C2", "30")
const product4 = new Product ("Aperol", "Aperitivo", "1270", "", "A1", "35")
const product5 = new Product ("Campari Bitter", "Aperitivo", "1510", "", "C1", "40")


async function test(){
    const product = new productManager()
    await product.addProduct(product1)
    const products = await product.getProducts()
    console.log(products)
}

