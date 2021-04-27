`#react.js` `#master-in-software-engineering`

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

# Assembler School: React Shopping Cart State

In this project you will learn how to create a React.js and how to apply all the
important concepts.

## Getting Started

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes.

See deployment for notes on how to deploy the project on a live system.

### The repository

First, you will need to `clone` or `fork` the repository into your Github
account:

<img src="https://docs.github.com/assets/images/help/repository/fork_button.jpg" alt="Fork on GitHub" width='450'>

```
$ git clone https://github.com/assembler-school/react-shopping-cart-state.git
```

## Contents and Branches Naming Strategy

The repository is made up of several branches that include the contents of each
section.

The branches follow a naming strategy like the following:

- `main`: includes the main contents and the instructions
- `assembler-solution`: includes the solution

### Fetching All the Branches

In order to fetch all the remote branches in the repository, you can use the
following command:

```sh
$ git fetch --all
```

### List Both Remote Tracking Branches and Local Branches

```sh
$ git branch --all
```

Then, you can create a local branch based on a remote branch with the following
command:

```sh
$ git checkout -b <new_branch_name> <remote_branch_name>
```

### Installing

First, you will need to install the dependencies with: `npm install`.

Run the following command in your terminal after cloning the main repo:

```sh
$ npm install
```

### Running the Tests

The tests that validate your solution can be executed by running the following
command:

```
$ npm run test
```

### Git `precommit` and `prepush` Hooks

In the `assembler-solution` branch you can see an implementation of these tools
if you'd like to use them.

## Deployment

In this pill we won't deploy the app.

## Technologies used

- `React.js`
- `@testing-library/react`
- `eslint`
- `prettier`
- `lint-staged`
- `husky`

## Project requirements

This is an overview of the main requirements of this project. The exact ones are
found in the doc that the academic team will provide you.

- You must follow all the instructions of the project step-by-step
- You should always try to solve them by yourself before asking for help
- You should always help your team members and fellow students of the master so
  that you can all learn together and become better software developers and team
  members
- You must finish all the steps that are marked as `Required`
- You must use semantic HTML5 elements for all the markup of the application
- Once you are done, you can move on to the optional ones that are marked as
  `Extra 💯`

### 1. Loading products from the `api`

#### File

```sh
/src/App.js
```

In this step you will need to call the `api.getProducts()` method inside the
`componentDidMount()` lifecycle method and store the data in state.

This method returns the products that the app needs. Therefore, you will need to
call `setState({products: apiProducts})` once the promise is finished.

#### Test suite name

@TODO

### 2. Status messages in the `<Home />` component

#### File

```sh
/src/pages/Home.js
```

In this step you will have to:

1. render a text of `Loading products...` when the `isLoading` prop is `true`
2. render:
   1. `<h2>Something went wrong...</h2>` when the `hasError` prop is `true`
   2. and the error message it self: `<pre><code>{loadingError}</code></pre>`

#### Test suite name

@TODO

### 3. Add products to the cart

#### File

```sh
/src/App.js
```

In this step you will have to be able to add elements to the cart:

For this, you will need to complete the code of the
`handleAddToCart(productId) {}` method in the `App` component so that:

It searches if the `state.cartItems` has a product with the `productId`

1.  if it finds it, it will have to increment the quantity of the item without
    adding a new element to the cart, just increment the quantity of the
    existing one
2.  if it doesn't find it, it will have to copy the product from the
    `state.products` property and create a new cart item in the
    `state.cartItems` property with the following keys:
    1. `id`
    2. `title`
    3. `img`
    4. `price`
    5. `unitsInStock`
    6. `createdAt`
    7. `updatedAt`
    8. `quantity`
    9. furthermore, when creating the new cart item its quantity will have to be
       incremented by 1
    10. `@hint`: the `createdAt` and `updatedAt` values can be created with:
        `new Date().toISOString()`

### Extra steps 💯

1. Check if the `item.quantity >= item.unitsInStock` so that users cannot add
   items to the cart if the current `quantity` is greater or equal to the
   `unitsInStock`

### Sample state shape with cart items

