class Products {
    ID;
    Name;
    Description;
    Price;
    Category;
    Mainimage;

    constructor(id, name, price, despcription, category, mainimage) {
        this.ID = id;
        this.Name = name;
        this.Description = despcription;
        this.Price = price;
        this.Category = category;
        this.Mainimage = mainimage;
    }
    setID(id) {
        this.ID = id;
    }
    getID() {
        return this.ID;
    }
    setName(name) {
        this.Name = name;
    }
    getName() {
        return this.Name;
    }
    setDescription(description) {
        this.Description = description;
    }
    getDescription() {
        return this.Description;
    }
    setPrice(price) {
        this.Price = price;
    }
    getPrice() {
        return this.Price;
    }
    setCategory(category) {
        this.Category = category;
    }
    getCategory() {
        return this.Category;
    }
    setMainimage(url) {
        this.Mainimage = url;
    }
    getMainimage() {
        return this.Mainimage;
    }
}
export default Products;