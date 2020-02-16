import React from 'react'
import Product from './Product.js'
import axios from 'axios'
import { Input, Select, Button, Form } from 'semantic-ui-react'

const URL = "http://ecommerceproduct-backend.herokuapp.com";

class Container extends React.Component{

constructor(props) {
    super(props);
    this.state = {
        productList: [],
        inputValue: "",
        selectValue: "brand",
        added: 0,
        name: "",
        brand: "",
        size: "",
        price: "",
        seller: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.updateProductList = this.updateProductList.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
}

updateProductList() {
    axios.get(
         URL + "/product", {
            params: {
                 filter_type: "",
                 filter_value: ""
            }
         }
    ).then((response) => {
        this.setState({productList: response.data});;
    });
}

componentDidMount() {
    this.updateProductList();
}


handleClick(event){
    axios.get(
        URL + "/product",
        {
            params: {
                filter_type: this.state.selectValue,
                filter_value: this.state.inputValue
            }
        }
    ).then((response) => {
         return this.setState({productList: response.data});;
    });
}

handleDelete = (event, { value }) => {
    axios.delete(URL + "/product/" + value);
    this.updateProductList();
}

handleAddClick(){
    axios.post(
        URL + "/product", {
                name: this.state.name,
                size: this.state.size,
                price: this.state.price,
                brand: this.state.brand,
                seller: this.state.seller
            }
    ).then((response) => {
        this.updateProductList();
        this.setState({name: '', size: '', price: '', brand: '', seller: ''});
    });


}

handleInputChange(event) {
    this.setState({inputValue: event.target.value});
}

handleSelectChange(event, {value}) {
    this.setState({selectValue: value});
}

handleChange = (e, { name, value }) => {
 this.setState({ [name]: value });
}

render(){

let filterOptions = [
        { key: 'brand', value: 'brand', text: 'Brand' },
        { key: 'size', value: 'size', text: 'Size' },
        { key: 'price', value: 'price', text: 'Price' }
    ];

    const options = [
      { key: 'm', text: 'M', value: 'M' },
      { key: 'l', text: 'L', value: 'L' },
      { key: 's', text: 'S', value: 'S' },
      { key: 'fs', text: 'FS', value: 'FS' },
    ]

return(
<div>
  <Input type='text' placeholder='Search...' action>
      <input onChange={this.handleInputChange}/>
      <Select onChange={this.handleSelectChange} compact options={filterOptions} defaultValue={this.state.selectValue}/>
      <Button type='submit' onClick={this.handleClick}>Search</Button>
    </Input>
    <Product data={this.state.productList} handleDelete={this.handleDelete}/>
    <Form>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Name' name='name' placeholder='Name' onChange={this.handleChange}/>
              <Form.Input fluid label='Brand' name='brand' placeholder='Brand' onChange={this.handleChange}/>
              <Form.Select
                fluid
                label='Size'
                options={options}
                placeholder='Size'
                name='size'
                onChange={this.handleChange}
              />
              <Form.Input fluid label='Price' name='price' placeholder='Price' onChange={this.handleChange}/>
              <Form.Input fluid label='Seller' name='seller' placeholder='Seller' onChange={this.handleChange}/>
            </Form.Group>
            <Form.Button onClick={this.handleAddClick}>AddItem</Form.Button>
          </Form>
    </div>


);


}

}

export default Container;