```json
{
  "cartItems": [
    {
      "id": "fbabb4ce-823f-5790-9b87-35819d4be380",
      "title": "Puma 80's",
      "img": "/static/media/img2.2e6236fd.jpeg",
      "price": 109,
      "unitsInStock": 5,
      "createdAt": "2021-04-23T09:12:24.2424+02",
      "updatedAt": "2021-04-23T09:12:24.2424+02",
      "quantity": 2
    },
    {
      "id": "65d6b269-209b-50ac-a566-ca6a334aa6f0",
      "title": "Nike Runner 2000",
      "img": "/static/media/img1.a79d9fb0.jpeg",
      "price": 88,
      "unitsInStock": 5,
      "createdAt": "2021-04-23T09:12:24.2424+02",
      "updatedAt": "2021-04-23T09:12:24.2424+02",
      "quantity": 4
    }
  ],
  "products": [
    {
      "id": "65d6b269-209b-50ac-a566-ca6a334aa6f0",
      "title": "Nike Runner 2000",
      "price": 88,
      "img": "/static/media/img1.a79d9fb0.jpeg",
      "shortDescription": "Ipsum sint consequat culpa adipisicing occaecat aliquip aliquip sit labore aute.",
      "longDescription": "Occaecat nostrud ipsum excepteur adipisicing dolor. Deserunt pariatur commodo duis Lorem laboris irure dolor dolor proident aute pariatur. Nostrud consectetur labore anim est deserunt esse est nostrud ipsum velit incididunt aliqua anim. Occaecat exercitation culpa proident aute aliqua exercitation nulla cillum velit nisi reprehenderit Lorem sunt.",
      "isFavorite": true,
      "createdAt": "2021-04-23T09:12:24.2424+02",
      "updatedAt": "2021-04-23T09:12:24.2424+02",
      "unitsInStock": 5,
      "quantity": 0,
      "votes": {
        "upVotes": {
          "upperLimit": 10,
          "currentValue": 7
        },
        "downVotes": {
          "lowerLimit": 10,
          "currentValue": 6
        }
      },
      "author": {
        "id": "9cb107d1-cc36-5399-a8b2-0ad65daa5d36",
        "firstName": "Clyde",
        "lastName": "Tucker",
        "email": "mepsukjid@riz.jm"
      }
    },
    {
      "id": "fbabb4ce-823f-5790-9b87-35819d4be380",
      "title": "Puma 80's",
      "price": 109,
      "img": "/static/media/img2.2e6236fd.jpeg",
      "shortDescription": "Ea nisi minim cillum quis enim ullamco enim sint.",
      "longDescription": "Eu in voluptate ut magna id sint elit est enim et officia. Lorem id commodo duis dolor ullamco consequat dolor culpa. Irure nostrud veniam nulla enim occaecat nostrud ullamco sunt. Excepteur esse occaecat cupidatat excepteur adipisicing fugiat cillum amet do ad aliqua.",
      "isFavorite": true,
      "createdAt": "2021-04-23T09:12:24.2424+02",
      "updatedAt": "2021-04-23T09:12:24.2424+02",
      "unitsInStock": 5,
      "quantity": 0,
      "votes": {
        "upVotes": {
          "upperLimit": 10,
          "currentValue": 2
        },
        "downVotes": {
          "lowerLimit": 10,
          "currentValue": 0
        }
      },
      "author": {
        "id": "b2c1f67d-91ee-5a62-b198-4229a4ecc0b8",
        "firstName": "Aaron",
        "lastName": "Casey",
        "email": "mascefjuh@rekos.pl"
      }
    }
  ]
}
```

#### Test suite name

@TODO

### 4. Remove cart items

#### File

```sh
/src/App.js
```

In this step you will have to be able to remove elements from the cart:

For this, you will need to complete the code of the `handleRemove(productId) {}`
method in the `App` component so that it removes the `cartItem` that has the
`productId` that the method receives.

#### Test suite name

@TODO

### 5. Show to cart total using `[].reduce()`

#### File

```sh
/src/components/Cart
```

In this step you will have to be able to show to cart total based on the items
in the cart (`state.cartItems`).

You can do this with any loop in javascript but we recommend using
`[].reduce()`.

