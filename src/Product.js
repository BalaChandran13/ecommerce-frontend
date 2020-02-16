import React from 'react'
import { Icon, Label, Menu, Table, Button } from 'semantic-ui-react'

class Product extends React.Component {
 render () {

 let headerName = ["Name", "Brand", "Size", "Price", "Seller", ""];
  let productList = this.props.data;
  return (
  <Table celled>
    <Table.Header>
      <Table.Row>
      {
      headerName.map((header) => {
      return <Table.HeaderCell>{header}</Table.HeaderCell>;
      })
      }
      </Table.Row>
    </Table.Header>

    <Table.Body>
          {
          productList.map((product) => {
          return <Table.Row>
          <Table.Cell>{product.name}</Table.Cell>
          <Table.Cell>{product.brand}</Table.Cell>
          <Table.Cell>{product.size}</Table.Cell>
          <Table.Cell>{product.price}</Table.Cell>
          <Table.Cell>{product.seller}</Table.Cell>
          <Table.Cell>  <Button icon>
                          <Icon name='minus' />
                        </Button>
           </Table.Cell>
          </Table.Row>;
          })
          }
    </Table.Body>
  </Table>
  );
  }
}

export default Product