
export const orders = [
  {
    id: '1001',
    date: '2023-09-15',
    restaurant: {
      id: '1',
      name: 'Burger Bliss'
    },
    items: [
      {
        id: '101',
        name: 'Classic Cheeseburger',
        price: 8.99,
        quantity: 2
      },
      {
        id: '104',
        name: 'French Fries',
        price: 3.99,
        quantity: 1
      }
    ],
    status: 'Delivered',
    total: 21.97,
    deliveryAddress: '123 Main St, Anytown, USA'
  },
  {
    id: '1002',
    date: '2023-09-10',
    restaurant: {
      id: '2',
      name: 'Pizza Paradise'
    },
    items: [
      {
        id: '201',
        name: 'Margherita Pizza',
        price: 12.99,
        quantity: 1
      },
      {
        id: '204',
        name: 'Garlic Bread',
        price: 4.99,
        quantity: 1
      }
    ],
    status: 'Delivered',
    total: 17.98,
    deliveryAddress: '123 Main St, Anytown, USA'
  },
  {
    id: '1003',
    date: '2023-09-05',
    restaurant: {
      id: '3',
      name: 'Sushi Supreme'
    },
    items: [
      {
        id: '301',
        name: 'California Roll',
        price: 7.99,
        quantity: 2
      },
      {
        id: '304',
        name: 'Miso Soup',
        price: 3.99,
        quantity: 1
      }
    ],
    status: 'Delivered',
    total: 19.97,
    deliveryAddress: '123 Main St, Anytown, USA'
  }
];