```diff
- <strong>0€</strong>
+ <strong>{getCartTotal(cartItems)}€</strong>
```

```diff
-// function getCartTotal() {
-//   return 0;
-// }
+function getCartTotal(cart) {
+  return cart.reduce((accum, item) => { ... }, 0);
+}
```

#### Test suite name

@TODO

## Extra steps 💯

### 1. Update the quantity of the cart item using a dropdown (select form element)

#### File

```sh
/src/App.js
```

In this step you will have to be able to update the quantity of elements in the
cart using a `select` element.

For this, you will need to complete the code of the
`handleChange(event, productId) {}` method in the `App` component so that:

It finds the `cartItem` that has the `productId` from the `state.cartItems`
property and increment the `quantity` by `1` if the
`item.quantity <= item.unitsInStock`.

### Extra steps 💯

1. In the `<ShoppingCartItem />` component check the value of the `unitsInStock`
   property of the `cartItem` and create as many `<option>` child elements of
   the `<select>` element as there are `unitsInStock`.

**Example**

`unitsInStock: 3`

```jsx
<select
  className="custom-select"
  onChange={onHandleChange}
  onBlur={onHandleChange}
  value={quantity}
>
  <option value="1,">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
</select>
```

Can be created with:

```jsx
function buildSelectOptions(unitsInStock) {
  return Array.from({ length: unitsInStock }, (_value, index) => {
    const currentIndex = index + 1;
    return (
      // <option ...>...</option>
    );
  });
}

<select
  className="custom-select"
  onChange={onHandleChange}
  onBlur={onHandleChange}
  value={quantity}
>
  {buildSelectOptions(unitsInStock)}
</select>;
```

#### Test suite name

@TODO

### 2. Set the product as favorite

#### File

```sh
/src/App.js
```

In this step you will have to be able to mark an element as favorite by clicking
on the `<FavoriteIconButton />` in the `<ItemCard />` component.

For this you will have to complete the code of the
`handleSetFavorite(productId)` method in the `App.js` component.

#### Test suite name

@TODO

### 3. Up vote a product

#### File

```sh
/src/App.js
```

In this step you will have to be able to **up** vote a product by clicking on
the `<IconButton />` in the `<ItemCard />` component that has the `onUpVote`
prop.

For this you will have to complete the code of the `handleUpVote(productId)`
method in the `App.js` component so that:

1. if: `product.votes.upVotes.currentValue < product.votes.upVotes.upperLimit`
   1. then: `product.votes.upVotes.currentValue + 1`
2. else: `return product`

### 3. Down vote a product

#### File

```sh
/src/App.js
```

In this step you will have to be able to **down** vote a product by clicking on
the `<IconButton />` in the `<ItemCard />` component that has the `onUpVote`
prop.

For this you will have to complete the code of the `handleUpVote(productId)`
method in the `App.js` component so that:

1. if:
   `product.votes.downVotes.currentValue < product.votes.downVotes.lowerLimit`
   1. then: `product.votes.downVotes.currentValue + 1`
2. else: `return product`

#### Test suite name

@TODO

### 4. Store in `localStorage` the products and cart items of the App component

#### File

```sh
/src/App.js
```

In this step you will have to be able to read from `localStorage` the state data
in `componentDidMount()` and update the `localStorage` data when the state is
updated in `componentDidUpdate()`.

#### Test suite name

@TODO

## Project delivery

To deliver this project you must follow the steps indicated in the document:

- [Submitting a solution](https://www.notion.so/Submitting-a-solution-524dab1a71dd4b96903f26385e24cdb6)

## Resources

- [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)
- [reactjs.org](https://reactjs.org/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details

## Contributors ✨

Thanks goes to these wonderful people
([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.danilucaci.com"><img src="https://avatars.githubusercontent.com/u/19062818?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dani Lucaci</b></sub></a><br /><a href="https://github.com/assembler-school/vanilla-js-project-template/commits?author=danilucaci" title="Code">💻</a> <a href="https://github.com/assembler-school/vanilla-js-project-template/commits?author=danilucaci" title="Documentation">📖</a> <a href="#example-danilucaci" title="Examples">💡</a> <a href="#tool-danilucaci" title="Tools">🔧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!
